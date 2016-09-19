(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('startScreen', startScreen);

  startScreen.$inject = ["stateChangeService"];

  function startScreen(stateChangeService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/startScreen/startScreen.html',
      controller: startScreenController,
      controllerAs: 'startScreen',
      bindToController: true
    };

    return directive;

    function startScreenController() {
      var vm = this;

      vm.newGame = function() {
        stateChangeService.setPlayerState('story');
      }
    }
  }
})();
