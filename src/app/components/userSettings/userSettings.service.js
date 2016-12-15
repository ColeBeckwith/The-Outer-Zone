(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('userSettings', userSettings);

  function userSettings() {
    var svc = this;

    activate();

    svc.getEnemyTurnSpeed = getEnemyTurnSpeed;
    svc.getAllSettings = getAllSettings;

    function activate() {
      setDefaultSettings();
    }

    function setDefaultSettings() {
      svc.settings = {
        enemyTurnSpeed: 400
      }
    }

    function getEnemyTurnSpeed() {
      return svc.settings.enemyTurnSpeed;
    }

    function getAllSettings() {
      return svc.settings;
    }

  }
})();
