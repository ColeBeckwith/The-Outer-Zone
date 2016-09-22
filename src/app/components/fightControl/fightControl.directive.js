(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('fightControl', fightControl);

  fightControl.$inject = ["fightQueueService", "alliesFightDisplay"];

  function fightControl(fightQueueService, alliesFightDisplay) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/fightControl/fightControl.html',
      controller: fightControlController,
      controllerAs: 'fightControl',
      bindToController: true
    };

    return directive;

    function fightControlController() {
      var vm = this;
      
      vm.atBat = fightQueueService.queuePool[0];
      
      vm.selectMove = function(move) {
        alliesFightDisplay.selectMove(move);
      }

    }

  }

})();
