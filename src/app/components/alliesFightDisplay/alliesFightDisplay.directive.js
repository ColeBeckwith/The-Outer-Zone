(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('alliesFightDisplay', alliesFightDisplay);

  alliesFightDisplay.$inject = ["alliesService", "movesService", "fightQueueService"];

  function alliesFightDisplay(alliesService, movesService, fightQueueService) {
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

      vm.selectMove = selectMove;
      vm.clickAlly = clickAlly;
      vm.pass = pass;

      vm.targetSelectMode = alliesService.targetSelectMode;
      vm.activeAllies = alliesService.activeAllies;
      vm.movesService = movesService;
      vm.alliesService = alliesService;
      vm.movesService = movesService;
      //TODO Temporary solution. Don't want to expose entire services.

      vm.cardWidth = (90 / vm.activeAllies.length).toString() + '%';

      function selectMove(move) {
        fightQueueService.selectMove(move);
      }

      function clickAlly(ally) {
        if (vm.alliesService.targetSelectMode > 0) {
          fightQueueService.actionOnAlly(ally);
        }
      }

      // After a player has moved. Their only option should be to pass and not rest.
      function pass() {
        fightQueueService.endTurn();
      }
    }
  }
})();
