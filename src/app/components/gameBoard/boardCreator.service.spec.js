(function() {
  'use strict';

  describe('boardCreator', function() {
    var bc;

    beforeEach(module('outerZone'));

    beforeEach(inject(function(_boardCreator_) {
      bc = _boardCreator_;
      this.defaultBoard = {
        name: null,
        numRows: 15,
        numCols: 15,
        specialCells: null
      };
    }));

    describe('buildBoardLayout', function() {
      it('should return a layout with rows equal to the numRows passed', function() {
        expect(bc.buildBoardLayout(this.defaultBoard).length).toEqual(this.defaultBoard.numRows);
      });

      it('should return a layout with columns equal to the numCols passed', function() {
        expect(bc.buildBoardLayout(this.defaultBoard)[0].length).toEqual(this.defaultBoard.numCols);
      });

      it('each cell should have an x value that matches its array position', function() {
        expect(bc.buildBoardLayout(this.defaultBoard)[5][7].xCoord).toEqual(7);
        expect(bc.buildBoardLayout(this.defaultBoard)[5][0].xCoord).toEqual(0);
        expect(bc.buildBoardLayout(this.defaultBoard)[1][7].xCoord).toEqual(7);
      });

      it('each cell should have a y value that matches its array position', function() {
        expect(bc.buildBoardLayout(this.defaultBoard)[13][1].yCoord).toEqual(13);
        expect(bc.buildBoardLayout(this.defaultBoard)[0][1].yCoord).toEqual(0);
        expect(bc.buildBoardLayout(this.defaultBoard)[13][4].yCoord).toEqual(13);
      });

      it('should incorporate a single special cell', function() {
        this.defaultBoard.specialCells = [[2, 6, 'Poison']];
        var layout = bc.buildBoardLayout(this.defaultBoard);
        expect(layout[2][6].special).toEqual('Poison');
      });

      it('should incorporate multiple special cells', function() {
        this.defaultBoard.specialCells = [[1, 5, 'Water'], [7, 9, 'Magma'], [14, 14, 'Hole']];
        var layout = bc.buildBoardLayout(this.defaultBoard);
        expect(layout[1][5].special).toEqual('Water');
        expect(layout[7][9].special).toEqual('Magma');
        expect(layout[14][14].special).toEqual('Hole');
      })
    });

    describe('getValidMovements', function() {
      beforeEach(function() {
        this.defaultBoard.layout = bc.buildBoardLayout(this.defaultBoard);
        this.currentLocation = this.defaultBoard.layout[7][7];
      });

      it('if distance is 0, should return an empty array', function() {
        expect(bc.getValidMovements(this.defaultBoard.layout, this.currentLocation, 0)).toEqual([]);
      });

      it('if distance is 1, should return the surrounding cells', function() {
        var expectedMoves = [
            { xCoord: 7, yCoord: 6, blocked: false, special: null },
            { xCoord: 7, yCoord: 8, blocked: false, special: null },
            { xCoord: 6, yCoord: 7, blocked: false, special: null },
            { xCoord: 8, yCoord: 7, blocked: false, special: null }
          ].sort();
        expect(bc.getValidMovements(this.defaultBoard.layout, this.currentLocation, 1).sort()).toEqual(expectedMoves);
      });

      it('if distance is 2, returns all tiles 2 away', function() {
        var expectedMoves = [
          { xCoord: 7, yCoord: 6, blocked: false, special: null },
          { xCoord: 7, yCoord: 8, blocked: false, special: null },
          { xCoord: 6, yCoord: 7, blocked: false, special: null },
          { xCoord: 8, yCoord: 7, blocked: false, special: null },
          { xCoord: 6, yCoord: 6, blocked: false, special: null },
          { xCoord: 6, yCoord: 8, blocked: false, special: null },
          { xCoord: 5, yCoord: 7, blocked: false, special: null },
          { xCoord: 8, yCoord: 6, blocked: false, special: null },
          { xCoord: 8, yCoord: 8, blocked: false, special: null },
          { xCoord: 9, yCoord: 7, blocked: false, special: null },
          { xCoord: 7, yCoord: 5, blocked: false, special: null },
          { xCoord: 7, yCoord: 9, blocked: false, special: null }
        ].sort();
        expect(bc.getValidMovements(this.defaultBoard.layout, this.currentLocation, 2)).toEqual(expectedMoves)
      });

      it('if blocked in, returns an empty array', function() {
        this.defaultBoard.layout[7][6].blocked = true;
        this.defaultBoard.layout[7][8].blocked = true;
        this.defaultBoard.layout[6][7].blocked = true;
        this.defaultBoard.layout[8][7].blocked = true;
        expect(bc.getValidMovements(this.defaultBoard.layout, this.currentLocation, 20).sort()).toEqual([]);
      })

    })



  })
})();
