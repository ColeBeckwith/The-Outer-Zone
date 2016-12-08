(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('preFightScreen', preFightScreen);

  preFightScreen.$inject = ["stateChangeService", "fightQueueService", "progressTracker", "fightLogService", "alliesService", "enemiesService", "movesService", "storyService", "boardCreator"];

  function preFightScreen(stateChangeService, fightQueueService, progressTracker, fightLogService, alliesService, enemiesService, movesService, storyService, boardCreator) {
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

      vm.allies = alliesService.activeAllies;
      vm.enemies = enemiesService.getEnemies();

      vm.fightTitle = storyService.getTitle();

      // Everything that sets up the fight.
      vm.readyUp = function() {
        fightQueueService.buildQueue();
        alliesService.restoreAll();
        enemiesService.restoreAll();
        progressTracker.setBattleWon(false);
        progressTracker.startFight();
        fightLogService.clearLog();
        movesService.getActiveAllies();
        movesService.setSelectedMove(null);
        stateChangeService.setPlayerState('fight');

        // Sets up the board for the fight.
        var storyProgress = progressTracker.getStoryProgress();
        var allyPositions = boardCreator.initialAllyPositions[storyProgress];
        var enemyPositions = boardCreator.initialEnemyPositions[storyProgress];
        var board = boardCreator.getBoardNumber(storyProgress);
        board.layout = boardCreator.buildBoardLayout(board);
        boardCreator.placeCharacterSet(board.layout, allyPositions, alliesService.getActiveAllies());
        boardCreator.placeCharacterSet(board.layout, enemyPositions, enemiesService.getEnemies());
        boardCreator.setCurrentBoard(board);
        boardCreator.clearMoveAndTarget();
      }

    }
  }
})();
