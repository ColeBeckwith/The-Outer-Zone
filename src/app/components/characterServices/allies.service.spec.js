(function() {
  'use strict';

  describe('Allies Service', function() {
    var alliesService;

    beforeEach(module('outerZone'));

    beforeEach(inject(function(_alliesService_) {
      alliesService = _alliesService_;
    }));

    describe('activateAlly', function() {
      it('should successfully activates an ally', function () {
        var ally = alliesService.allies[0];
        alliesService.activateAlly(ally);
        expect(ally.status).toBe('alive');
      });

      it('should call updateActives', function() {
        spyOn(alliesService, 'updateActives');
        alliesService.activateAlly(alliesService.allies[0]);
        expect(alliesService.updateActives).toHaveBeenCalled();
      });

      it('should set activeAllies', function() {
        alliesService.activateAlly(alliesService.allies[0]);
        expect(alliesService.activeAllies).toEqual([alliesService.allies[0]]);
      })
    });


    describe('deactivateAlly', function() {
      it('should successfully deactivate an ally', function() {
        var ally = alliesService.allies[0];
        ally.status = 'alive';
        alliesService.deactivateAlly(ally);
        expect(ally.status).toBe('inactive');
      });

      it('should call updateActives', function() {
        spyOn(alliesService, 'updateActives');
        alliesService.deactivateAlly(alliesService.allies[0]);
        expect(alliesService.updateActives).toHaveBeenCalled();
      });

      it('should set activeAllies', function() {
        alliesService.activateAlly(alliesService.allies[0]);
        var singleAllyActivated = angular.copy(alliesService.getActiveAllies());
        alliesService.deactivateAlly(alliesService.allies[0]);
        expect(alliesService.getActiveAllies()).not.toEqual(singleAllyActivated)
      });
    });

    describe('setAllies', function() {
      it('should set allies to given value', function() {
        alliesService.setAllies([alliesService.allies[0]]);
        expect(alliesService.allies).toEqual([alliesService.allies[0]]);
      })
    });


    describe('getActiveAllies', function() {
      it('should returns an empty array if no active allies', function() {
        var activeAllies = alliesService.getActiveAllies();
        expect(activeAllies).toEqual([]);
      });

      it('should returns the activated allies', function() {
        alliesService.activateAlly(alliesService.allies[1]);
        alliesService.activateAlly(alliesService.allies[3]);
        var activeAllies = alliesService.getActiveAllies();
        expect(activeAllies).toEqual([alliesService.allies[1], alliesService.allies[3]]);
      })
    });


    describe('updatePercentages', function() {
      it('should update the percentage of an ally', function() {
        var ally = {
          stats : {
            health: 50,
            maxHealth: 100
          }
        };

        alliesService.updatePercentages(ally);

        expect(ally.percentageHealth).toBe('50%');
      });

      it('should handle 0 health case', function() {
        var ally = {
          stats : {
            health: 0,
            maxHealth: 100
          }
        };

        alliesService.updatePercentages(ally);

        expect(ally.percentageHealth).toBe('0%');
      });

      it('should handle health > maxHealth case', function() {
        var ally = {
          stats : {
            health: 200,
            maxHealth: 100
          }
        };

        alliesService.updatePercentages(ally);

        expect(ally.percentageHealth).toBe('200%');
      })
    });

    describe('levelUp', function() {
      beforeEach(function() {
        alliesService.setClassForAlly(alliesService.allies[0], alliesService.builds[0][0]);
      });

      it('should add 1 to the allies level', function() {
        var allyLevel = alliesService.allies[0].level;
        alliesService.levelUp(alliesService.allies[0]);
        expect(alliesService.allies[0].level).toBe(allyLevel + 1);
      });

      it('should raise the allies speed by their leveling schedule', function() {
        var baseStatsBeforeLevel = angular.copy(alliesService.allies[0].baseStats);
        alliesService.levelUp(alliesService.allies[0]);
        if (alliesService.allies[0].level % alliesService.allies[0].levelingSchedule.speed[0] === 0) {
          expect(alliesService.allies[0].baseStats.speed).not.toEqual(baseStatsBeforeLevel.speed);
        } else {
          expect(alliesService.allies[0].baseStats.speed).toEqual(baseStatsBeforeLevel.speed);
        }
      });

      it('should raise the allies strength by their leveling schedule', function() {
        var baseStatsBeforeLevel = angular.copy(alliesService.allies[0].baseStats);
        alliesService.levelUp(alliesService.allies[0]);
        if (alliesService.allies[0].level % alliesService.allies[0].levelingSchedule.strength[0] === 0) {
          expect(alliesService.allies[0].baseStats.strength).not.toEqual(baseStatsBeforeLevel.strength);
        } else {
          expect(alliesService.allies[0].baseStats.strength).toEqual(baseStatsBeforeLevel.strength);
        }
      });

      it('should raise the allies intellect by their leveling schedule', function() {
        var baseStatsBeforeLevel = angular.copy(alliesService.allies[0].baseStats);
        alliesService.levelUp(alliesService.allies[0]);
        if (alliesService.allies[0].level % alliesService.allies[0].levelingSchedule.intellect[0] === 0) {
          expect(alliesService.allies[0].baseStats.intellect).not.toEqual(baseStatsBeforeLevel.intellect);
        } else {
          expect(alliesService.allies[0].baseStats.intellect).toEqual(baseStatsBeforeLevel.intellect);
        }
      });

      it('should set the allies levelUp status to true', function() {
        alliesService.levelUp(alliesService.allies[0]);
        expect(alliesService.allies[0].leveledUp).toEqual(true);
      });

      it('should raise the exp needed for next level up by 2.6', function() {
        var expOriginallyNeeded = alliesService.allies[0].expNeeded;
        alliesService.levelUp(alliesService.allies[0]);
        expect(alliesService.allies[0].expNeeded).toEqual(expOriginallyNeeded * 2.6);
      });

      it('should subtract the exp currently required', function() {
        var currentExp = alliesService.allies[0].exp;
        var currentExpNeeded = alliesService.allies[0].expNeeded;
        alliesService.levelUp(alliesService.allies[0]);
        expect(alliesService.allies[0].exp).toEqual(currentExp - currentExpNeeded);
      });
    });

  })

})();
