(function() {
  'use strict';

  describe('gameBoard controller', function() {
    var gameBoard;

    beforeEach(module('outerZone'));

    beforeEach(inject(function(_gameBoard_) {
      gameBoard = _gameBoard_;

      describe('selectCell', function() {
        beforeEach(function() {

        });

        it('should do something', function() {
          expect(4).toEqual(4);
        });

        it('should still do something', function() {
          expect(4).toEqual(4);
        })
      })

    }));
  })

})();
