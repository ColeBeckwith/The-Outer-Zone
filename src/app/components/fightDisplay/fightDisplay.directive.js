(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('fightDisplay', fightDisplay);

  fightDisplay.$inject = ["alliesService", "enemiesService", "fightQueueService", "stateChangeService", "$timeout"];

  function fightDisplay(alliesService, enemiesService, fightQueueService, stateChangeService, $timeout) {
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

      vm.nextTurn = function() {
        if (vm.queuePool[0].id >= 200) {
          angular.forEach(vm.enemies, function(enemy) {
            if (vm.queuePool[0].id === enemy.id) {
              vm.enemyAttack(enemy);
            }
          });
          vm.endTurn();
        } else {
          vm.pushToFightLog(vm.queuePool[0].name + "'s move.")
        }
      };

      vm.enemyAttack = function(enemy) {
        var target = 0;
        //TODO needs to be randomized to the length of active allies.
        vm.activeAllies[target].stats.health -= enemy.stats.strength;
        //TODO also needs to refresh health percentage
        vm.pushToFightLog(enemy.name + " attacked " + vm.activeAllies[target].name + " for " + enemy.stats.strength + " damage.");
      };

      vm.pushToFightLog = function(string) {
        vm.fightLog.push({'message' : string, 'id' : vm.fightLogId});
        vm.fightLogId++;
      };

      vm.endTurn = function() {
        $timeout(function() {vm.nextTurn()}, 2000);
        vm.queuePool.push(vm.queuePool.shift());
      };

      $timeout(function() {vm.nextTurn()}, 2000);

      //TODO when it's the players turn, the log doesn't update at the same time.
    }
  }
})();
