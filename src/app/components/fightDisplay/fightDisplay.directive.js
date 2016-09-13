(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('fightDisplay', fightDisplay);

  fightDisplay.$inject = ["alliesService", "enemiesService", "fightQueueService", "$timeout", "movesService", "$rootScope", "fightLogService"];

  function fightDisplay(alliesService, enemiesService, fightQueueService, $timeout, movesService, $rootScope, fightLogService) {
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
      vm.selectedMove = movesService.selectedMove;
      vm.fightLog = fightLogService.getFightLog();

      vm.nextTurn = function() {
        if (vm.queuePool[0].id >= 200) {
          angular.forEach(vm.enemies, function(enemy) {
            if (vm.queuePool[0].id === enemy.id) {
              vm.enemyAttackAlly(enemy);
            }
          });
          vm.endTurn();
        }
      };

      vm.enemyAttackAlly = function(enemy) {
        var target = Math.floor(Math.random() * alliesService.activeAllies.length);
        alliesService.activeAllies[target].stats.health -= enemy.stats.strength;
        alliesService.updatePercentages(vm.activeAllies[target]);
        fightLogService.pushToFightLog(enemy.name + " attacked " + vm.activeAllies[target].name + " for " + enemy.stats.strength + " damage.");
      };

      vm.endTurn = function() {
        $timeout(function() {vm.nextTurn()}, 1000);
        vm.queuePool.push(vm.queuePool.shift());
        if (vm.queuePool[0].id < 200) {
          fightLogService.pushToFightLog(vm.queuePool[0].name + "'s turn.")
        }
        enemiesService.targetSelectMode = false;
      };

      /*rootScope.$watch( function() { return movesService.selectedMove }, function() {
        if (movesService.selectedMove === "Punch") {
          fightLogService.pushToFightLog('Select target to Punch.');
          enemiesService.targetSelectMode = true;
        }
        if (movesService.selectedMove === "Fury") {
          fightLogService.pushToFightLog('The Scarecrow is in Fury mode.');
          vm.endTurn();
        }
        if (movesService.selectedMove === "Fortify") {
          fightLogService.pushToFightLog("The Scarecrow has been fortified.");
          vm.endTurn();
        }
        if (movesService.selectedMove === "Parry") {
          fightLogService.pushToFightLog("The Scarecrow will deflect the next incoming attack.");
          vm.endTurn();
        }
        movesService.selectedMove = "";
      }, true);*/

      $timeout(function() {vm.nextTurn()}, 1000);
    }
  }
})();
