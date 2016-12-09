(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('AIService', AIService);

  function AIService() {
    var svc = this;

    svc.getMoveLocation = getMoveLocation;
    svc.quickFindClosest = quickFindClosest;
    svc.getOpponentPositions = getOpponentPositions;
    svc.dumbSortByClosest = dumbSortByClosest;
    svc.getTrueDistance = getTrueDistance;
    svc.checkIfPlayerCanReach = checkIfPlayerCanReach;


    function getMoveLocation(board, character) {
      var layout = board.layout;
      svc.quickFindClosest(board, character)
    }

    function quickFindClosest(board, character) {
      var opponentLocations = getOpponentPositions(board, character.id);
      var dumbSortedAscLocations = dumbSortByClosest(opponentLocations, character);
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

    function getTrueDistance() {
      // Loop through the dumb distances and see if you can reach any of them. If you can. Move toward them.
    }

    function checkIfPlayerCanReach() {
      
    }




  }

})();
