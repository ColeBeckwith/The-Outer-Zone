(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('alliesFightDisplay', alliesFightDisplay);

  alliesFightDisplay.$inject = ["alliesService", "movesService", "fightLogService", "enemiesService", "fightQueueService", "$timeout"];

  function alliesFightDisplay(alliesService, movesService, fightLogService, enemiesService, fightQueueService, $timeout) {
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

      vm.targetSelectMode = 0;
      vm.activeAllies = alliesService.activeAllies;
      vm.updatePercentages = alliesService.updatePercentages;
      vm.movesService = movesService;
      //TODO Ideally not having to import this entire service. Just to expose it to the view. Only the Selected Move
      // variable is needed. possible that the select move function goes to movesService.
      vm.atBat = fightQueueService.queuePool[0];
      //TODO would like to implement this to make the code much more readable, but having trouble figuring out when
      // and why it works and when it doesn't.

      vm.cardWidth = (90 / vm.activeAllies.length).toString() + '%';

      vm.selectMove = function (move) {
        movesService.setSelectedMove(move);

        if (movesService.selectedMove === "Attack") {
          fightLogService.pushToFightLog('Select target to Attack.');
          enemiesService.selectNumberOfTargets(1);
        }

        if (movesService.selectedMove === "Rest") {
          fightQueueService.queuePool[0].stats.energy += 10;
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
          if (vm.checkResources(20, 40)) {
            fightLogService.pushToFightLog('The Scarecrow is in Fury mode.');
            fightLogService.pushToFightLog('Select Three Targets');
            enemiesService.selectNumberOfTargets(3);
          }
        }

        if (movesService.selectedMove === "Fortify") {
          if (vm.checkResources(10, 0)) {
            var hasFortified = 0;
            angular.forEach(fightQueueService.queuePool[0].statusEffects, function(status) {
              if (status.indexOf('Fortified') !== -1) {
                hasFortified++;
              }
            });

            if (!hasFortified) {
              var boost = Math.round(fightQueueService.queuePool[0].baseStats.defense * .15);
              fightQueueService.queuePool[0].stats.defense += boost;
              fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + "'s defense has been raised by " + boost + " for the duration of the fight. This effect does NOT stack.");
              fightQueueService.queuePool[0].statusEffects.push(['Fortified', 9999]);
            } else {
              fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + " has already been fortified.")
            }
            fightQueueService.endTurn();
          }
        }

        if (movesService.selectedMove === "Parry") {
          if (vm.checkResources(10, 0)) {
            fightQueueService.queuePool[0].stance = 'Parrying';
            fightQueueService.queuePool[0].stanceCount = 2;
            fightLogService.pushToFightLog("The Scarecrow will deflect the next 2 incoming attacks.");
            fightQueueService.endTurn();
          }
        }

        if (movesService.selectedMove === "Heal") {
          if (vm.checkResources(20, 0)) {
            $timeout(function () {
              vm.targetSelectMode++;
            }, 100);
            fightLogService.pushToFightLog("Select ally to Heal.")
          }
        }

        if (movesService.selectedMove === "Charge") {
          if (vm.checkResources(40, 0)) {
            fightQueueService.allyCharge();
            fightQueueService.endTurn();
          }
        }

        if (movesService.selectedMove === "Upgrade") {
          if (vm.checkResources(2, 0)) {

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
      };

      vm.checkResources = function(energyReq, healthReq) {
        if (fightQueueService.queuePool[0].stats.energy >= energyReq && fightQueueService.queuePool[0].stats.health > healthReq) {
          fightQueueService.queuePool[0].stats.energy -= energyReq;
          fightQueueService.queuePool[0].stats.health -= healthReq;
          alliesService.updatePercentages(fightQueueService.queuePool[0]);
          return true;
        } else {
          fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + " doesn't have the resources to" +
            " perform " + movesService.selectedMove + ".");
          movesService.setSelectedMove('');
          return false;
        }
      };

      vm.clickAlly = function(ally) {
        if (vm.targetSelectMode > 0) {
          ally.stats.health += 60;
          if (ally.stats.health > ally.stats.maxHealth) {
            ally.stats.health = ally.stats.maxHealth;
          }
          alliesService.updatePercentages(ally);
          fightLogService.pushToFightLog("Healed");
          vm.targetSelectMode--;
          if (vm.targetSelectMode === 0) {
            fightQueueService.endTurn();
          }
        }
      }
    }
  }
})();
