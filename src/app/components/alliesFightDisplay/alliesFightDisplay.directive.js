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
      // variable is needed.

      vm.cardWidth = (90 / vm.activeAllies.length).toString() + '%';

      vm.selectMove = function (move) {
        movesService.setSelectedMove(move);

        if (movesService.selectedMove === "Attack") {
          fightLogService.pushToFightLog('Select target to Attack.');
          enemiesService.selectNumberOfTargets(1);
        }

        if (movesService.selectedMove === "Rest") {
          fightQueueService.queuePool[0].stats.energy += 20;
          fightQueueService.queuePool[0].stats.health += 20;
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
          fightLogService.pushToFightLog("The Scarecrow has been fortified.");
          fightQueueService.endTurn();
        }
        if (movesService.selectedMove === "Parry") {
          fightLogService.pushToFightLog("The Scarecrow will deflect the next incoming attack.");
          fightQueueService.endTurn();
        }
      };
    }
  }
})();
