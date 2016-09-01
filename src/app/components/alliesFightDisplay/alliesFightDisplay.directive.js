(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('alliesFightDisplay', alliesFightDisplay);

  alliesFightDisplay.$inject = ["alliesService", "allyMovesService"];

  function alliesFightDisplay(alliesService, allyMovesService) {
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
      vm.activeAllies = [];

      angular.forEach(vm.allies, function(ally) {
        if (ally.active) {
          vm.allyCount++;
          vm.activeAllies.push(ally);
        }
      });

      angular.forEach(vm.activeAllies, function(ally) {
        ally.percentageHealth = (ally.stats.health/ally.stats.maxHealth)*100 + '%';
        ally.percentageEnergy = (ally.stats.energy/ally.stats.maxEnergy)*100 + '%';
      });

      vm.cardWidth = (90/vm.allyCount).toString() + '%';

      vm.hurtMe = function(ally) {
        ally.stats.health -= 10;
        ally.percentageHealth = (ally.stats.health/ally.stats.maxHealth)*100 + '%'
      };

      vm.drainMe = function(ally) {
        ally.stats.energy -= 1;
        ally.percentageEnergy = (ally.stats.energy/ally.stats.maxEnergy)*100 + '%';
      };
    }
  }
})();
