(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('characterSelect', characterSelect);

  characterSelect.$inject = ["alliesService", "stateChangeService", "progressTracker"];

  function characterSelect(alliesService, stateChangeService, progressTracker) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/characterSelect/characterSelect.html',
      controller: characterSelectController,
      controllerAs: 'characterSelect',
      bindToController: true
    };

    return directive;

    function characterSelectController() {
      var vm = this;

      vm.allies = alliesService.allies;
      vm.newAlly = vm.allies[progressTracker.getNewAlly()];

      vm.makeActiveSelection = function(build) {
        vm.activeSelection = build;
      };

      vm.confirmClass = function() {
        vm.newAlly.stats = vm.activeSelection.baseStats;
        vm.newAlly.stats.health = vm.activeSelection.baseStats.maxHealth;
        vm.newAlly.stats.energy = vm.activeSelection.baseStats.maxEnergy;
        vm.newAlly.class = vm.activeSelection.name;
        vm.newAlly.moves = [['Attack', 1],['Rest', 1]].concat(vm.activeSelection.moves);
        alliesService.activateAlly(vm.newAlly);
        stateChangeService.playerState = 'prefight';
      };

    }
  }
})();
