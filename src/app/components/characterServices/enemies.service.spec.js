(function () {
  'use strict';

  describe('enemiesService.', function () {
    var enemiesService;

    beforeEach(module('outerZone'));

    beforeEach(inject(function (_enemiesService_) {
      enemiesService = _enemiesService_;
      this.defaultEnemy = enemiesService.enemies[0][0];
    }));

    describe('checkForDead', function () {
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
      })
    })

  });

})();
