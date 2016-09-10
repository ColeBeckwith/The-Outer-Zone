(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('fightQueueService', fightQueueService);

  function fightQueueService(alliesService, enemiesService) {
    var vm = this;

    vm.activeAllies = alliesService.activeAllies;
    vm.enemies = enemiesService.enemies;

    vm.buildQueue = function() {
      vm.activeAllies = alliesService.activeAllies;
      vm.queuePool = [];

      angular.forEach(vm.activeAllies, function(ally) {
        var x = 0;
        while (x < ally.stats.speed) {
          vm.queuePool.push({'name' : ally.name, 'id' : ally.id});
          x++;
        }
      });

      angular.forEach(vm.enemies, function(enemy) {
        var x = 0;
        while (x < enemy.stats.speed) {
          vm.queuePool.push({'name' : enemy.name, 'id' : enemy.id});
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
  }

})();
