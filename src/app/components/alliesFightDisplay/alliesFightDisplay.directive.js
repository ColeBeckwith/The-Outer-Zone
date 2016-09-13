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

      vm.cardWidth = (90 / vm.activeAllies.length).toString() + '%';

      vm.selectMove = function (move) {
        movesService.selectedMove = move;
        if (movesService.selectedMove === "Punch") {
          fightLogService.pushToFightLog('Select target to Punch.');
          enemiesService.targetSelectMode++;
        }
        if (movesService.selectedMove === "Fury") {
          fightLogService.pushToFightLog('The Scarecrow is in Fury mode.');
          fightQueueService.endTurn();
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
