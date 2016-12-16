(function() {
  'use strict';

  angular
    .module('outerZone')
    .directive('userSettingsDirective', userSettingsDirective);

  userSettingsDirective.$inject = ['userSettingsService', 'saveGame'];

  function userSettingsDirective(userSettingsService, saveGame) {
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

      vm.settings = userSettingsService.getAllSettings();

      vm.saveSettings = saveSettings;
      vm.resetToDefault = resetToDefault;

      activate();

      function activate() {
        vm.autoTargetPriorityOptions = [
          'Lowest Health',
          'Lowest Percentage Health',
          'Highest Health',
          'Highest Percentage Health'
        ]
      }

      function saveSettings() {
        userSettingsService.saveSettings(vm.settings);
        saveGame.saveGame();
      }

      function resetToDefault() {
        userSettingsService.resetToDefault();
      }

    }
  }
})();
