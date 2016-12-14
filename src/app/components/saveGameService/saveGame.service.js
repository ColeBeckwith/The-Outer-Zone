(function() {
  'use strict';

  angular
    .module("outerZone")
    .service('saveGame', saveGame);

  saveGame.$inject = ["alliesService", "progressTracker", "inventoryService", "toastr"];

  function saveGame(alliesService, progressTracker, inventoryService, toastr) {
    var svc = this;

    svc.saveGame = saveGame;
    svc.loadGame = loadGame;
    svc.checkForSaveFile = checkForSaveFile;

    activate();

    function activate() {
      svc.saveFile = {};
    }

    function saveGame() {
      store.set('saveFile', {
        'storyProgress' : progressTracker.storyProgress,
        'allyProgress' : progressTracker.newAlly,
        'allies' : alliesService.allies,
        'equipment' : inventoryService.equipment,
        'money': inventoryService.money
      });
      toastr.success('Game Saved');
    }

    function loadGame() {
      svc.saveFile = store.get('saveFile');
      alliesService.setAllies(svc.saveFile.allies);
      progressTracker.loadGame(svc.saveFile.storyProgress, svc.saveFile.allyProgress);
      inventoryService.loadGame(svc.saveFile.equipment, svc.saveFile.money);
      toastr.info('Game Loaded');
    }

    function checkForSaveFile() {
      return (store.get('saveFile') !== undefined)
    }
  }
})();
