(function() {
  'use strict';

  describe('Board Creator', function() {
    var bc;
    var bm;

    beforeEach(module('outerZone'));

    beforeEach(inject(function(_boardCreator_, _boardManager_) {
      bc = _boardCreator_;
      bm = _boardManager_;
      this.defaultBoard = {
        name: null,
        numRows: 10,
        numCols: 10,
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
        expect(bc.buildBoardLayout(this.defaultBoard)[9][1].yCoord).toEqual(9);
        expect(bc.buildBoardLayout(this.defaultBoard)[0][1].yCoord).toEqual(0);
        expect(bc.buildBoardLayout(this.defaultBoard)[9][4].yCoord).toEqual(9);
      });

      it('should incorporate a single special cell', function() {
        this.defaultBoard.specialCells = [[2, 6, 'Poison']];
        var layout = bc.buildBoardLayout(this.defaultBoard);
        expect(layout[6][2].special).toEqual('Poison');
      });

      it('should incorporate multiple special cells', function() {
        this.defaultBoard.specialCells = [[1, 5, 'Water'], [7, 9, 'Magma'], [4, 4, 'Hole']];
        var layout = bc.buildBoardLayout(this.defaultBoard);
        expect(layout[5][1].special).toEqual('Water');
        expect(layout[9][7].special).toEqual('Magma');
        expect(layout[4][4].special).toEqual('Hole');
      });

      it('should block any cell thats special is Empty', function() {
        this.defaultBoard.specialCells = [[1, 5, 'Void'], [7, 9, 'Void'], [4, 4, 'Hole']];
        var layout = bc.buildBoardLayout(this.defaultBoard);
        expect(layout[5][1].blocked).toEqual(true);
        expect(layout[9][7].blocked).toEqual(true);
        expect(layout[4][4].blocked).toEqual(false);
      })
    });

    describe('generateRandomStartingPositions', function() {
      beforeEach(function() {
        this.board = {
          numCols : 10,
          numRows: 8,
          specialCells: null
        };
        this.board.layout = bc.buildBoardLayout(this.board);
        this.allies = [
          {
            name: 'Scarecrow'
          },
          {
            name: 'D. Taylor'
          }
        ];
        this.enemies = [
          {
            name: 'Monkey'
          },
          {
            name: 'Witch'
          },
          {
            name: 'Broom'
          }
        ]
      });

    });

    describe('checkContiguity', function() {
      it('should return false when given a non-contiguous board', function() {
        var board = {
          numCols: 3,
          numRows: 3,
          specialCells: [
            [1, 0, 'Void'],
            [1, 1, 'Void'],
            [1, 2, 'Void']
          ]
        };
        board.layout = bc.buildBoardLayout(board);
        expect(bc.checkContiguity(board)).toEqual(false);
      });

      it('should return true when given a contiguous board', function() {
        var board = {
          numCols: 3,
          numRows: 3,
          specialCells: null
        };
        board.layout = bc.buildBoardLayout(board);
        expect(bc.checkContiguity(board)).toEqual(true);
      });

      it('should return true even when the cells are the maximum distance apart', function() {
        var board = {
          numCols: 3,
          numRows: 3,
          specialCells: [
            [1, 0, 'Void'],
            [1, 1, 'Void']
          ]
        };
        board.layout = bc.buildBoardLayout(board);
        expect(bc.checkContiguity(board)).toEqual(true);
      });

      it('should scale to any size board', function() {
        var board = {
          numCols: 15,
          numRows: 15,
          specialCells: [
            [1, 0, 'Void'],
            [1, 1, 'Void'],
            [1, 2, 'Void'],
            [1, 3, 'Void'],
            [1, 4, 'Void'],
            [1, 5, 'Void'],
            [1, 6, 'Void'],
            [1, 7, 'Void'],
            [1, 8, 'Void'],
            [1, 9, 'Void'],
            [1, 10, 'Void']
          ]
        };
        board.layout = bc.buildBoardLayout(board);
        expect(bc.checkContiguity(board)).toEqual(true);
      })
    })



  })
})();
