(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('fightDisplay', fightDisplay);

  fightDisplay.$inject = ["alliesService", "enemiesService", "fightQueueService", "$timeout"];

  function fightDisplay(alliesService, enemiesService, fightQueueService, $timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/fightDisplay/fightDisplay.html',
      controller: fightDisplayController,
      controllerAs: 'fight',
      bindToController: true
    };

    return directive;

    function fightDisplayController() {
      var vm = this;

      vm.activeAllies = alliesService.activeAllies;
      vm.enemies = enemiesService.enemies;
      vm.queuePool = fightQueueService.buildQueue();
      vm.fightLog = [];
      vm.fightLogId = 0;
      //vm.updatePercentages = alliesService.updatePercentages;

      vm.nextTurn = function() {
        if (vm.queuePool[0].id >= 200) {
          angular.forEach(vm.enemies, function(enemy) {
            if (vm.queuePool[0].id === enemy.id) {
              vm.enemyAttack(enemy);
            }
          });
          vm.endTurn();
        }
      };

      vm.enemyAttack = function(enemy) {
        var target = Math.floor(Math.random() * vm.activeAllies.length);
        vm.activeAllies[target].stats.health -= enemy.stats.strength;
        alliesService.updatePercentages(vm.activeAllies[target]);
        vm.pushToFightLog(enemy.name + " attacked " + vm.activeAllies[target].name + " for " + enemy.stats.strength + " damage.");
      };

      vm.pushToFightLog = function(string) {
        vm.fightLog.push({'message' : string, 'id' : vm.fightLogId});
        vm.fightLogId++;
      };

      vm.endTurn = function() {
        $timeout(function() {vm.nextTurn()}, 2000);
        vm.queuePool.push(vm.queuePool.shift());
        if (vm.queuePool[0].id < 200) {
          vm.pushToFightLog(vm.queuePool[0].name + "'s turn.")
        }
      };

      $timeout(function() {vm.nextTurn()}, 2000);
    }
  }
})();
