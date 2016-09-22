(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('alliesFightDisplay', alliesFightDisplay);

  alliesFightDisplay.$inject = ["alliesService", "movesService", "fightLogService", "fightQueueService"];

  function alliesFightDisplay(alliesService, movesService, fightLogService, fightQueueService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/alliesFightDisplay/alliesFightDisplay.html',
      controller: alliesFightDisplayController,
      controllerAs: 'alliesFightDisplay',
      bindToController: true
    };

    return directive;

    function alliesFightDisplayController() {
      var vm = this;

      vm.targetSelectMode = alliesService.targetSelectMode;
      vm.activeAllies = alliesService.activeAllies;
      vm.updatePercentages = alliesService.updatePercentages;
      vm.movesService = movesService;
      //TODO Ideally not having to import this entire service. Just to expose it to the view. Only the Selected Move
      // variable is needed. possible that the select move function goes to movesService.

      vm.cardWidth = (90 / vm.activeAllies.length).toString() + '%';

      vm.selectMove = function(move) {
        fightQueueService.selectMove(move);
      };

      /*vm.selectMove = function(move) {
        var atBat = fightQueueService.queuePool[0];
        movesService.setSelectedMove(move);

        if (movesService.selectedMove === "Attack") {
          fightLogService.pushToFightLog('Select target to Attack.');
          enemiesService.selectNumberOfTargets(1);
        }

        if (movesService.selectedMove === "Rest") {
          fightQueueService.queuePool[0].stats.energy += 5;
          if (fightQueueService.queuePool[0].stats.energy > fightQueueService.queuePool[0].stats.maxEnergy) {
            fightQueueService.queuePool[0].stats.energy = fightQueueService.queuePool[0].stats.maxEnergy;
          }
          fightQueueService.queuePool[0].stats.health += 10;
          if (fightQueueService.queuePool[0].stats.health > fightQueueService.queuePool[0].stats.maxHealth) {
            fightQueueService.queuePool[0].stats.health = fightQueueService.queuePool[0].stats.maxHealth;
          }
          alliesService.updatePercentages(fightQueueService.queuePool[0]);
          fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + " is resting.");
          fightQueueService.endTurn();
        }

        if (movesService.selectedMove === "Fury") {
          if (vm.checkResources(40, 75, atBat)) {
            fightLogService.pushToFightLog('Select Three Targets');
            enemiesService.selectNumberOfTargets(3);
          }
        }

        if (movesService.selectedMove === "Unchained") {
          //Needs check for status
          fightQueueService.queuePool[0].stats.strength += fightQueueService.queuePool[0].stats.defense;
          fightQueueService.queuePool[0].stats.defense = 0;
          fightQueueService.queuePool[0].stats.speed += fightQueueService.queuePool[0].stats.intellect;
          fightQueueService.queuePool[0].stats.intellect = 0;
          fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + ' is unchained.');
          fightQueueService.endTurn();
        }

        if (movesService.selectedMove === "Bloodbath") {}

        if (movesService.selectedMove === "Fortify") {
          if (!alliesService.checkForStatusEffect(fightQueueService.queuePool[0], 'Fortified')) {
            if (vm.checkResources(10, 0, atBat)) {
              var boost = Math.round(fightQueueService.queuePool[0].baseStats.defense * .15);
              fightQueueService.queuePool[0].stats.defense += boost;
              fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + "'s defense has been raised by " + boost + " for the duration of the fight. This effect does NOT stack.");
              fightQueueService.queuePool[0].statusEffects.push(['Fortified', 9999]);
              fightQueueService.endTurn();
            }
          } else {
            fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + " has already been fortified.");
            movesService.setSelectedMove('');
          }
        }

        if (movesService.selectedMove === "Absorb") {}

        if (movesService.selectedMove === "Man of Stone") {}

        if (movesService.selectedMove === "Parry") {
          if (vm.checkResources(10, 0, atBat)) {
            fightQueueService.queuePool[0].stance = 'Parrying';
            fightQueueService.queuePool[0].stanceCount = 2;
            fightLogService.pushToFightLog("The Scarecrow will deflect the next 2 incoming attacks.");
            fightQueueService.endTurn();
          }
        }

        if (movesService.selectedMove === "Knockout") {
          if (vm.checkResources(40, 0, atBat)) {
            fightLogService.pushToFightLog('Select target to Knockout.');
            enemiesService.selectNumberOfTargets(1);
          }
        }

        if (movesService.selectedMove === "Death Punch") {}

        if (movesService.selectedMove === "Heal") {
          if (vm.checkResources(20, 0, atBat)) {
            $timeout(function() {
              vm.targetSelectMode++;
            }, 100);
            fightLogService.pushToFightLog("Select ally to Heal.")
          }
        }

        if (movesService.selectedMove === "Energize") {
          if (vm.checkResources(10, 0, atBat)) {
            $timeout(function() {
              vm.targetSelectMode++;
            }, 100);
            fightLogService.pushToFightLog("Select ally to Energize.")
          }
        }

        if (movesService.selectedMove === "Restore") {
          if (vm.checkResources(120, 0, atBat)) {
            alliesService.restoreAlliesMove(fightQueueService.queuePool[0]);
          }
        }

        if (movesService.selectedMove === "Charge") {
          if (vm.checkResources(40, 0, atBat)) {
            fightQueueService.allyCharge();
            fightQueueService.endTurn();
          }
        }

        if (movesService.selectedMove === "Inspire") {}

        if (movesService.selectedMove === "Vanquish") {}

        if (movesService.selectedMove === "Upgrade") {
          if (vm.checkResources(2, 0, atBat)) {

            angular.forEach(vm.activeAllies, function(ally) {

              var hasUpgraded = 0;
              angular.forEach(ally.statusEffects, function(status) {
                if (status.indexOf('Upgraded') !== -1) {
                  hasUpgraded++;
                }
              });

              if (!hasUpgraded) {

                var upgrade = Math.round(fightQueueService.queuePool[0].stats.intellect / 6);

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
            fightQueueService.endTurn();
          }
        }

        if (movesService.selectedMove === "Hijack Weapons") {
          //Adds status effect to enemies that has a chance to backfire when they attack.
        }

        if (movesService.selectedMove === "Build Turret") {
          //Adds another member to ActiveAllies with the "temporary" : true attribute. These are then discarded at
          // the end of the fight. Need to find a way to 'insert' moves into the queue. Done with Modulus probably.
        }

      };

      vm.checkResources = function(energyReq, healthReq, player) {
        if (player.stats.energy >= energyReq && player.stats.health > healthReq) {
          player.stats.energy -= energyReq;
          player.stats.health -= healthReq;
          alliesService.updatePercentages(player);
          return true;
        } else {
          fightLogService.pushToFightLog(player.name + " doesn't have the resources to" +
            " perform " + movesService.selectedMove + ".");
          movesService.setSelectedMove('');
          return false;
        }
      };*/

      vm.clickAlly = function(ally) {
        if (alliesService.targetSelectMode > 0) {
          if (movesService.selectedMove === "Heal") {
            if (ally.status === 'dead') {
              fightLogService.pushToFightLog(ally.name + " cannot be revived.")
            } else {
              alliesService.healAlly(ally, 3 * fightQueueService.queuePool[0].stats.intellect);
              alliesService.targetSelectMode--;
            }
          }
          if (movesService.selectedMove === "Energize") {
            if (ally.status === 'dead') {
              fightLogService.pushToFightLog(ally.name + " cannot be energized.")
            } else {
              alliesService.energizeAlly(ally, fightQueueService.queuePool[0].stats.intellect);
              alliesService.targetSelectMode--;
            }
          }
          if (alliesService.targetSelectMode === 0) {
            fightQueueService.endTurn();
          }
        }
      }
    }
  }
})();
