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

      vm.activeAllies = alliesService.activeAllies;
      vm.updatePercentages = alliesService.updatePercentages;

      vm.cardWidth = (90/vm.activeAllies.length).toString() + '%';

      vm.hurtMe = function(ally) {
        ally.stats.health -= 10;
        alliesService.updatePercentages(ally);
      };
    }
  }
})();
