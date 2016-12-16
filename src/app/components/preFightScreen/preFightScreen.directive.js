(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('preFightScreen', preFightScreen);

  preFightScreen.$inject = ["stateChangeService", "fightQueueService", "progressTracker", "fightLogService",
    "alliesService", "enemiesService", "movesService", "storyService", "boardCreator", "boardManager", "enemyGenerator"];

  function preFightScreen(stateChangeService, fightQueueService, progressTracker, fightLogService, alliesService,
                          enemiesService, movesService, storyService, boardCreator, boardManager, enemyGenerator) {
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

      vm.readyUp = readyUp;
      vm.goBack = goBack;
      vm.selectDifficulty = selectDifficulty;

      activate();

      function activate() {
        vm.allies = alliesService.activeAllies;
        vm.fightType = progressTracker.getFightType();
        if (vm.fightType === 'story') {
          vm.enemies = enemiesService.getEnemiesForStory();
          vm.fightTitle = storyService.getTitle();
        } else if (vm.fightType === 'arena') {
          vm.fightTitle = 'Arena Match';
          vm.enemies = null;
        }
      }

      function selectDifficulty(difficulty) {
        vm.enemies = enemyGenerator.generateEnemies(difficulty, vm.allies);
      }

      function goBack() {
        stateChangeService.setPlayerState('mainMenu');
      }

      // Everything that sets up the fight.
      function readyUp() {
        enemiesService.setCurrentEnemies(vm.enemies);
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
        var board = null;
        if (vm.fightType === 'story') {
          var storyProgress = progressTracker.getStoryProgress();
          var allyPositions = boardManager.initialAllyPositions[storyProgress];
          var enemyPositions = boardManager.initialEnemyPositions[storyProgress];
          board = boardManager.getBoardNumber(storyProgress);
          board.layout = boardCreator.buildBoardLayout(board);
          boardManager.placeCharacterSet(board.layout, allyPositions, alliesService.getActiveAllies());
          boardManager.placeCharacterSet(board.layout, enemyPositions, vm.enemies);
        } else if (vm.fightType === 'arena') {
          board = boardCreator.createRandomBoard(alliesService.getActiveAllies(), vm.enemies);
        }

        boardManager.setCurrentBoard(board);
        boardManager.clearMoveAndTarget();
      }
    }
  }
})();
