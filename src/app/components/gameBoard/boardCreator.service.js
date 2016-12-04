(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('boardCreator', boardCreatorService);

  function boardCreatorService() {
    var svc = this;

    svc.buildBoardLayout = buildBoardLayout;
    svc.getValidMovements = getValidMovements;
    svc.placeCharacter = placeCharacter;
    svc.placeCharacterSet = placeCharacterSet;
    svc.getBoards = getBoards;
    svc.getBoardNumber = getBoardNumber;

    // numRows and numCols are always the max col/row. Boards can be any shape, but they are represented as rectangles
    // and then cells are removed one by one to get the desired shape.
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

    function getValidMovements(board, currentLoc, distance) {
      var availableMoves = [currentLoc];
      var newCells = [currentLoc];

      for (var i = 0; i < distance; i++) {
        var cellsToAdd = [];
        angular.forEach(newCells, function(cell) {
          var neighboringCells = [
              board.layout[cell.xCoord - 1][cell.yCoord],
              board.layout[cell.xCoord + 1][cell.yCoord],
              board.layout[cell.xCoord][cell.yCoord - 1],
              board.layout[cell.xCoord][cell.yCoord + 1]
          ];
          angular.forEach(neighboringCells, function(neighboringCell) {
            // If it exists, it's not blocked and it's not already added.
            if (neighboringCell && !neighboringCell.blocked && availableMoves.indexOf(neighboringCell) === -1) {
                availableMoves.push(neighboringCell);
                cellsToAdd.push(neighboringCell);
            }
          })
        });

        newCells = cellsToAdd;
      }

      // Removes currentLoc.
      availableMoves.shift();

      return availableMoves;
    }

    function placeCharacter(cell, character) {
      if (!cell.blocked) {
        cell.occupant = character;
        cell.blocked = true;
      }
    }

    function placeCharacterSet(layout, coordinates, characterSet) {
      for (var i = 0; i < characterSet.length; i++) {
        var cell = layout[coordinates[i][0]][coordinates[i][1]];
        if (!cell.blocked) {
          cell.occupant = characterSet[i];
          cell.blocked = true;
          characterSet[i].location = cell;
        }
      }
    }

    function getBoards() {
      return svc.boards;
    }

    function getBoardNumber(number) {
      return svc.boards[number];
    }
  }

})();
