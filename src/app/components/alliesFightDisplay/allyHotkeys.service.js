(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('allyHotkeysService', allyHotkeysService);

  allyHotkeysService.$inject = ["fightQueueService", "movesService", "boardManager", "userSettingsService"];

  function allyHotkeysService(fightQueueService, movesService, boardManager, userSettingsService) {
    var svc = this;

    svc.handleNumberPress = handleNumberPress;
    svc.handleArrowPress = handleArrowPress;
    svc.handleSpacebarPress = handleSpacebarPress;

    function handleNumberPress(event) {
      // Makes an assumption that the moves in an allies JSON will be displayed without any gaps.
      // If we are ever going to disable certain moves, they need to be disabled and not removed.
      var currentAlly = fightQueueService.queuePool[0];

      if (currentAlly.id >= 200 || movesService.selectedMove) {
        return;
      }

      var selectedMove = currentAlly.moves[parseInt(event.key) - 1];

      if (currentAlly.level < selectedMove.lvlReq) {
        return;
      }

      fightQueueService.selectMove(selectedMove);
    }

    function handleArrowPress(event) {
      var currentAlly = fightQueueService.queuePool[0];
      var currentBoard = boardManager.currentBoard;

      if (currentAlly.id >= 200) {
        return;
      }

      var cellToMoveTo = null;

      switch (event.key) {
        case 'd':
        case 'ArrowRight':
          if (currentAlly.coordinates.x === currentBoard.numCols) {
            return;
          }
          cellToMoveTo = currentBoard.layout[currentAlly.coordinates.y][currentAlly.coordinates.x + 1];
          if (cellToMoveTo.movable) {
            boardManager.placeCharacter(cellToMoveTo, currentAlly, currentBoard);
          }
          break;
        case 's':
        case 'ArrowDown':
          if (currentAlly.coordinates.y === currentBoard.numRows) {
            return;
          }
          cellToMoveTo = currentBoard.layout[currentAlly.coordinates.y + 1][currentAlly.coordinates.x];
          if (cellToMoveTo.movable) {
            boardManager.placeCharacter(cellToMoveTo, currentAlly, currentBoard);
          }
          break;
        case 'w':
        case 'ArrowUp':
          if (currentAlly.coordinates.y === 0) {
            return;
          }
          cellToMoveTo = currentBoard.layout[currentAlly.coordinates.y - 1][currentAlly.coordinates.x];
          if (cellToMoveTo.movable) {
            boardManager.placeCharacter(cellToMoveTo, currentAlly, currentBoard);
          }
          break;
        case 'a':
        case 'ArrowLeft':
          if (currentAlly.coordinates.x === 0) {
            return;
          }
          cellToMoveTo = currentBoard.layout[currentAlly.coordinates.y][currentAlly.coordinates.x - 1];
          if (cellToMoveTo.movable) {
            boardManager.placeCharacter(cellToMoveTo, currentAlly, currentBoard);
          }
          break;
        default:
          break;
      }
    }

    function handleSpacebarPress() {
      var targets = boardManager.gatherTargets();

      if (targets.length === 0 || !movesService.selectedMove) {
        return;
      }

      var priority = null;

      if (targets[0].id >= 200) {
        priority = userSettingsService.getAutoTargetEnemyPriority();
      } else {
        priority = userSettingsService.getAutoTargetAllyPriority();
      }

      switch (priority) {
        case 'Lowest Health':
          targets.sort(function(a, b) {
            return a.stats.health - b.stats.health;
          });
          break;
        case 'Lowest Percentage Health':
          targets.sort(function(a, b) {
            return (a.stats.health / a.stats.maxHealth) - (b.stats.health / b.stats.maxHealth);
          });
          break;
        case 'Highest Health':
          targets.sort(function(a, b) {
            return a.stats.health + b.stats.health;
          });
          break;
        case 'Highest Percentage Health':
          targets.sort(function(a, b) {
            return (a.stats.health / a.stats.maxHealth) + (b.stats.health / b.stats.maxHealth);
          });
          break;
        default:
          break;
      }

      if (targets[0].id >= 200) {
        fightQueueService.actionOnEnemy(targets[0]);
      } else {
        fightQueueService.actionOnAlly(targets[0]);
      }

    }
  }
})();
