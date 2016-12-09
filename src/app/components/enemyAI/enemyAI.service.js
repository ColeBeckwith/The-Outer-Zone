(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('AIService', AIService);

  AIService.$inject = ['boardCreator'];

  function AIService(boardCreator) {
    var svc = this;

    svc.getMoveLocation = getMoveLocation;
    svc.quickFindClosest = quickFindClosest;
    svc.getOpponentPositions = getOpponentPositions;
    svc.dumbSortByClosest = dumbSortByClosest;
    svc.getTrueDistance = getTrueDistance;
    svc.checkIfPlayerCanReach = checkIfPlayerCanReach;


    function getMoveLocation(board, character) {
      var layout = board.layout;
      svc.quickFindClosest(board, character);
      // TODO
    }

    function quickFindClosest(board, character) {
      var opponentLocations = getOpponentPositions(board, character.id);
      var dumbSortedAscLocations = dumbSortByClosest(opponentLocations, character);
      var trueDistanceOfNearest = getTrueDistance(board, dumbSortedAscLocations[0], character);
      if (trueDistanceOfNearest === dumbSortedAscLocations[0].distanceAway) {
        return dumbSortedAscLocations[0];
      } else {
        return false;
      }
      // TODO
    }

    function getOpponentPositions(board, characterId) {
      var opponentLocations = [];
      angular.forEach(board.layout, function(row, yCoord) {
        angular.forEach(row, function(cell, xCoord) {
          if (cell.occupant) {
            if (cell.occupant.id.toString()[0] !== characterId.toString()[0]) {
              opponentLocations.push({ x : xCoord, y : yCoord});
            }
          }
        })
      });
      return opponentLocations;
    }

    function dumbSortByClosest(locations, character) {
      var clonedLocations = angular.copy(locations);
      angular.forEach(clonedLocations, function(loc) {
        loc.distanceAway = Math.abs(loc.x - character.coordinates.x) + Math.abs(loc.y - character.coordinates.y)
      });
      return clonedLocations.sort(function(a, b) {
        return a.distanceAway - b.distanceAway;
      });
    }

    function getTrueDistance(board, destination, character) {
      var destinationReached = false;
      var moves = 0;
      var startingCell = board.layout[character.coordinates.y][character.coordinates.x];
      var newCells = boardCreator.getNeighboringCells(board, startingCell);
      while(!destinationReached && moves < 60) {
        moves++;
        angular.forEach(newCells, function(cell) {
          if (cell.xCoord === destination.x && cell.yCoord === destination.y) {
            destinationReached = true;
          }
        });


      }
      return moves;
    }

    function checkIfPlayerCanReach() {


      // TODO
    }




  }

})();
