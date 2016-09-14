(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('preFightScreen', preFightScreen);

  preFightScreen.$inject = ["stateChangeService", "fightQueueService", "progressTracker", "fightLogService", "alliesService"];

  function preFightScreen(stateChangeService, fightQueueService, progressTracker, fightLogService, alliesService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/preFightScreen/preFightScreen.html',
      controller: preFightController,
      controllerAs: 'preFight',
      bindToController: true
    };

    return directive;

    function preFightController() {
      var vm = this;

      vm.readyUp = function() {
        fightQueueService.buildQueue();
        alliesService.restoreAll();
        progressTracker.setBattleWon(false);
        progressTracker.startFight();
        fightLogService.clearLog();
        stateChangeService.setPlayerState('fight');
      }

    }
  }
})();
