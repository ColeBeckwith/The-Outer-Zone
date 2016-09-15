(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('preFightScreen', preFightScreen);

  preFightScreen.$inject = ["stateChangeService", "fightQueueService", "progressTracker", "fightLogService", "alliesService", "enemiesService", "movesService"];

  function preFightScreen(stateChangeService, fightQueueService, progressTracker, fightLogService, alliesService, enemiesService, movesService) {
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
        enemiesService.restoreAll();
        progressTracker.setBattleWon(false);
        progressTracker.startFight();
        fightLogService.clearLog();
        movesService.setSelectedMove('');
        stateChangeService.setPlayerState('fight');
      }

    }
  }
})();
