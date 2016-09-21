(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('fightQueueService', fightQueueService);

  fightQueueService.$inject = ["alliesService", "enemiesService", "fightLogService", "$timeout", "progressTracker", "movesService"];

  function fightQueueService(alliesService, enemiesService, fightLogService, $timeout, progressTracker, movesService) {
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
        if (vm.queuePool[0].status !== 'alive') {
          fightLogService.pushToFightLog(vm.queuePool[0].name + " is unable to act.");
          vm.endTurn();
        } else if (vm.queuePool[0].id >= 200) {
          vm.enemyAttackAlly(vm.queuePool[0]);
          vm.endTurn();
        }
      }
    };

    vm.enemyAttackAlly = function(enemy) {

      //TODO for Man of Stone create an if that checks for target priority and if not targets as normal.

      var target = Math.floor(Math.random() * alliesService.activeAllies.length);
      while (alliesService.activeAllies[target].status !== 'alive') {
        target = Math.floor(Math.random() * alliesService.activeAllies.length);
      }

      if (alliesService.activeAllies[target].stance === "Parrying") {
        fightLogService.pushToFightLog(alliesService.activeAllies[target].name + " blocked the attack.");
        alliesService.activeAllies[target].stanceCount--;
        if (alliesService.activeAllies[target].stanceCount === 0) {
          alliesService.activeAllies[target].stance = "Normal";
        }
        return;
      }

      if ((Math.random() * 6 * enemy.stats.speed) > (Math.random() * alliesService.activeAllies[target].stats.speed)) {
        var damage = Math.round(((1.7 + ((Math.random() * 6) / 10)) * enemy.stats.strength) - (.75*alliesService.activeAllies[target].stats.defense));

        if (damage <= 0) {
          damage = 1;
        }

        alliesService.activeAllies[target].stats.health -= damage;
        fightLogService.pushToFightLog(enemy.name + " attacked " + vm.activeAllies[target].name + " for " + damage + " damage.");
        alliesService.checkForDeath(vm.activeAllies[target]);
        alliesService.updatePercentages(vm.activeAllies[target]);
      } else {
        fightLogService.pushToFightLog(alliesService.activeAllies[target].name + ' dodged ' + enemy.name + '\'s attack.')
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
      movesService.setSelectedMove('');

      $timeout(function () {
        vm.nextTurn()
      }, 400);

      vm.cycleQueue();

      if (vm.queuePool[0].id < 200) {
        fightLogService.pushToFightLog(vm.queuePool[0].name + "'s turn.")
      }
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
    }

  }

})();
