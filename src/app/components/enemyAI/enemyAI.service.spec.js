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
        this.destination = { x : 4, y: 4}
      });

      it('should return the dumb distance if there are no blocked cells in between', function() {
        var trueDistance = AIService.getTrueDistance(this.defaultBoard, this.destination, this.character);
        expect(trueDistance).toEqual(3);
      })
    })

  })

})();
