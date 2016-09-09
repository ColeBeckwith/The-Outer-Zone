(function() {
  'use strict';

  angular
    .module('outerZone')
    .controller('fightController', fightController);

  fightController.$inject = ["alliesService", "enemiesService", "fightQueueService"];
  //TODO may eventually need to move to route provider.
  /** @ngInject */
  function fightController(alliesService, enemiesService, fightQueueService) {
    var vm = this;

    vm.activeAllies = alliesService.activeAllies;
    vm.enemies = enemiesService.enemies;
    vm.queuePool = fightQueueService.buildQueue();

    console.log(vm.queuePool);

  }
})();
