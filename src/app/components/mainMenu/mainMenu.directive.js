(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('mainMenu', mainMenu);

  mainMenu.$inject = ["alliesService", "stateChangeService", "progressTracker"];

  function mainMenu(alliesService, stateChangeService, progressTracker) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/mainMenu/mainMenu.html',
      controller: mainMenuController,
      controllerAs: 'mainMenu',
      bindToController: true
    };

    return directive;

    function mainMenuController() {
      var vm = this;

      vm.activeAllies = alliesService.getActiveAllies();

      vm.goTo = function(state, fightType) {
        if (fightType) {
          progressTracker.setFightType(fightType);
        }
        stateChangeService.setPlayerState(state);
      };

    }
  }
})();
