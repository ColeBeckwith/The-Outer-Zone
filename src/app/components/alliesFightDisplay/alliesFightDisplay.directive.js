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

      vm.targetSelectMode = alliesService.targetSelectMode;
      vm.activeAllies = alliesService.activeAllies;
      vm.movesService = movesService;
      vm.alliesService = alliesService;
      vm.movesService = movesService;
      //TODO Temporary solution. Don't want to expose entire service.

      vm.cardWidth = (90 / vm.activeAllies.length).toString() + '%';

      vm.selectMove = function(move) {
        fightQueueService.selectMove(move);
      };

      vm.clickAlly = function(ally) {
        if (vm.alliesService.targetSelectMode > 0) {
          fightQueueService.actionOnAlly(ally);
        }
      };

      vm.pass = function() {
        fightQueueService.endTurn();
      }
    }
  }
})();
