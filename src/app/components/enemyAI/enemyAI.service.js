(function () {
    'use strict';

    angular
        .module('outerZone')
        .service('AIService', AIService);

    AIService.$inject = ['boardManager', 'alliesService'];

    function AIService(boardManager, alliesService) {
        var svc = this;

        svc.getMoveLocation = getMoveLocation;
        svc.getAttackTarget = getAttackTarget;
        svc.quickFindClosest = quickFindClosest;
        svc.slowFindClosest = slowFindClosest;
        svc.getOpponentPositions = getOpponentPositions;
        svc.dumbSortByClosest = dumbSortByClosest;
        svc.getTrueDistance = getTrueDistance;
        svc.checkIfPlayerCanReach = checkIfPlayerCanReach;

        // TODO each enemy should have an AIProfile property. Values could be 'Passive' 'Aggressive' 'Evasive' etc.
        // These should affect action taken. Enemies are not limited to single profile, so the property should be
        // expressed as an array.

        function getMoveLocation(board, character) {
            // Expect a return in the form {x: coordinate, y: coordinate} or null if no movement required.

            var allies = alliesService.getActiveAllies();

            for (var j = 0; j < allies.length; j++) {
                if (allies[j].stance === 'Man of Stone') {
                    return {x: allies[j].coordinates.x, y: allies[j].coordinates.y};
                }
            }

            var neighboringCells = boardManager.getNeighboringCells(board, {
                xCoord: character.coordinates.x,
                yCoord: character.coordinates.y
            });
            for (var i = 0; i < neighboringCells.length; i++) {
                var occupant = neighboringCells[i].occupant;
                if (occupant && (occupant.id.toString()[0] !== character.id.toString()[0]) && occupant.status !== 'dead') {
                    return null;
                }
            }

            var opponentPositions = getOpponentPositions(board, character.id);
            if (opponentPositions.length === 0) {
                return null;
            }

            var dumbSortedAscLocations = dumbSortByClosest(opponentPositions, character);
            var moveLocation = svc.quickFindClosest(board, character, dumbSortedAscLocations);
            if (moveLocation) {
                return moveLocation;
            }

            moveLocation = svc.slowFindClosest(board, character, dumbSortedAscLocations);
            if (moveLocation) {
                return moveLocation;
            }
        }

        function getAttackTarget(board, character) {
            var allies = alliesService.getActiveAllies();

            for (var j = 0; j < allies.length; j++) {
                var ally = allies[j];
                if (ally.stance === 'Man of Stone') {
                    if (boardManager.checkDistance(board, {x: character.position.x, y: character.position.y}, {x: ally.position.x, y: ally.position.y})) {
                        return ally;
                    } else {
                        return null;
                    }
                }
            }
            // TODO for now an enemy will only attack a player that is right next to them.
            var characterCell = {xCoord: character.coordinates.x, yCoord: character.coordinates.y};
            var neighboringCells = boardManager.getNeighboringCells(board, characterCell);
            for (var i = 0; i < neighboringCells.length; i++) {
                var occupant = neighboringCells[i].occupant;
                if (occupant && (occupant.id.toString()[0] !== character.id.toString()[0]) && occupant.status !== 'dead') {
                    return occupant;
                }
            }

            return null;
        }

        function quickFindClosest(board, character, opponentPositions) {
            if (opponentPositions.length === 0) {
                return null;
            }
            var trueDistanceOfNearest = getTrueDistance(board, opponentPositions[0], character);
            if (trueDistanceOfNearest === opponentPositions[0].distanceAway) {
                return opponentPositions[0];
            } else {
                return null;
            }
        }

        function slowFindClosest(board, character, opponentPositions) {
            if (opponentPositions.length === 0) {
                return null;
            }
            angular.forEach(opponentPositions, function (position) {
                position.trueDistance = getTrueDistance(board, position, character)
            });
            return opponentPositions.sort(function (a, b) {
                return a.trueDistance - b.trueDistance
            })[0];
        }

        function getOpponentPositions(board, characterId) {
            var opponentLocations = [];
            angular.forEach(board.layout, function (row, yCoord) {
                angular.forEach(row, function (cell, xCoord) {
                    if (cell.occupant) {
                        if (cell.occupant.id.toString()[0] !== characterId.toString()[0] && cell.occupant.status !== 'dead') {
                            opponentLocations.push({x: xCoord, y: yCoord});
                        }
                    }
                })
            });
            return opponentLocations;
        }

        function dumbSortByClosest(locations, character) {
            var clonedLocations = angular.copy(locations);
            angular.forEach(clonedLocations, function (loc) {
                loc.distanceAway = Math.abs(loc.x - character.coordinates.x) + Math.abs(loc.y - character.coordinates.y)
            });
            return clonedLocations.sort(function (a, b) {
                return a.distanceAway - b.distanceAway;
            });
        }

        function getTrueDistance(board, destination, character) {
            // This is lacking some efficiency. Cells are checked multiple times.
            var destinationReached = false;
            var distance = 0;

            var startingCell = board.layout[character.coordinates.y][character.coordinates.x];

            var checkedCells = [startingCell];
            var newCells = boardManager.getNeighboringCells(board, startingCell);

            while (!destinationReached && distance < 100) {
                distance++;
                var cellsToCheckNext = [];

                angular.forEach(newCells, function (cell) {
                    checkedCells.push(cell);

                    if (cell.xCoord === destination.x && cell.yCoord === destination.y) {
                        destinationReached = true;
                        return;
                    }

                    var neighboringCells = [];

                    if (!cell.blocked) {
                        neighboringCells = boardManager.getNeighboringCells(board, cell);
                    }

                    angular.forEach(neighboringCells, function (cell) {
                        if (checkedCells.indexOf(cell) === -1 && cellsToCheckNext.indexOf(cell) === -1) {
                            cellsToCheckNext.push(cell);
                        }
                    })
                });
                newCells = cellsToCheckNext;
            }

            return distance;
        }

        function checkIfPlayerCanReach() {
            // TODO put in Board Creator though.
        }

    }

})();
