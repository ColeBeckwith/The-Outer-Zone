(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('fightDisplay', fightDisplay);

  fightDisplay.$inject = ["alliesService", "enemiesService", "fightQueueService", "stateChangeService"];

  function fightDisplay(alliesService, enemiesService, fightQueueService, stateChangeService) {
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

      vm.nextTurn = function() {
        console.log('Starting Fight');
        if (vm.queuePool[0].id >= 200) {
          angular.forEach(vm.enemies, function(enemy) {
            if (vm.queuePool[0].id === enemy.id) {
              setTimeout(vm.enemyAttack(enemy), 2000);
            }
          });
          vm.endTurn();
        } else {
          vm.fightLog.push(vm.queuePool[0].name + "'s move.")
        }
      };

      vm.enemyAttack = function(enemy) {
        var target = 0;
        vm.activeAllies[target].stats.health -= enemy.stats.strength;
        vm.fightLog.push(enemy.name + " attacked " + vm.activeAllies[target].name + " for " + enemy.stats.strength + " damage.");
      };

      vm.endTurn = function() {
        vm.queuePool.push(vm.queuePool.shift());
        vm.nextTurn();
      };

      vm.nextTurn();
    }
  }
})();
