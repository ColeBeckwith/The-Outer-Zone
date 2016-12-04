(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('boardCreator', boardCreatorService);

  function boardCreatorService() {
    var svc = this;

    svc.buildBoardLayout = buildBoardLayout;
    svc.getValidMovements = getValidMovements;
    svc.getBoards = getBoards;

    // numRows and numCols are always the max col/row. Boards can be any shape, but they are represented as rectangles
    // and then cells are removed one by one to get the desired shape.
    svc.boards = [
      {
        name: null,
        numRows: 15,
        numCols: 15,
        specialCells: null
      }
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

    // currentLoc is passed in as an array e.g. [1, 3]
    function getValidMovements(boardLayout, currentLoc, distance) {
      var availableMoves = [currentLoc];
      var newCells = [currentLoc];

      for (var i = 0; i < distance; i++) {
        var cellsToAdd = [];
        angular.forEach(newCells, function(cell) {
          var neighboringCells = [
              boardLayout[cell.xCoord - 1][cell.yCoord],
              boardLayout[cell.xCoord + 1][cell.yCoord],
              boardLayout[cell.xCoord][cell.yCoord - 1],
              boardLayout[cell.xCoord][cell.yCoord + 1]
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

    function getBoards() {
      return svc.boards;
    }
  }

})();
