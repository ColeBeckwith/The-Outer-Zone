(function() {
  'use strict';

  angular
    .module('outerZone')
    .controller('MainController', MainController);

  MainController.$inject = ["stateChangeService"];
  /** @ngInject */
  function MainController(stateChangeService) {
    var vm = this;
    
    vm.stateChangeService = stateChangeService;

  }
})();
