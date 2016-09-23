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

      //TODO for Man of Stone create an if that checks for target priority and if not targets as normal.

      var target = Math.floor(Math.random() * vm.activeAllies.length);
      while (vm.activeAllies[target].status !== 'alive') {
        target = Math.floor(Math.random() * vm.activeAllies.length);
      }

      if (vm.activeAllies[target].stance === "Parrying") {
        fightLogService.pushToFightLog(vm.activeAllies[target].name + " blocked the attack.");
        vm.activeAllies[target].stanceCount--;
        if (vm.activeAllies[target].stanceCount === 0) {
          vm.activeAllies[target].stance = "Normal";
        }
        return;
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

        if (vm.selectedMove[0] === "Absorb") {}

        if (vm.selectedMove[0] === "Man of Stone") {}

        if (vm.selectedMove[0] === "Parry") {
          atBat.stance = 'Parrying';
          atBat.stanceCount = 2;
          fightLogService.pushToFightLog("The Scarecrow will deflect the next 2 incoming attacks.");
          return true;
        }

        if (vm.selectedMove[0] === "Knockout") {
          fightLogService.pushToFightLog('Select target to Knockout.');
          enemiesService.selectNumberOfTargets(1);
        }

        if (vm.selectedMove[0] === "Death Punch") {}

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
            var hasUpgraded = 0;
            angular.forEach(ally.statusEffects, function (status) {
              if (status.indexOf('Upgraded') !== -1) {
                hasUpgraded++;
              }
            });
            if (!hasUpgraded) {
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
      }

    };

    vm.allyActionAlly = function(allyActed, allyActing) {
      if (vm.selectedMove === "Heal") {
        if (allyActed.status === 'dead') {
          fightLogService.pushToFightLog(allyActed.name + " cannot be revived.")
        } else {
          alliesService.healAlly(allyActed, 3 * allyActing.stats.intellect);
          alliesService.targetSelectMode--;
        }
      }
      if (vm.selectedMove === "Energize") {
        if (allyActed.status === 'dead') {
          fightLogService.pushToFightLog(allyActed.name + " cannot be energized.")
        } else {
          alliesService.energizeAlly(allyActed, allyActing.stats.intellect);
          alliesService.targetSelectMode--;
        }
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
