(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('fightQueueService', fightQueueService);

  fightQueueService.$inject = ["alliesService", "enemiesService", "fightLogService", "$timeout", "progressTracker", "movesService", "stateChangeService"];

  function fightQueueService(alliesService, enemiesService, fightLogService, $timeout, progressTracker, movesService, stateChangeService) {
    var vm = this;

    vm.buildQueue = function() {
      vm.activeAllies = alliesService.activeAllies;
      vm.enemies = enemiesService.getEnemies();
      vm.queuePool = [];

      angular.forEach(vm.activeAllies, function(ally) {
        var x = 0;
        while (x < ally.stats.speed) {
          vm.queuePool.push(ally);
          x++;
        }
      });

      angular.forEach(vm.enemies, function(enemy) {
        var x = 0;
        while (x < enemy.stats.speed) {
          vm.queuePool.push(enemy);
          x++;
        }
      });

      for (var i = vm.queuePool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = vm.queuePool[i];
        vm.queuePool[i] = vm.queuePool[j];
        vm.queuePool[j] = temp;
      }

      return vm.queuePool;
    };

    vm.cycleQueue = function() {
      vm.queuePool.push(vm.queuePool.shift());
    };

    vm.nextTurn = function() {
      if (progressTracker.fightOngoing) {
        if (vm.queuePool[0].status === 'dead') {
          fightLogService.pushToFightLog(vm.queuePool[0].name + " is unable to act.");
          vm.endTurn();
        }
        if (vm.queuePool[0].stance === 'Man of Stone') {
          fightLogService.pushToFightLog(vm.queuePool[0].name + " stands firm.");
          vm.endTurn();
        }
        if (vm.queuePool[0].id >= 200) {
          movesService.enemyAttackAlly(vm.queuePool[0]);
          vm.endTurn();
        }
      }
    };

    vm.removeFromPool = function(id) {
      for (var i = vm.queuePool.length - 1; i >= 0; i--) {
        if (vm.queuePool[i].id === id) {
          vm.queuePool.splice(i, 1);
        }
      }
    };

    vm.endTurn = function() {
      movesService.setSelectedMove([]);
      vm.cycleQueue();
      $timeout(function () {
        vm.nextTurn()
      }, 400);
    };

    vm.allyCharge = function() {
      var temp = [];
      angular.forEach(vm.activeAllies, function(ally) {
        temp.push(ally);
      });
      angular.forEach(temp, function(ally) {
        vm.queuePool.splice(1, 0, ally)
      });
      fightLogService.pushToFightLog("CHARGE!")
    };

    vm.takeAwayTurn = function(player, numOfTurns) {
      for (var i = 0; i < vm.queuePool.length; i++) {
        if (vm.queuePool[i].id === player.id) {
          vm.queuePool.splice(i, 1);
          numOfTurns--;
          if (numOfTurns === 0) {
            break;
          }
        }
      }
    };

    vm.selectMove = function(move) {
      if (movesService.selectMove(move, vm.queuePool[0])) {
        if (move[0] === "Charge") {
          vm.allyCharge()
        }
        vm.endTurn();
      }
    };

    vm.actionOnAlly = function(ally) {
      movesService.allyActionAlly(ally, vm.queuePool[0]);
      if (alliesService.targetSelectMode === 0) {
        vm.endTurn();
      }
    };

    vm.actionOnEnemy = function(enemy) {
      if (['Fury', 'Attack', 'Knockout'].indexOf(movesService.selectedMove[0]) !== -1) {
        if (movesService.regularAttackEnemy(enemy, vm.queuePool[0])) {
         if (movesService.selectedMove[0] === 'Knockout') {
           vm.takeAwayTurn(enemy, 1);
           fightLogService.pushToFightLog(enemy.name + " is knocked out and will miss their next turn.")
         }
        }
      }

      if (movesService.selectedMove[0] === 'Death Punch') {
        movesService.deathPunch(enemy, vm.queuePool[0]);
      }

      enemiesService.updateHealthBarType(enemy);

      if (enemiesService.checkForDead(enemy)) {
        fightLogService.pushToFightLog(enemy.name + " has been defeated.");
        alliesService.runEnemyDeathStatuses();
        vm.removeFromPool(enemy.id);
        if (enemiesService.checkForVictory()) {
          progressTracker.stopFight();
          progressTracker.setBattleWon(true);
          fightLogService.pushToFightLog("Victorious");
          $timeout(function() {
            stateChangeService.setPlayerState("fightSummary");
          }, 1500);
        }
      }

      if (enemiesService.targetSelectMode === 0) {
        vm.endTurn();
      }
    }

  }

})();
