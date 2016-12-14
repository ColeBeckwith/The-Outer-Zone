(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('boardCreator', boardCreatorService);

  function boardCreatorService() {
    var svc = this;

    svc.buildBoardLayout = buildBoardLayout;
    svc.createRandomBoard = createRandomBoard;
    svc.generateRandomStartingPositions = generateRandomStartingPositions;
    svc.createCustomBoard = createCustomBoard;
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
          numCols: 9,
          numRows: 9,
          specialCells: [
            [0, 0, 'Void'],
            [1, 0, 'Void'],
            [2, 0, 'Void'],
            [3, 0, 'Void'],
            [5, 0, 'Void'],
            [6, 0, 'Void'],
            [7, 0, 'Void'],
            [8, 0, 'Void'],

            [0, 1, 'Void'],
            [1, 1, 'Void'],
            [2, 1, 'Void'],
            [6, 1, 'Void'],
            [7, 1, 'Void'],
            [8, 1, 'Void'],

            [0, 2, 'Void'],
            [1, 2, 'Void'],
            [7, 2, 'Void'],
            [8, 2, 'Void'],

            [0, 3, 'Void'],
            [8, 3, 'Void'],

            [0, 5, 'Void'],
            [8, 5, 'Void'],

            [0, 6, 'Void'],
            [1, 6, 'Void'],
            [7, 6, 'Void'],
            [8, 6, 'Void'],

            [0, 7, 'Void'],
            [1, 7, 'Void'],
            [2, 7, 'Void'],
            [6, 7, 'Void'],
            [7, 7, 'Void'],
            [8, 7, 'Void'],

            [0, 8, 'Void'],
            [1, 8, 'Void'],
            [2, 8, 'Void'],
            [3, 8, 'Void'],
            [5, 8, 'Void'],
            [6, 8, 'Void'],
            [7, 8, 'Void'],
            [8, 8, 'Void']
          ]
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
          [3, 3]
        ],
        [
          [4, 4]
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
          [6, 6]
        ],
        [
          [4, 1],
          [1, 4],
          [7, 4],
          [4, 7]
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
          var cell = boardLayout[specialCell[1]][specialCell[0]];
          cell.special = specialCell[2];
          if (specialCell[2] === 'Void') {
            cell.blocked = true;
          }
        });
      }

      return boardLayout;
    }

    function createRandomBoard(allies, enemies) {
      var numCols = Math.floor(Math.random() * 24) + 1;
      var numRows = Math.floor(Math.random() * 12) + 1;

      // Make sure they can all fit.
      while (numCols * numRows < (allies.length + enemies.length) * 3) {
        numCols = Math.floor(Math.random() * 20) + 1;
        numRows = Math.floor(Math.random() * 10) + 1;
      }

      var randomBoard = {
        name: generateRandomName(),
        numCols: numCols,
        numRows: numRows,
        specialCells: null
      };

      randomBoard.layout = buildBoardLayout(randomBoard);

      var playersCanFit = false;

      while (!playersCanFit) {
        generateRandomSpecialCells(randomBoard);
        var availableCells = 0;
        angular.forEach(randomBoard.layout, function (row) {
          angular.forEach(row, function(cell) {
            if (!cell.blocked) {
              availableCells++;
            }
          })
        });
        if (availableCells >= allies.length + enemies.length * 2) {
          playersCanFit = true;
        }
      }

      var startingPositions = generateRandomStartingPositions(allies, enemies, randomBoard);


      return randomBoard;
    }

    function generateRandomSpecialCells(board) {
      // TODO. This currently doesn't protect against parts of the board being completely sectioned off.
      // Won't stop isolated void cells because their neighbors may not be void yet, but made void later.
      angular.forEach(board.layout, function(row) {
        angular.forEach(row, function(cell) {
          var neighboringCells = getNeighboringCells(board, cell);

          var voidCount = 0;
          var waterCount = 0;
          var acidCount = 0;
          var fireCount = 0;
          angular.forEach(neighboringCells, function(neighboringCell) {
            switch (neighboringCell.special) {
              case 'Void':
                voidCount++;
                break;
              case 'Water':
                waterCount++;
                break;
              case 'Acid':
                acidCount++;
                break;
              case 'Fire':
                fireCount++;
                break;
              default:
                break;
            }
          });

          if (Math.random() * (waterCount + 1) > .95) {
            cell.special = 'Water';
          }
          if (Math.random() * (fireCount + 1) > .95) {
            cell.special = 'Fire';
          }
          if (Math.random() * (acidCount + 1) > .95) {
            cell.special = 'Acid';
          }

          // This will encourage a relatively round shape to the map.
          var distanceFromCenter = Math.abs(cell.xCoord - ((board.numCols / 2) - 1)) +
                                   Math.abs(cell.yCoord - ((board.numRows / 2) - 1));

          if (voidCount === neighboringCells.length || Math.random() > 1 - (.01 * (Math.pow(distanceFromCenter, 2) + 1))) {
            cell.special = 'Void';
            cell.blocked = true;
          }
        })
      });

    }

    function generateRandomName() {
      var adjectives = ['Mossy', 'Icy', 'Frosty', 'Frosted', 'Cold', 'Frozen', 'Ice Cold', 'Cool', 'Warm', 'Hot', 'Scorching', 'Black', 'Blue', 'Red', 'White', 'Green', 'Rocky', 'Demolished'];

      var nouns = ['Alley', 'Warehouse', 'Penthouse', 'Cellar', 'Bar', 'Night Club', 'Beach', 'Shipwreck', 'Cave', 'Apartment', 'Slums', 'Cliffside', 'Mountain', 'Forest', 'Desert', 'Lake', 'River', 'Pond', 'Stream', ''];

      return adjectives[Math.floor(Math.random() * adjectives.length)] + ' ' + nouns[Math.floor(Math.random() * nouns.length)]
    }

    function generateRandomStartingPositions(allies, enemies, board) {
      angular.forEach(allies.concat(enemies), function(character) {
        var xCoord = Math.floor(Math.random() * board.numCols);
        var yCoord = Math.floor(Math.random() * board.numRows);

        while (board.layout[yCoord][xCoord].blocked) {
          xCoord = Math.floor(Math.random() * board.numCols);
          yCoord = Math.floor(Math.random() * board.numRows);
        }

        placeCharacter(board.layout[yCoord][xCoord], character, board);
      })
    }

    function createCustomBoard(name, numOfCells, numOfRows, specialCells) {

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
      if (cell.xCoord !== board.numCols - 1) {
        neighboringCells.push(board.layout[cell.yCoord][cell.xCoord + 1])
      }
      if (cell.yCoord !== board.numRows - 1) {
        neighboringCells.push(board.layout[cell.yCoord + 1][cell.xCoord])
      }
      if (cell.xCoord !== 0) {
        neighboringCells.push(board.layout[cell.yCoord][cell.xCoord - 1])
      }
      for(var i = neighboringCells.length - 1; i > 0; i--) {
        if (neighboringCells[i].special === 'Void') {
          neighboringCells.splice(i, 1);
        }
      }
      return neighboringCells;
    }

    function getValidTargets(currentLoc, distance, board) {
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

            var notVoid = neighboringCell.special !== 'Void';
            var notAlreadyAdded = validMoves.indexOf(neighboringCell) === -1;
            var notGoingToBeAdded = cellsToAdd.indexOf(neighboringCell) === -1;

            if (notVoid && notAlreadyAdded && notGoingToBeAdded) {
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
          vacateCell(character.coordinates.x, character.coordinates.y, board);
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

            var neighboringCells = getNeighboringCells(board, cell);

            angular.forEach(neighboringCells, function(cell) {
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

    function vacateCell(xCoord, yCoord, board) {
      if (!board) {
        board = svc.currentBoard;
      }
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
