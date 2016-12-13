(function () {
  'use strict';

  describe('enemiesService.', function () {
    var enemiesService;
    var bc;

    beforeEach(module('outerZone'));

    beforeEach(inject(function (_enemiesService_, _boardCreator_) {
      enemiesService = _enemiesService_;
      bc = _boardCreator_;
      this.defaultEnemy = enemiesService.enemies[0][0];


    }));

    describe('checkForDead', function () {

      beforeEach(function() {
        this.defaultEnemy.coordinates = {
          x: 3,
          y: 6
        };
        this.defaultEnemy.active = true;
        bc.currentBoard = bc.boards[0];
        bc.currentBoard.layout = bc.buildBoardLayout(bc.currentBoard);
      });

      it('should return true if enemy health is 0', function () {
        this.defaultEnemy.stats.health = 0;
        expect(enemiesService.checkForDead(this.defaultEnemy)).toBe(true);
      });

      it('should return true if enemy health is less than 0', function () {
        this.defaultEnemy.stats.health = -100;
        expect(enemiesService.checkForDead(this.defaultEnemy)).toBe(true);
      });

      it('should return false if enemey health is greater than 0', function () {
        this.defaultEnemy.stats.health = 100;
        expect(enemiesService.checkForDead(this.defaultEnemy)).toBe(false);
      });

      it('should make a call to vacate the cell, if the enemy is dead', function() {
        this.defaultEnemy.stats.health = -5;
        spyOn(bc, 'vacateCell');
        enemiesService.checkForDead(this.defaultEnemy);
        expect(bc.vacateCell).toHaveBeenCalled();
      });

      it('should not make a call to vacate the cell, if the enemy is not dead', function() {
        this.defaultEnemy.stats.health = 50;
        spyOn(bc, 'vacateCell');
        enemiesService.checkForDead(this.defaultEnemy);
        expect(bc.vacateCell).not.toHaveBeenCalled();
      });

      it('should set the enemies status to "dead"', function() {
        this.defaultEnemy.stats.health = 0;
        enemiesService.checkForDead(this.defaultEnemy);
        expect(this.defaultEnemy.status).toEqual('dead');
      });

      it('should set enemy\'s active status to false', function() {
        this.defaultEnemy.stats.health = 0;
        enemiesService.checkForDead(this.defaultEnemy);
        expect(this.defaultEnemy.active).toBe(false);
      });

      it('should keep the enemy\s health from going below 0', function() {
        this.defaultEnemy.stats.health = -500;
        enemiesService.checkForDead(this.defaultEnemy);
        expect(this.defaultEnemy.stats.health).toEqual(0);
      })


    })

  });

})();
