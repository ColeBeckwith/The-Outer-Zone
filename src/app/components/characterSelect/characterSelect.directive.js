(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('characterSelect', characterSelect);

  characterSelect.$inject = ["alliesService"];

  function characterSelect(alliesService) {
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
      vm.newAlly = vm.allies[0];

      vm.makeActiveSelection = function(build) {
        vm.activeSelection = build;
      };

      vm.confirmClass = function() {
        vm.newAlly.stats = vm.activeSelection.baseStats;
        vm.newAlly.stats.health = vm.activeSelection.baseStats.maxHealth;
        vm.newAlly.stats.energy = vm.activeSelection.baseStats.maxEnergy;
        vm.newAlly.class = vm.activeSelection.name;
        alliesService.activateAlly(vm.newAlly);
      };

    }
  }
})();
