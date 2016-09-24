(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('progressTracker', progressTracker);

  function progressTracker() {
    var vm = this;

    vm.storyProgress = 0;
    vm.newAlly = -1;
    vm.fightOngoing = false;
    vm.battleWon = false;

    vm.getStoryProgress = function() {
      return vm.storyProgress;
    };

    vm.advanceStory = function() {
      vm.storyProgress++;
    };

    vm.setBattleWon = function(result) {
      vm.battleWon = result;
    };

    vm.getBattleWon = function() {
      return vm.battleWon;
    };

    vm.getNewAlly = function() {
      return vm.newAlly;
    };

    vm.addNewAlly = function() {
      vm.newAlly++;
    };

    vm.startFight = function() {
      vm.fightOngoing = true;
    };

    vm.stopFight = function() {
      vm.fightOngoing = false;
    };
    
    vm.loadGame = function(storyProgress, allyProgress) {
      vm.storyProgress = storyProgress;
      vm.newAlly = allyProgress;
    }
  }
})();
