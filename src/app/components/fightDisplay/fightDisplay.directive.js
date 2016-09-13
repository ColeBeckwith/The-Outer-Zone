(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('fightDisplay', fightDisplay);

  fightDisplay.$inject = ["alliesService", "enemiesService", "fightQueueService", "$timeout", "movesService", "$rootScope"];

  function fightDisplay(alliesService, enemiesService, fightQueueService, $timeout, movesService, $rootScope) {
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
      vm.selectedMove = movesService.selectedMove;

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
        var target = Math.floor(Math.random() * alliesService.activeAllies.length);
        alliesService.activeAllies[target].stats.health -= enemy.stats.strength;
        alliesService.updatePercentages(vm.activeAllies[target]);
        vm.pushToFightLog(enemy.name + " attacked " + vm.activeAllies[target].name + " for " + enemy.stats.strength + " damage.");
      };

      vm.pushToFightLog = function(string) {
        vm.fightLog.push({'message' : string, 'id' : vm.fightLogId});
        vm.fightLogId++;
      };

      vm.endTurn = function() {
        $timeout(function() {vm.nextTurn()}, 1000);
        vm.queuePool.push(vm.queuePool.shift());
        if (vm.queuePool[0].id < 200) {
          vm.pushToFightLog(vm.queuePool[0].name + "'s turn.")
        }
      };

      $rootScope.$watch( function() { return movesService.selectedMove }, function() {
        if (movesService.selectedMove === "Punch") {
          vm.pushToFightLog('Select target to Punch.');
        }
        if (movesService.selectedMove === "Fury") {
          //Action
        }
        if (movesService.selectedMove === "Fortify") {
          vm.pushToFightLog("The Scarecrow has been fortified.");
          vm.endTurn();
        }
        if (movesService.selectedMove === "Parry") {
          //Action
        }
        movesService.selectedMove = "";
      }, true);

      $timeout(function() {vm.nextTurn()}, 1000);
    }
  }
})();
