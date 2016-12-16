(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('userSettingsService', userSettingsService);

  function userSettingsService() {
    var svc = this;

    svc.getEnemyTurnSpeed = getEnemyTurnSpeed;
    svc.getAutoTargetAllyPriority = getAutoTargetAllyPriority;
    svc.getAutoTargetEnemyPriority = getAutoTargetEnemyPriority;
    svc.getAllSettings = getAllSettings;
    svc.saveSettings = saveSettings;
    svc.resetToDefault = resetToDefault;

    activate();

    function activate() {
      setDefaultSettings();
    }

    function setDefaultSettings() {
      svc.settings = {
        enemyTurnSpeed: 2000,
        autoTargetEnemyPriority: 'Lowest Health',
        autoTargetAllyPriority: 'Lowest Health'
      }
    }

    function getEnemyTurnSpeed() {
      return svc.settings.enemyTurnSpeed;
    }

    function getAutoTargetEnemyPriority() {
      return svc.settings.autoTargetEnemyPriority;
    }

    function getAutoTargetAllyPriority() {
      return svc.settings.autoTargetAllyPriority;
    }

    function getAllSettings() {
      return svc.settings;
    }

    function saveSettings(settings) {
      svc.settings = settings;
    }

    function resetToDefault() {
      setDefaultSettings();
    }

  }
})();
