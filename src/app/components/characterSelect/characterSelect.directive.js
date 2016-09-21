(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('characterSelect', characterSelect);

  characterSelect.$inject = ["alliesService", "stateChangeService", "progressTracker", "lootService"];

  function characterSelect(alliesService, stateChangeService, progressTracker, lootService) {
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
        vm.newAlly.baseStats = vm.activeSelection.baseStats;
        vm.newAlly.baseStats.health = vm.activeSelection.baseStats.maxHealth;
        vm.newAlly.baseStats.energy = vm.activeSelection.baseStats.maxEnergy;
        vm.newAlly.class = vm.activeSelection.name;
        vm.newAlly.icon = vm.activeSelection.icon;
        vm.newAlly.levelingSchedule = vm.activeSelection.levelingSchedule;
        vm.newAlly.moves = [['Attack', 1],['Rest', 1]].concat(vm.activeSelection.moves);
        lootService.pullFromVault(vm.newAlly);
        alliesService.activateAlly(vm.newAlly);
        stateChangeService.playerState = 'mainMenu';
      };

    }
  }
})();
