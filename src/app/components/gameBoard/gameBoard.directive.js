(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive("gameBoard", gameBoard);

  gameBoard.$inject = ["boardCreator", "fightQueueService"];

  function gameBoard(boardCreator, fightQueueService) {
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

      vm.selectCell = selectCell;
      vm.mouseEnter = mouseEnter;
      vm.mouseLeave = mouseLeave;

      activate();

      function activate() {
        vm.board = boardCreator.currentBoard;
      }

      function selectCell(cell) {
        if (cell.movable) {
          var player = fightQueueService.queuePool[0];
          boardCreator.placeCharacter(cell, player, vm.board);
          boardCreator.clearMoveAndTarget();
        }
        if (cell.targetable) {
          if (cell.occupant) {
            if (cell.occupant.id >= 200) {
              fightQueueService.actionOnEnemy(cell.occupant);
            } else {
              fightQueueService.actionOnAlly(cell.occupant);
            }
          }
        }
      }

      function mouseEnter(cell) {
        if (cell.occupant) {
          cell.occupant.hovered = true;
        }
      }

      function mouseLeave(cell) {
        if (cell.occupant) {
          cell.occupant.hovered = false;
        }
      }
    }

  }

})();
