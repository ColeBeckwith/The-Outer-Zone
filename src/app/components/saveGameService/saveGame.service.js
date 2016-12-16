(function() {
  'use strict';

  angular
    .module("outerZone")
    .service('saveGame', saveGame);

  saveGame.$inject = ["alliesService", "progressTracker", "inventoryService", "toastr", "lootService", "userSettingsService"];

  function saveGame(alliesService, progressTracker, inventoryService, toastr, lootService, userSettingsService) {
    var svc = this;

    svc.saveGame = saveGame;
    svc.loadGame = loadGame;
    svc.checkForSaveFile = checkForSaveFile;

    activate();

    function activate() {
      svc.saveFile = {};
    }

    function saveGame() {

      // Will probably need to save the store.
      store.set('saveFile', {
        'storyProgress' : progressTracker.storyProgress,
        'allyProgress' : progressTracker.newAlly,
        'allies' : alliesService.allies,
        'equipment' : inventoryService.equipment,
        'money': inventoryService.money,
        'userSettings': userSettingsService.getAllSettings()
      });
      toastr.success('Game Saved');
    }

    function loadGame() {
      svc.saveFile = store.get('saveFile');
      userSettingsService.saveSettings(svc.saveFile.userSettings);
      alliesService.setAllies(svc.saveFile.allies);
      progressTracker.loadGame(svc.saveFile.storyProgress, svc.saveFile.allyProgress);
      inventoryService.loadGame(svc.saveFile.equipment, svc.saveFile.money);
      angular.forEach(alliesService.activeAllies, function(ally) {
        lootService.pullFromVault(ally);
      });
      toastr.info('Game Loaded');
    }

    function checkForSaveFile() {
      return (store.get('saveFile') !== undefined)
    }
  }
})();
