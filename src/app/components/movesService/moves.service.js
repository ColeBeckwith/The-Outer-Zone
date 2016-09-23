(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('movesService', movesService);

  movesService.$inject = ["alliesService", "enemiesService", "fightLogService", "$timeout"];

  function movesService(alliesService, enemiesService, fightLogService, $timeout) {
    var vm = this;

    vm.selectedMove = [];

    vm.activeAllies = alliesService.activeAllies;

    vm.setSelectedMove = function(move) {
      vm.selectedMove = move;
    };

    vm.getSelectedMove = function() {
      return vm.selectedMove;
    };

    vm.enemyAttackAlly = function(enemy) {
      var target = alliesService.checkForTargetPriority();
      while (vm.activeAllies[target] === undefined || vm.activeAllies[target].status === 'dead') {
        target = Math.floor(Math.random() * vm.activeAllies.length);
      }

      if (vm.activeAllies[target].stance === "Parrying") {
        enemy.stats.health -= Math.round(vm.activeAllies[target].stats.defense/3);
        fightLogService.pushToFightLog(vm.activeAllies[target].name + " deflected the attack.");
        alliesService.reduceStanceCount(vm.activeAllies[target]);
        return;
      }

      if (vm.activeAllies[target].stance === "Absorbing") {
        alliesService.healAlly(vm.activeAllies[target], Math.round(((1.7 + ((Math.random() * 6) / 10)) * enemy.stats.strength)));
        fightLogService.pushToFightLog(vm.activeAllies[target].name + " absorbed the attack.");
        alliesService.reduceStanceCount(vm.activeAllies[target]);
        return
      }

      if ((Math.random() * 6 * enemy.stats.speed) > (Math.random() * vm.activeAllies[target].stats.speed)) {
        var damage = Math.round(((1.7 + ((Math.random() * 6) / 10)) * enemy.stats.strength) - (.75 * vm.activeAllies[target].stats.defense));

        if (damage <= 0) {
          damage = 1;
        }

        alliesService.activeAllies[target].stats.health -= damage;
        fightLogService.pushToFightLog(enemy.name + " attacked " + vm.activeAllies[target].name + " for " + damage + " damage.");
        alliesService.checkForDeath(vm.activeAllies[target]);
        alliesService.updatePercentages(vm.activeAllies[target]);
      } else {
        fightLogService.pushToFightLog(vm.activeAllies[target].name + ' dodged ' + enemy.name + '\'s attack.')
      }
    };

    vm.selectMove = function(move, atBat) {
      vm.setSelectedMove(move);
      if (vm.checkResources(atBat)) {
        if (vm.selectedMove[0] === "Attack") {
          fightLogService.pushToFightLog('Select target to Attack.');
          enemiesService.selectNumberOfTargets(1);
        }

        if (vm.selectedMove[0] === "Rest") {
          atBat.stats.energy += 5;
          if (atBat.stats.energy > atBat.stats.maxEnergy) {
            atBat.stats.energy = atBat.stats.maxEnergy;
          }
          atBat.stats.health += 10;
          if (atBat.stats.health > atBat.stats.maxHealth) {
            atBat.stats.health = atBat.stats.maxHealth;
          }
          alliesService.updatePercentages(atBat);
          fightLogService.pushToFightLog(atBat.name + " is resting.");
          return true;
        }

        if (vm.selectedMove[0] === "Fury") {
          fightLogService.pushToFightLog('Select Three Targets');
          enemiesService.selectNumberOfTargets(3);
        }

        if (vm.selectedMove[0] === "Unchained") {
          //Needs check for status.
          atBat.stats.strength += atBat.stats.defense;
          atBat.stats.defense = 0;
          atBat.stats.speed += atBat.stats.intellect;
          atBat.stats.intellect = 0;
          fightLogService.pushToFightLog(atBat.name + ' is unchained.');
          return true;
        }

        if (vm.selectedMove[0] === "Bloodbath") {
          if (!alliesService.checkForStatusEffect(atBat, 'Bloodbath')) {
            atBat.statusEffects.push(['Bloodbath', 9999]);
          }
          fightLogService.pushToFightLog('Let the carnage begin.');
          return true;
        }

        if (vm.selectedMove[0] === "Fortify") {
          if (!alliesService.checkForStatusEffect(atBat, 'Fortified')) {
            var boost = Math.round(atBat.baseStats.defense * .15);
            atBat.stats.defense += boost;
            fightLogService.pushToFightLog(atBat.name + "'s defense has been raised by " + boost + " for the duration" +
              " of the fight. This effect does NOT stack.");
            atBat.statusEffects.push(['Fortified', 9999]);
            return true;
          } else {
            fightLogService.pushToFightLog(atBat.name + " has already been fortified.");
            vm.setSelectedMove([]);
          }
        }

        if (vm.selectedMove[0] === "Absorb") {
          atBat.stance = 'Absorbing';
          atBat.stanceCount = 1;
          fightLogService.pushToFightLog(atBat.name + ' will absorb the next incoming attack.')
          return true
        }

        if (vm.selectedMove[0] === "Man of Stone") {
          atBat.stance = 'Man of Stone';
          atBat.stanceCount = 9999;
          atBat.stats.defense += atBat.stats.speed;
          atBat.stats.speed = 0;
          fightLogService.pushToFightLog(atBat.name + " is the Man of Stone.");
          return true
        }

        if (vm.selectedMove[0] === "Parry") {
          atBat.stance = 'Parrying';
          atBat.stanceCount = 2;
          fightLogService.pushToFightLog(atBat.name + " will deflect the next 2 incoming attacks.");
          return true;
        }

        if (vm.selectedMove[0] === "Knockout") {
          fightLogService.pushToFightLog('Select target to Knockout.');
          enemiesService.selectNumberOfTargets(1);
        }

        if (vm.selectedMove[0] === "Death Punch") {
          fightLogService.pushToFightLog('Select target to Death Punch.');
          enemiesService.selectNumberOfTargets(1);
        }

        if (vm.selectedMove[0] === "Heal") {
          $timeout(function () {
            alliesService.selectNumberOfTargets(1);
          }, 100);
          fightLogService.pushToFightLog("Select ally to Heal.")
        }

        if (vm.selectedMove[0] === "Energize") {
          $timeout(function () {
            alliesService.selectNumberOfTargets(1);
          }, 100);
          fightLogService.pushToFightLog("Select ally to Energize.")
        }

        if (vm.selectedMove[0] === "Restore") {
          alliesService.restoreAlliesMove(atBat);
        }

        if (vm.selectedMove[0] === "Charge") {
          return true;
        }

        if (vm.selectedMove[0] === "Inspire") {}

        if (vm.selectedMove[0] === "Vanquish") {}

        if (vm.selectedMove[0] === "Upgrade") {
          angular.forEach(vm.activeAllies, function (ally) {
            if (!alliesService.checkForStatusEffect(ally, 'Upgraded')) {
              var upgrade = Math.round(atBat.stats.intellect / 6);

              var max = ally.stats.strength;
              if (ally.stats.speed > max) {
                max = ally.stats.speed
              }
              if (ally.stats.intellect > max) {
                max = ally.stats.intellect
              }
              if (ally.stats.defense > max) {
                max = ally.stats.defense
              }

              if (ally.stats.speed === max) {
                ally.stats.speed += upgrade;
              } else if (ally.stats.defense === max) {
                ally.stats.defense += upgrade;
              } else if (ally.stats.intellect === max) {
                ally.stats.intellect += upgrade;
              } else if (ally.stats.strength === max) {
                ally.stats.strength += upgrade;
              }

              ally.statusEffects.push(['Upgraded', 9999]);
            } else {
              fightLogService.pushToFightLog(ally.name + ' has already been upgraded.')
            }
          });
          return true;
        }

        if (vm.selectedMove[0] === "Hijack Weapons") {
          //Adds status effect to enemies that has a chance to backfire when they attack.
        }

        if (vm.selectedMove[0] === "Build Turret") {
          //Adds another member to ActiveAllies with the "temporary" : true attribute. These are then discarded at
          // the end of the fight. Need to find a way to 'insert' moves into the queue. Done with Modulus probably.
        }

        if (vm.selectedMove[0] === "Last Dance") {}

        if (vm.selectedMove[0] === "Poison Tips") {}

        if (vm.selectedMove[0] === "Finishing Touch") {}

        if (vm.selectedMove[0] === "Headshot") {}

        if (vm.selectedMove[0] === "Perch") {}

        if (vm.selectedMove[0] === "Eagle Eye") {}

        if (vm.selectedMove[0] === "Unload") {}

        if (vm.selectedMove[0] === "Arsenal") {}

        if (vm.selectedMove[0] === "Bullet Hell") {}
      }

    };

    vm.allyActionAlly = function(allyActed, allyActing) {
      if (vm.selectedMove[0] === "Heal") {
        if (allyActed.status === 'dead') {
          fightLogService.pushToFightLog(allyActed.name + " cannot be revived.")
        } else {
          alliesService.healAlly(allyActed, 3 * allyActing.stats.intellect);
          alliesService.targetSelectMode--;
        }
      }
      if (vm.selectedMove[0] === "Energize") {
        if (allyActed.status === 'dead') {
          fightLogService.pushToFightLog(allyActed.name + " cannot be energized.")
        } else {
          alliesService.energizeAlly(allyActed, allyActing.stats.intellect);
          alliesService.targetSelectMode--;
        }
      }
    };

    vm.deathPunch = function(enemy, ally) {
      if (ally.stats.intellect + (Math.random() * 20) > 40) {
        enemy.stats.health -= 100 + (ally.stats.strength * 3);
        enemiesService.targetSelectMode--;
        fightLogService.pushToFightLog(ally.name + ' struck ' + enemy.name + ' in the temple.');
      } else {
        fightLogService.pushToFightLog(ally.name + ' struck ' + enemy.name + ', but missed the strike zone.');
        vm.regularAttackEnemy(enemy, ally)
      }
    };

    vm.regularAttackEnemy = function(enemy, ally) {
      enemiesService.targetSelectMode--;
      if ((Math.random() * 6 * ally.stats.speed) > (Math.random() * enemy.stats.speed)) {
        var damage = Math.round(((1.7 + ((Math.random() * 6) / 10)) * ally.stats.strength) - (.75 * enemy.stats.defense));
        if (damage <= 0) {
          damage = 0;
        }
        enemy.stats.health -= damage;
        enemy.percentageHealth = (enemy.stats.health / enemy.stats.maxHealth) * 100 + '%';
        fightLogService.pushToFightLog(ally.name + " attacked " + enemy.name + " for " + damage + " damage.");
        return true;
      } else {
        fightLogService.pushToFightLog(enemy.name + " dodged the attack.");
      }
    };

    vm.checkResources = function(player) {
      if (player.stats.energy >= vm.selectedMove[2] && player.stats.health > vm.selectedMove[3]) {
        player.stats.energy -= vm.selectedMove[2];
        player.stats.health -= vm.selectedMove[3];
        alliesService.updatePercentages(player);
        return true;
      } else {
        fightLogService.pushToFightLog(player.name + " doesn't have the resources to perform " + vm.selectedMove[0] + ".");
        vm.setSelectedMove([]);
        return false;
      }
    };
  }
})();
