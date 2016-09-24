(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('mainMenu', mainMenu);

  mainMenu.$inject = ["alliesService", "stateChangeService"];

  function mainMenu(alliesService, stateChangeService) {
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

      vm.activeAllies = alliesService.activeAllies;

      vm.goTo = function(state) {
        stateChangeService.setPlayerState(state);
      };

    }
  }
})();
