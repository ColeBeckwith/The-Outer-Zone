(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('boardCreator', boardCreatorService);

  function boardCreatorService() {
    var svc = this;

    svc.buildBoardLayout = buildBoardLayout;
    svc.setCurrentBoard = setCurrentBoard;
    svc.getValidMovements = getValidMovements;
    svc.getValidTargets = getValidTargets;
    svc.getNeighboringCells = getNeighboringCells;
    svc.makeCellsMovable = makeCellsMovable;
    svc.makeCellsTargetable = makeCellsTargetable;
    svc.checkPositionTargetable = checkPositionTargetable;
    svc.clearMoveAndTarget = clearMoveAndTarget;
    svc.clearAllyLocations = clearAllyLocations;
    svc.placeCharacter = placeCharacter;
    svc.placeCharacterSet = placeCharacterSet;
    svc.moveCharacterTowardLocation = moveCharacterTowardLocation;
    svc.vacateCell = vacateCell;
    svc.getBoards = getBoards;
    svc.getBoardNumber = getBoardNumber;

    activate();

    function activate() {
      svc.validMovements = [];

      svc.currentBoard = null;

      svc.boards = [
        {
          name: null,
          numCols: 10,
          numRows: 10,
          specialCells: null
        },
        {
          name: null,
          numCols: 25,
          numRows: 8,
          specialCells: null
        },
        {
          name: null,
          numCols: 20,
          numRows: 10,
          specialCells: null
        },
        {
          name: null,
          numCols: 20,
          numRows: 10,
          specialCells: null
        },
        {
          name: null,
          numCols: 20,
          numRows: 10,
          specialCells: null
        },
        {
          name: null,
          numCols: 20,
          numRows: 10,
          specialCells: null
        }
      ];

      svc.initialAllyPositions = [
        [
          [3, 3],
          [3, 5],
          [3, 7]
        ],
        [
          [3, 3],
          [3, 5],
          [3, 7]
        ],
        [
          [3, 3],
          [3, 5],
          [3, 7]
        ],
        [
          [3, 3],
          [3, 5],
          [3, 7]
        ],
        [
          [3, 3],
          [3, 5],
          [3, 7]
        ]
      ];

      svc.initialEnemyPositions = [
        [
          [6, 7]
        ],
        [
          [19, 2],
          [18, 4],
          [18, 5],
          [19, 7]
        ],
        [
          [7, 7],
          [6, 9]
        ],
        [
          [15, 2],
          [12, 4],
          [20, 5],
          [12, 6],
          [15, 8]
        ],
        [
          [10, 4],
          [10, 5],
          [10, 6]
        ],
        [
          [10, 4],
          [10, 5]
        ]
      ];
    }

    function buildBoardLayout(boardData) {
      var boardLayout = [];
      for (var row = 0; row < boardData.numRows; row++) {
        boardLayout[row] = [];
        for (var col = 0; col < boardData.numCols; col++) {
          boardLayout[row][col] = {xCoord: col, yCoord: row, blocked: false, special: null};
        }
      }

      if (boardData.specialCells) {
        angular.forEach(boardData.specialCells, function(specialCell) {
          boardLayout[specialCell[0]][specialCell[1]].special = specialCell[2];
        });
      }

      return boardLayout;
    }

    function setCurrentBoard(board) {
      svc.currentBoard = board;
    }

    function getValidMovements(board, currentLoc, distance) {
      if (!board) {
        board = svc.currentBoard;
      }
      var currentCell = board.layout[currentLoc[1]][currentLoc[0]];
      var validMoves = [currentCell];
      var newCells = [currentCell];

      for (var i = 0; i < distance; i++) {
        var cellsToAdd = [];
        angular.forEach(newCells, function(cell) {
          var neighboringCells = getNeighboringCells(board, cell);
          angular.forEach(neighboringCells, function(neighboringCell) {
            // If it's not blocked and it's not already added.
            if (!neighboringCell.blocked && validMoves.indexOf(neighboringCell) === -1) {
                validMoves.push(neighboringCell);
                cellsToAdd.push(neighboringCell);
            }
          })
        });
        newCells = cellsToAdd;
      }
      // Removes currentLoc.
      validMoves.shift();
      return validMoves;
    }

    function getNeighboringCells(board, cell) {
      var neighboringCells = [];
      if (cell.yCoord !== 0) {
        neighboringCells.push(board.layout[cell.yCoord - 1][cell.xCoord])
      }
      if (cell.xCoord !== board.numRows - 1) {
        neighboringCells.push(board.layout[cell.yCoord][cell.xCoord + 1])
      }
      if (cell.yCoord !== board.numCols - 1) {
        neighboringCells.push(board.layout[cell.yCoord + 1][cell.xCoord])
      }
      if (cell.xCoord !== 0) {
        neighboringCells.push(board.layout[cell.yCoord][cell.xCoord - 1])
      }
      for(var i = neighboringCells.length - 1; i > 0; i--) {
        if (neighboringCells[i].special === 'Empty') {
          neighboringCells.splice(i, 1);
        }
      }
      return neighboringCells;
    }

    function getValidTargets(board, currentLoc, distance) {
      if (!board) {
        board = svc.currentBoard;
      }
      var currentCell = board.layout[currentLoc[1]][currentLoc[0]];
      var validMoves = [currentCell];
      var newCells = [currentCell];

      for (var i = 0; i < distance; i++) {
        var cellsToAdd = [];
        angular.forEach(newCells, function(cell) {
          var neighboringCells = [
            board.layout[cell.yCoord - 1][cell.xCoord],
            board.layout[cell.yCoord + 1][cell.xCoord],
            board.layout[cell.yCoord][cell.xCoord - 1],
            board.layout[cell.yCoord][cell.xCoord + 1]
          ];
          angular.forEach(neighboringCells, function(neighboringCell) {
            // If it exists, it's not blocked and it's not already added.
            if (neighboringCell.special !== 'Empty' && validMoves.indexOf(neighboringCell) === -1) {
              validMoves.push(neighboringCell);
              cellsToAdd.push(neighboringCell);
            }
          })
        });

        newCells = cellsToAdd;
      }

      return validMoves;
    }

    function makeCellsMovable(cells) {
      angular.forEach(cells, function(cell) {
        cell.movable = true;
      })
    }

    function makeCellsTargetable(cells, targetType) {
      angular.forEach(cells, function(cell) {
        cell.targetable = true;
        cell.targetType = targetType;
      })
    }

    function checkPositionTargetable(xCoord, yCoord) {
      return svc.currentBoard.layout[yCoord][xCoord].targetable;
    }

    function clearMoveAndTarget() {
      angular.forEach(svc.currentBoard.layout, function(row) {
        angular.forEach(row, function(cell) {
          cell.movable = false;
          cell.targetable = false;
          cell.targetType = null;
        })
      })
    }

    function clearAllyLocations(allies) {
      angular.forEach(allies, function(ally) {
        delete ally.location;
      })
    }

    function placeCharacter(cell, character, board) {
      if (!cell.blocked) {
        if (character.coordinates) {
          vacateCell(board, character.coordinates.x, character.coordinates.y);
        }
        cell.occupant = character;
        cell.blocked = true;
        character.coordinates = {
          x : cell.xCoord,
          y : cell.yCoord,
          special : cell.special
        };
      }
    }

    function placeCharacterSet(layout, coordinates, characterSet) {
      for (var i = 0; i < characterSet.length; i++) {
        var cell = layout[coordinates[i][1]][coordinates[i][0]];
        if (!cell.blocked) {
          cell.occupant = characterSet[i];
          cell.blocked = true;
          characterSet[i].coordinates = {
            x : cell.xCoord,
            y : cell.yCoord,
            special : cell.special
          };
        }
      }
    }

    function moveCharacterTowardLocation(board, player, moveLocation, distance) {
      var characterLocation = [player.coordinates.x, player.coordinates.y];

      var validMoves = getValidMovements(board, characterLocation, distance);
      var cellToMoveTo = null;

      var cellsChecked = [];
      var nearestCellFound = false;
      var newCells = getNeighboringCells(board, { xCoord: moveLocation.x, yCoord: moveLocation.y });
      var infiniteLoopGuard = 0;
      while(!nearestCellFound && infiniteLoopGuard < 100) {
        var nextBatch = [];

        angular.forEach(newCells, function(cell) {
          if (nearestCellFound) {
            return;
          }
          if (!cell.blocked) {
            if (validMoves.indexOf(cell) !== -1) {
              nearestCellFound = true;
              cellToMoveTo = cell;
              return;
            }
            angular.forEach(getNeighboringCells(board, cell), function(cell) {
              if (!cell.blocked && cellsChecked.indexOf(cell) === -1) {
                nextBatch.push(cell);
              }
            })
          }
          cellsChecked.push(cell);
        });

        newCells = nextBatch;
        infiniteLoopGuard++;
      }

      if (cellToMoveTo) {
        placeCharacter(cellToMoveTo, player, board);
      }
    }

    function vacateCell(board, xCoord, yCoord) {
      var cell = board.layout[yCoord][xCoord];
      cell.occupant = null;
      cell.blocked = false;
    }

    function getBoards() {
      return svc.boards;
    }

    function getBoardNumber(number) {
      return svc.boards[number];
    }
  }

})();
