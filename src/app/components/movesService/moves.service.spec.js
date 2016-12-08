(function() {
  'use strict';

  describe('movesService', function() {
    var ms;

    beforeEach(module('outerZone'));

    beforeEach(inject(function(_movesService_) {
      ms = _movesService_;
    }));

    describe('checkResources', function() {

      beforeEach(function() {
        this.mockMove = {
          name: 'Some Move',
          energyReq: 10,
          healthReq: 5
        };
        this.mockPlayer = {
          name: 'Scarecrow',
          stats: {
            health: 20,
            energy: 20
          }
        }
      });

      it('should return false if player energy is less than requirement', function() {
        this.mockPlayer.stats.energy = 1;
        this.mockMove.energyReq = 10;
        expect(ms.checkResources(this.mockPlayer, this.mockMove)).toBeFalsy();
      });

      it('should return true if player energy is greater than requirement', function() {
        this.mockPlayer.stats.energy = 30;
        this.mockMove.energyReq = 10;
        expect(ms.checkResources(this.mockPlayer, this.mockMove)).toBeTruthy();
      });

      it('should return true if players energy is equivalent to requirement', function() {
        this.mockMove.energyReq = 10;
        this.mockPlayer.stats.energy = 10;
        expect(ms.checkResources(this.mockPlayer, this.mockMove)).toBeTruthy();
      });

      it('should return false if player health is equivalent to requirement', function() {
        this.mockMove.healthReq = 10;
        this.mockPlayer.stats.health = 10;
        expect(ms.checkResources(this.mockPlayer, this.mockMove)).toBeFalsy();
      });

      it('should return false if player health is less than requirement', function() {
        this.mockMove.healthReq = 20;
        this.mockPlayer.stats.health = 15;
        expect(ms.checkResources(this.mockPlayer, this.mockMove)).toBeFalsy();
      });

      it('should reduce the players health by the requirement', function() {
        this.mockPlayer.stats.health = 30;
        this.mockMove.healthReq = 20;
        ms.checkResources(this.mockPlayer, this.mockMove);
        expect(this.mockPlayer.stats.health).toEqual(10);
      });

      it('should reduce the players energy by the requirement', function() {
        this.mockPlayer.stats.energy = 30;
        this.mockMove.energyReq = 20;
        ms.checkResources(this.mockPlayer, this.mockMove);
        expect(this.mockPlayer.stats.energy).toEqual(10);
      });

      it('if the player is Inspired, energy should be reduced by half of the requirement', function() {
        this.mockPlayer.statusEffects = [['Inspired', 5, 5]];
        this.mockPlayer.stats.energy = 30;
        this.mockMove.energyReq = 10;
        ms.checkResources(this.mockPlayer, this.mockMove);
        expect(this.mockPlayer.stats.energy).toEqual(25);
      });

      it('if Inspired, energyReq should be rounded up when trailing is .5 or greater', function() {
        this.mockPlayer.statusEffects = [['Inspired', 5, 5]];
        this.mockPlayer.stats.energy = 30;
        this.mockMove.energyReq = 15;
        ms.checkResources(this.mockPlayer, this.mockMove);
        expect(this.mockPlayer.stats.energy).toEqual(22);
      });

      it('if Inspired, energyReq should round down when trailing is less than .5', function() {
        this.mockPlayer.statusEffects = [['Inspired', 5, 5]];
        this.mockPlayer.stats.energy = 30;
        this.mockMove.energyReq = 16.5;
        ms.checkResources(this.mockPlayer, this.mockMove);
        expect(this.mockPlayer.stats.energy).toEqual(22);
      })
    })

  })
})();
