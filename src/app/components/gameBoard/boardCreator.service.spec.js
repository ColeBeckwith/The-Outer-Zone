(function() {
  'use strict';

  describe('boardCreator', function() {
    var bc;

    beforeEach(module('outerZone'));

    beforeEach(inject(function(_boardCreator_) {
      bc = _boardCreator_;
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
        this.defaultBoard.specialCells = [[1, 5, 'Empty'], [7, 9, 'Empty'], [4, 4, 'Hole']];
        var layout = bc.buildBoardLayout(this.defaultBoard);
        expect(layout[5][1].blocked).toEqual(true);
        expect(layout[9][7].blocked).toEqual(true);
        expect(layout[4][4].blocked).toEqual(false);
      })
    });

    describe('getValidMovements', function() {
      beforeEach(function() {
        this.defaultBoard.layout = bc.buildBoardLayout(this.defaultBoard);
        this.currentLocation = [7, 7];
      });

      it('if distance is 0, should return an empty array', function() {
        expect(bc.getValidMovements(this.defaultBoard, this.currentLocation, 0)).toEqual([]);
      });

      it('if distance is 1, should return the surrounding cells', function() {
        var expectedMoves = [
            { xCoord: 7, yCoord: 6, blocked: false, special: null },
            { xCoord: 8, yCoord: 7, blocked: false, special: null },
            { xCoord: 7, yCoord: 8, blocked: false, special: null },
            { xCoord: 6, yCoord: 7, blocked: false, special: null }
          ].sort();
        expect(bc.getValidMovements(this.defaultBoard, this.currentLocation, 1).sort()).toEqual(expectedMoves);
      });

      it('if distance is 2, returns all tiles 2 away', function() {
        var expectedMoves = [
          Object({ xCoord: 7, yCoord: 6, blocked: false, special: null }),
          Object({ xCoord: 8, yCoord: 7, blocked: false, special: null }),
          Object({ xCoord: 7, yCoord: 8, blocked: false, special: null }),
          Object({ xCoord: 6, yCoord: 7, blocked: false, special: null }),
          Object({ xCoord: 7, yCoord: 5, blocked: false, special: null }),
          Object({ xCoord: 8, yCoord: 6, blocked: false, special: null }),
          Object({ xCoord: 6, yCoord: 6, blocked: false, special: null }),
          Object({ xCoord: 9, yCoord: 7, blocked: false, special: null }),
          Object({ xCoord: 8, yCoord: 8, blocked: false, special: null }),
          Object({ xCoord: 7, yCoord: 9, blocked: false, special: null }),
          Object({ xCoord: 6, yCoord: 8, blocked: false, special: null }),
          Object({ xCoord: 5, yCoord: 7, blocked: false, special: null })
        ];
        expect(bc.getValidMovements(this.defaultBoard, this.currentLocation, 2)).toEqual(expectedMoves)
      });

      it('if blocked in, returns an empty array', function() {
        this.defaultBoard.layout[7][6].blocked = true;
        this.defaultBoard.layout[7][8].blocked = true;
        this.defaultBoard.layout[6][7].blocked = true;
        this.defaultBoard.layout[8][7].blocked = true;
        expect(bc.getValidMovements(this.defaultBoard, this.currentLocation, 20).sort()).toEqual([]);
      });

      it('should prevent moves beyond the border of the game board', function() {
        // expect(bc.getValidMovements(this.defaultBoard, this.currentLocation, 20)).toEqual();
      })
    });

    describe('placeCharacter', function() {
      beforeEach(function() {
        this.placeholderCharacter = {
          name: 'Scarecrow'
        };
        this.layout = bc.buildBoardLayout(this.defaultBoard);
        this.defaultBoard.layout = bc.buildBoardLayout(this.defaultBoard);
      });

      it('should place the character at the coordinates', function() {
        bc.placeCharacter(this.layout[5][4], this.placeholderCharacter);
        expect(this.layout[5][4].occupant).toBe(this.placeholderCharacter);
      });

      it('should block the cell', function() {
        bc.placeCharacter(this.layout[5][4], this.placeholderCharacter);
        expect(this.layout[5][4].blocked).toBe(true);
      });

      it('should vacate the characters current cell if there is one', function() {
        this.placeholderCharacter.coordinates = {
          x: 5,
          y: 3
        };
        this.defaultBoard.layout = bc.buildBoardLayout(this.defaultBoard);

        this.defaultBoard.layout[3][5].occupant = this.placeholderCharacter;
        this.defaultBoard.layout[3][5].blocked = true;

        bc.placeCharacter(this.defaultBoard.layout[1][2], this.placeholderCharacter, this.defaultBoard);
        expect(this.defaultBoard.layout[3][5].occupant).toEqual(null);
        expect(this.defaultBoard.layout[3][5].blocked).toEqual(false);
      })
    });

    describe('placeCharacterSet', function() {
      beforeEach(function() {
        this.coordinates = [
          [3, 3],
          [3, 5],
          [3, 7]
        ];
        this.allies = [
          {
            name: 'Scarecrow'
          },
          {
            name: 'D. Taylor'
          },
          {
            name: 'Lion'
          }
        ];
        this.layout = bc.buildBoardLayout(this.defaultBoard);
        bc.placeCharacterSet(this.layout, this.coordinates, this.allies);
      });

      it('should place each ally at the given coordinates', function() {
        expect(this.layout[3][3].occupant).toBe(this.allies[0]);
        expect(this.layout[5][3].occupant).toBe(this.allies[1]);
        expect(this.layout[7][3].occupant).toBe(this.allies[2]);
      });

      it('should blocked each coordinate', function() {
        expect(this.layout[3][3].blocked).toBe(true);
        expect(this.layout[5][3].blocked).toBe(true);
        expect(this.layout[7][3].blocked).toBe(true);
      });

      it('should set each characters location to the cell', function() {
        expect(this.allies[0].coordinates).toEqual({ x : 3, y : 3, special: null});
        expect(this.allies[1].coordinates).toEqual({ x : 3, y : 5, special: null});
        expect(this.allies[2].coordinates).toEqual({ x : 3, y : 7, special: null});
      })
    });

    describe('getNeighboringCells', function() {
      beforeEach(function() {
        this.defaultBoard.layout = bc.buildBoardLayout(this.defaultBoard);
        this.cell = {
          xCoord : 3,
          yCoord: 7
        }
      });

      it('should return four cells in a normal case', function() {
        expect(bc.getNeighboringCells(this.defaultBoard, this.cell).length).toEqual(4);
      });

      it('should return the four cells surrounding the given cell', function() {
        expect(bc.getNeighboringCells(this.defaultBoard, this.cell)).toEqual([
          Object({ xCoord: 3, yCoord: 6, blocked: false, special: null }),
          Object({ xCoord: 4, yCoord: 7, blocked: false, special: null }),
          Object({ xCoord: 3, yCoord: 8, blocked: false, special: null }),
          Object({ xCoord: 2, yCoord: 7, blocked: false, special: null })
        ]);
      });

      it('if a cell is empty, it should not be returned', function() {
        this.defaultBoard.layout[8][3].special = 'Empty';
        expect(bc.getNeighboringCells(this.defaultBoard, this.cell)).toEqual([
          Object({ xCoord: 3, yCoord: 6, blocked: false, special: null }),
          Object({ xCoord: 4, yCoord: 7, blocked: false, special: null }),
          Object({ xCoord: 2, yCoord: 7, blocked: false, special: null })
        ]);
      });

      it('should not run into errors if given cell is in the top left', function() {
        expect(bc.getNeighboringCells(this.defaultBoard, { xCoord : 0, yCoord : 0})).toEqual([
          Object({ xCoord: 1, yCoord: 0, blocked: false, special: null }),
          Object({ xCoord: 0, yCoord: 1, blocked: false, special: null })
        ]);
      });

      it('should not run into errors if a given cell is in the bottom right', function() {
        expect(bc.getNeighboringCells(this.defaultBoard, { xCoord: 9, yCoord: 9})).toEqual([
          Object({ xCoord: 9, yCoord: 8, blocked: false, special: null }),
          Object({ xCoord: 8, yCoord: 9, blocked: false, special: null })
        ]);
      });

      it('should still return cells, even if they are blocked', function() {
        this.defaultBoard.layout[6][3].blocked = true;
        this.defaultBoard.layout[7][4].blocked = true;
        this.defaultBoard.layout[8][3].blocked = true;
        this.defaultBoard.layout[7][2].blocked = true;
        expect(bc.getNeighboringCells(this.defaultBoard, this.cell)).toEqual([
          Object({ xCoord: 3, yCoord: 6, blocked: true, special: null }),
          Object({ xCoord: 4, yCoord: 7, blocked: true, special: null }),
          Object({ xCoord: 3, yCoord: 8, blocked: true, special: null }),
          Object({ xCoord: 2, yCoord: 7, blocked: true, special: null })
        ]);
      })
    });

    describe('movePlayerTowardLocation', function() {
      beforeEach(function() {
        this.board = bc.boards[0];
        this.board.layout = bc.buildBoardLayout(this.board);
        this.enemy = {
          coordinates: {
            x: 0,
            y: 0
          }
        };
        this.moveLocation = {
          x: 6,
          y: 5
        }
      });

      it('should move the enemy as close to the given location as possible', function() {
        bc.moveCharacterTowardLocation(this.board, this.enemy, this.moveLocation, 5);
        expect(this.enemy.coordinates).toEqual(Object({ x: 5, y: 0, special: null }));
      });

      it('should move the enemy to a neighboring cell if its near enough', function() {
        bc.moveCharacterTowardLocation(this.board, this.enemy, this.moveLocation, 25);
        expect(this.enemy.coordinates).toEqual(Object({ x: 6, y: 4, special: null }))
      })
    })



  })
})();
