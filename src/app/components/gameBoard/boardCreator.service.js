(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('boardCreator', boardCreatorService);

  boardCreatorService.$inject = ['boardManager'];

  function boardCreatorService(boardManager) {
    var svc = this;

    svc.buildBoardLayout = buildBoardLayout;
    svc.createRandomBoard = createRandomBoard;
    svc.checkContiguity = checkContiguity;
    svc.generateRandomStartingPositions = generateRandomStartingPositions;
    svc.createCustomBoard = createCustomBoard;

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
          cell.blocked = (specialCell[2] === 'Void');
        });
      }

      return boardLayout;
    }

    function createRandomBoard(allies, enemies) {
      var numCols = Math.floor(Math.random() * 24) + 2;
      var numRows = Math.floor(Math.random() * 12) + 2;
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
      var loopBreaker = 0;
      while (!playersCanFit && loopBreaker < 100) {
        var boardContiguous = false;
        while (!boardContiguous) {
          scrubBoard(randomBoard);
          generateRandomSpecialCells(randomBoard);
          boardContiguous = checkContiguity(randomBoard);
        }
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
        loopBreaker++;
      }
      generateRandomStartingPositions(allies, enemies, randomBoard);
      return randomBoard;
    }

    function generateRandomSpecialCells(board) {
      // Now protects against parts of the board being non-contiguous, BUT still consider the scenario where the
      // map is two chambers connected by a hallway with a width of a single cell. The two teams clash at the choke point
      // and an ally dies in the hallway. Now that pathway is blocked and the fight cannot be finished. Of course, this
      // is an extremely unlikely scenario and the only real solution would be to remove dead allies from the board,
      // which becomes problematic for other reasons, such as replacing them when they are revived.
      angular.forEach(board.layout, function(row) {
        angular.forEach(row, function(cell) {
          var neighboringCells = boardManager.getNeighboringCells(board, cell);

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

          if (Math.random() > .98 - (waterCount * .05)) {
            cell.special = 'Water';
          }
          if (Math.random() > .98 - (fireCount * .05)) {
            cell.special = 'Fire';
          }
          if (Math.random() > .98 - (acidCount * .05)) {
            cell.special = 'Acid';
          }

          // This will encourage a relatively round shape to the map.
          var distanceFromCenter = Math.abs(cell.xCoord - ((board.numCols / 2) - 1)) +
                                   Math.abs(cell.yCoord - ((board.numRows / 2) - 1));

          if (voidCount === neighboringCells.length || Math.random() > .9 - (.01 * (Math.pow(distanceFromCenter, 2))) ) {
            cell.special = 'Void';
            cell.blocked = true;
          }
        })
      });

    }

    function scrubBoard(board) {
      angular.forEach(board.layout, function(row) {
        angular.forEach(row, function(cell) {
          cell.special = null;
          cell.blocked = false;
          cell.occupant = null;
        })
      })
    }

    function checkContiguity(board) {
      var contiguous = true;
      var nonVoidCells = [];
      angular.forEach(board.layout, function(row) {
        angular.forEach(row, function(cell) {
          if (cell.special !== 'Void') {
            nonVoidCells.push(angular.copy(cell));
          }
        })
      });

      var totalVoidCells = (board.numCols * board.numRows) - nonVoidCells.length;
      var maxDistanceBetweenCells = board.numCols * board.numRows - (1 + totalVoidCells);

      angular.forEach(nonVoidCells, function(cell) {
        var reachableSpaces = boardManager.getValidMovements(board, [cell.xCoord, cell.yCoord], maxDistanceBetweenCells);
        if (reachableSpaces.length !== nonVoidCells.length) {
          contiguous = false;
        }
      });

      return contiguous;

      // Note: The absolute minimum path from any one point to another is the abs value of the difference in xCoords
      // plus the absolute value of the difference in yCoords. So if we checked distance numCols + numRows, we'd
      // probably be fine, but we'd exclude some board that were contiguous.
      // The absolute maximum path from any one point to another for a grid given dimensions x * y is x * y - 1.
      // That would not be the most efficient since a blocking cell cannot be traveled through.
      // A most efficient and 100% accurate assumption is that the maximum distance between any two cells
      // is x * y - (1 + voidCells);
      // We could definitely get away with having a smaller number making it more efficient and then just excluding some
      // board that are in fact contiguous, but labyrinth like, but some of those might be cool and it's cool to know
      // that this solution actually proves exactly what it's trying to without much inefficiency.
      // On the other hand it will allow those labyrinth like board which could be problematic for other reasons, so
      // maybe it's better to have a lower number for maxDistanceBetween Cells. Either way, now it can easily be
      // modified.
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

  }

})();
