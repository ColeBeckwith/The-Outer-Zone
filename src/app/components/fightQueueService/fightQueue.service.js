(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('fightQueueService', fightQueueService);

  fightQueueService.$inject = ["alliesService", "enemiesService", "fightLogService", "$timeout"];

  function fightQueueService(alliesService, enemiesService, fightLogService, $timeout) {
    var vm = this;

    vm.activeAllies = alliesService.activeAllies;
    vm.enemies = enemiesService.enemies;

    vm.buildQueue = function() {
      vm.activeAllies = alliesService.activeAllies;
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
      if (vm.queuePool[0].active === false) {
        fightLogService.pushToFightLog(vm.queuePool[0].name + " is unable to act.");
        vm.endTurn();
      } else if (vm.queuePool[0].id >= 200) {
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
      var damage = ((Math.floor((Math.random() * 6) + 1) * enemy.stats.strength) - Math.floor((Math.random() * 4) + 1) * alliesService.activeAllies[target].stats.defense);
      if (damage <= 0) {
        damage = 1;
      }
      alliesService.activeAllies[target].stats.health -= damage;
      alliesService.updatePercentages(vm.activeAllies[target]);
      fightLogService.pushToFightLog(enemy.name + " attacked " + vm.activeAllies[target].name + " for " + damage + " damage.");
      
    };

    vm.endTurn = function() {
      $timeout(function() {vm.nextTurn()}, 1000);
      vm.cycleQueue();
      if (vm.queuePool[0].id < 200) {
        fightLogService.pushToFightLog(vm.queuePool[0].name + "'s turn.")
      }
    };

  }

})();
