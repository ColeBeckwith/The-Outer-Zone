(function() {
  'use strict';

  describe('Enemy AI Service', function() {
    var AIService;
    var bc;

    beforeEach(module('outerZone'));

    beforeEach(inject(function(_AIService_, _boardCreator_) {
      AIService = _AIService_;
      bc = _boardCreator_;
    }));

    describe('getOpponentPositions', function() {
      beforeEach(function() {
        this.characterId = 201;
        this.board = bc.boards[0];
        this.board.layout = bc.buildBoardLayout(this.board);
        this.opponents = [{ name : 'Scarecrow', id : 100 }, { name : 'Dorothy', id : 101}];
        bc.placeCharacterSet(this.board.layout, [[3, 4], [1, 2]], this.opponents);
      });

      it('should return an array with the opponents positions', function() {
        var positions = AIService.getOpponentPositions(this.board, this.characterId);
        expect(positions).toEqual([{x : 1, y: 2}, {x: 3, y: 4}]);
      });

      it('should not return any friendly positions', function() {
        this.cell = this.board.layout[7][8];
        this.friendly = { name : 'Monkey', id : 204};
        bc.placeCharacter(this.cell, this.friendly, this.board);
        var positions = AIService.getOpponentPositions(this.board, this.characterId);
        expect(positions).toEqual([{ x : 1, y : 2}, { x : 3, y : 4}])
      });

      it('if run by an ally should not return any ally locations', function() {
        var positions = AIService.getOpponentPositions(this.board, 102);
        expect(positions).toEqual([]);
      })
    });

    describe('dumbSortClosest', function() {
      beforeEach(function() {
        this.locations = [{ x :8, y : 4}, { x : 1, y : 4}, { x : 0, y : 9}];
        this.character = {
          coordinates : {
            x: 0,
            y: 0
          }
        };
      });

      it('should return the nearest location regardless of how many moves it would take to get there', function() {
        expect(AIService.dumbSortByClosest(this.locations, this.character)).toEqual([
          { x: 1, y: 4, distanceAway: 5 },
          { x: 0, y: 9, distanceAway: 9 },
          { x: 8, y: 4, distanceAway: 12 }
        ]);
      })
    });

    describe('getTrueDistance', function() {
      beforeEach(function() {
        this.character = {
          coordinates : {
            x : 3,
            y: 2
          }
        };
        this.defaultBoard = bc.boards[0];
        this.defaultBoard.layout = bc.buildBoardLayout(this.defaultBoard);
        this.defaultBoard.layout[2][3].blocked = true;
        this.destination = { x : 4, y: 4}
      });

      it('should return the dumb distance if there are no blocked cells in between', function() {
        var trueDistance = AIService.getTrueDistance(this.defaultBoard, this.destination, this.character);
        expect(trueDistance).toEqual(3);
        this.destination = { x : 5, y : 4};
        trueDistance = AIService.getTrueDistance(this.defaultBoard, this.destination, this.character);
        expect(trueDistance).toEqual(4);
        this.destination = { x : 4, y : 2};
        trueDistance = AIService.getTrueDistance(this.defaultBoard, this.destination, this.character);
        expect(trueDistance).toEqual(1);
      });

      it('should return the the distance navigated around blocked cells', function() {
        this.defaultBoard.layout[3][3].blocked = true;
        this.defaultBoard.layout[3][4].blocked = true;
        var trueDistance = AIService.getTrueDistance(this.defaultBoard, this.destination, this.character);
        expect(trueDistance).toEqual(5);
        this.defaultBoard.layout[3][2].blocked = true;
        trueDistance = AIService.getTrueDistance(this.defaultBoard, this.destination, this.character);
        expect(trueDistance).toEqual(5);
        this.defaultBoard.layout[2][4].blocked = true;
        trueDistance = AIService.getTrueDistance(this.defaultBoard, this.destination, this.character);
        expect(trueDistance).toEqual(7);
        this.defaultBoard.layout[1][4].blocked = true;
        this.defaultBoard.layout[3][1].blocked = true;
        trueDistance = AIService.getTrueDistance(this.defaultBoard, this.destination, this.character);
        expect(trueDistance).toEqual(9);
      });
    });

    describe('quickFindClosest', function() {
      beforeEach(function() {
        this.defaultBoard = bc.boards[0];
        this.defaultBoard.layout = bc.buildBoardLayout(this.defaultBoard);
        this.character = {
          coordinates: {
            x: 4,
            y: 2,
            special: null
          }
        };

        this.opponents = [{ name : 'Scarecrow', id : 100 }, { name : 'Dorothy', id : 101}];
        bc.placeCharacterSet(this.defaultBoard.layout, [[0, 8], [5, 4]], this.opponents);

        this.dumbSortedAscLocations = AIService.dumbSortByClosest(AIService.getOpponentPositions(this.defaultBoard, 205), this.character);

      });

      it('should return the nearest enemy location if there are no blocked cells in the way', function() {
        expect(AIService.quickFindClosest(this.defaultBoard, this.character, this.dumbSortedAscLocations))
          .toEqual(Object({ x: 5, y: 4, distanceAway: 3 }));
      });

      it('should return null if there are blocked cells in the way', function() {
        this.defaultBoard.layout[3][4].blocked = true;
        this.defaultBoard.layout[3][5].blocked = true;
        expect(AIService.quickFindClosest(this.defaultBoard, this.character, this.dumbSortedAscLocations))
          .toEqual(null);
      });
    });

    describe('slowFindClosest', function() {
      beforeEach(function() {
        this.defaultBoard = bc.boards[0];
        this.defaultBoard.layout = bc.buildBoardLayout(this.defaultBoard);
        this.character = {
          coordinates: {
            x: 4,
            y: 2,
            special: null
          }
        };

        this.opponents = [{ name : 'Scarecrow', id : 100 }, { name : 'Dorothy', id : 101}];
        bc.placeCharacterSet(this.defaultBoard.layout, [[0, 8], [5, 4]], this.opponents);
        this.defaultBoard.layout[3][4].blocked = true;
        this.defaultBoard.layout[3][5].blocked = true;
        this.dumbSortedAscLocations = AIService.dumbSortByClosest(AIService.getOpponentPositions(this.defaultBoard, 205), this.character);
      });

      it('should return the location of the nearest enemy', function() {
        var moveLocation = AIService.slowFindClosest(this.defaultBoard, this.character, this.dumbSortedAscLocations);
        expect(moveLocation).toEqual(Object({ x: 5, y: 4, distanceAway: 3, trueDistance: 5 }));
      });

      it('should return the nearest enemy, even if another enemy is fewer spaces away, but blocked', function() {
        this.defaultBoard.layout[3][3].blocked = true;
        this.defaultBoard.layout[3][2].blocked = true;
        this.defaultBoard.layout[3][1].blocked = true;
        this.defaultBoard.layout[4][1].blocked = true;
        this.defaultBoard.layout[5][1].blocked = true;
        this.defaultBoard.layout[2][5].blocked = true;
        this.defaultBoard.layout[1][5].blocked = true;
        this.defaultBoard.layout[1][6].blocked = true;
        this.defaultBoard.layout[1][7].blocked = true;

        var moveLocation = AIService.slowFindClosest(this.defaultBoard, this.character, this.dumbSortedAscLocations);
        expect(moveLocation).toEqual({ x: 0, y: 8, distanceAway: 10, trueDistance: 10 });
      });
    });

    describe('getMoveLocation', function() {
      beforeEach(function() {
        this.board = bc.boards[0];
        this.board.layout = bc.buildBoardLayout(this.board);

        this.character = {
          coordinates : {
            x: 3,
            y: 2
          },
          id: 201
        };

        this.opponents = [{ name : 'Scarecrow', id : 100 }, { name : 'Dorothy', id : 101}];
        bc.placeCharacterSet(this.board.layout, [[3, 3], [5, 4]], this.opponents);
      });

      it('should return null if there is an enemy in an adjacent cell', function() {
        expect(AIService.getMoveLocation(this.board, this.character)).toEqual(null);
      });

      it('should not return null if an ally is in an adjacent cell', function() {
        this.character.coordinates.x = 2;
        this.character.coordinates.y = 1;
        bc.placeCharacter(this.board.layout[3][1], { id : 203 }, this.board);
        expect(AIService.getMoveLocation(this.board, this.character)).not.toEqual(null);
      });

      it('should return null if there are no enemies on the board', function() {
        this.board.layout[3][3].occupant = null;
        this.board.layout[4][5].occupant = null;
        expect(AIService.getMoveLocation(this.board, this.character)).toEqual(null);
      });

      it('should return the location of the nearest enemy in true distance', function() {
        this.character.coordinates.x = 2;
        this.character.coordinates.y = 2;
        expect(AIService.getMoveLocation(this.board, this.character).x).toEqual(3);
        expect(AIService.getMoveLocation(this.board, this.character).y).toEqual(3);
      })
    })

  })

})();
