(function() {
  'use strict';

  angular
    .module('outerZone')
    .directive('userSettingsDirective', userSettingsDirective);

  userSettingsDirective.$inject = ['userSettings'];

  function userSettingsDirective(userSettings) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/userSettings/userSettings.html',
      controller: userSettingsCtrl,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function userSettingsCtrl() {
      var vm = this;

      vm.settings = userSettings.getAllSettings();

      // TODO might need a save function to write it back to the service.

      // TODO also need to send it to the save game service and load it, but that's for the service.

    }
  }
})();
