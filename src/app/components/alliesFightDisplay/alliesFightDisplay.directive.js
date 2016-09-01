(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('alliesFightDisplay', alliesFightDisplay);

  alliesFightDisplay.$inject = ["alliesService"];

  function alliesFightDisplay(alliesService) {
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

      vm.allies = alliesService.allies;
      vm.allyCount = 0;

      angular.forEach(vm.allies, function(ally) {
        if (ally.active) {
          vm.allyCount++
        }
        ally.percentageHealth = (ally.health/ally.maxHealth)*100 + '%';
        ally.percentageEnergy = (ally.energy/ally.maxEnergy)*100 + '%';
      });

      vm.cardWidth = (90/vm.allyCount).toString() + '%';

      vm.hurtMe = function(ally) {
        ally.health -= 10;
        ally.percentageHealth = (ally.health/ally.maxHealth)*100 + '%'
      };

      vm.drainMe = function(ally) {
        ally.energy -= 1;
        ally.percentageEnergy = (ally.energy/ally.maxEnergy)*100 + '%';
      };
    }
  }
})();
