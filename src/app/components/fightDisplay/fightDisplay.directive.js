(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('fightDisplay', fightDisplay);

  fightDisplay.$inject = ["fightQueueService", "$timeout", "fightLogService"];

  function fightDisplay(fightQueueService, $timeout, fightLogService) {
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

      vm.fightLog = fightLogService.getFightLog();

      vm.queuePool = fightQueueService.buildQueue();

      $timeout(function() { fightQueueService.nextTurn() }, 1000);
    }
  }
})();
