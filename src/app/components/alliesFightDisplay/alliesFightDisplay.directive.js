(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('alliesFightDisplay', alliesFightDisplay);

  alliesFightDisplay.$inject = ["alliesService", "movesService", "fightLogService", "enemiesService", "fightQueueService"];

  function alliesFightDisplay(alliesService, movesService, fightLogService, enemiesService, fightQueueService) {
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

      vm.activeAllies = alliesService.activeAllies;
      vm.updatePercentages = alliesService.updatePercentages;
      vm.movesService = movesService;
      //TODO Ideally not having to import this entire service. Just to expose it to the view. Only the Selected Move
      // variable is needed. possible that the select move function goes to movesService.

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
          fightQueueService.queuePool[0].stats.health += 20;
          if (fightQueueService.queuePool[0].stats.health > fightQueueService.queuePool[0].stats.maxHealth) {
            fightQueueService.queuePool[0].stats.health = fightQueueService.queuePool[0].stats.maxHealth;
          }
          alliesService.updatePercentages(fightQueueService.queuePool[0]);
          fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + " is resting.");
          fightQueueService.endTurn();
        }

        if (movesService.selectedMove === "Fury") {
          if (fightQueueService.queuePool[0].stats.energy < 40 || fightQueueService.queuePool[0].stats.health < 40) {
            fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + " doesn't have the resources to" +
              " perform Fury.");
            movesService.setSelectedMove('');
          } else {
            fightLogService.pushToFightLog('The Scarecrow is in Fury mode.');
            fightQueueService.queuePool[0].stats.energy -= 20;
            fightQueueService.queuePool[0].stats.health -= 40;
            alliesService.updatePercentages(fightQueueService.queuePool[0]);
            fightLogService.pushToFightLog('Select Three Targets');
            enemiesService.selectNumberOfTargets(3);
          }
        }

        if (movesService.selectedMove === "Fortify") {
          if (fightQueueService.queuePool[0].stats.energy < 10) {
            fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + " doesn't have the resources to" +
              " perform Fortify.");
            //TODO This should eventually be a function in fightLogService: fightLogService.lacksEnergy(name, move)
            movesService.setSelectedMove('');
          } else {
            fightQueueService.queuePool[0].stats.energy -= 10;
            alliesService.updatePercentages(fightQueueService.queuePool[0]);
            fightQueueService.queuePool[0].stats.defense = fightQueueService.queuePool[0].baseStats.defense + 5;
            fightLogService.pushToFightLog("The Scarecrow's defense has been raised by 5 for the duration of the" +
              " fight. This effect does NOT stack.");
            fightQueueService.endTurn();
          }
        }

        if (movesService.selectedMove === "Parry") {
          fightQueueService.queuePool[0].stance = 'Parrying';
          fightQueueService.queuePool[0].stanceCount = 2;
          fightLogService.pushToFightLog("The Scarecrow will deflect the next 2 incoming attacks.");
          fightQueueService.endTurn();
        }
      };
    }
  }
})();
