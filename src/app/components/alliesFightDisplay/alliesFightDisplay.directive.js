(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('alliesFightDisplay', alliesFightDisplay);

  alliesFightDisplay.$inject = ["alliesService", "movesService", "$rootScope"];

  function alliesFightDisplay(alliesService, movesService, $rootScope) {
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

      var scope = $rootScope;

      vm.selectedMove = false;
      vm.activeAllies = alliesService.activeAllies;
      vm.updatePercentages = alliesService.updatePercentages;

      vm.cardWidth = (90 / vm.activeAllies.length).toString() + '%';

      vm.selectMove = function (move) {
        vm.selectedMove = true;
        movesService.selectedMove = move;
      };

      scope.$watch('movesService.selectedMove', function () {
        console.log(movesService.selectedMove + " From the fight display");
      });

    }
  }
})();
