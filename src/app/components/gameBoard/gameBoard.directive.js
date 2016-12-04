(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive("gameBoard", gameBoard);

  gameBoard.$inject = ["boardCreator", "progressTracker", "alliesService", "enemiesService"];

  function gameBoard(boardCreator, progressTracker, alliesService, enemiesService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/gameBoard/gameBoard.html',
      controller: gameBoardCtrl,
      controllerAs: 'gameBoard',
      bindToController: true
    };

    return directive;

    function gameBoardCtrl() {
      var vm = this;

      vm.board = null;

      vm.getBoard = getBoard;

      activate();

      function activate() {
        getBoard();
      }

      function getBoard() {
        var storyProgress = progressTracker.getStoryProgress();
        vm.board = boardCreator.getBoardNumber(storyProgress);
        vm.board.layout = boardCreator.buildBoardLayout(vm.board);
        boardCreator.placeCharacterSet(vm.board.layout, boardCreator.initialAllyPositions[storyProgress], alliesService.getActiveAllies());
        boardCreator.placeCharacterSet(vm.board.layout, boardCreator.initialEnemyPositions[storyProgress], enemiesService.getEnemies());
      }
    }

  }

})();
