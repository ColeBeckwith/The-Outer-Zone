(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('fightSummary', fightSummary);

  fightSummary.$inject = ["stateChangeService", "progressTracker"];

  function fightSummary(stateChangeService, progressTracker) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/fightSummary/fightSummary.html',
      controller: fightSummaryController,
      controllerAs: 'fightSummary',
      bindToController: true
    };

    return directive;

    function fightSummaryController() {
      var vm = this;

      vm.battleWon = progressTracker.getBattleWon();

      vm.continue = function() {
        stateChangeService.setPlayerState('story');
      };

      vm.tryAgain = function() {
        stateChangeService.setPlayerState('prefight');
      }
    }
  }
})();
