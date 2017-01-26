(function() {
  'use strict';

  angular
    .module('outerZone')
    .controller('MainController', MainController);

  MainController.$inject = ["stateChangeService", "achievementsService"];
  /** @ngInject */
  function MainController(stateChangeService, achievementsService) {
    var vm = this;

    vm.stateChangeService = stateChangeService;
    vm.achievementsService = achievementsService;

  }
})();
