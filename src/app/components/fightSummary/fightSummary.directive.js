(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('fightSummary', fightSummary);

  fightSummary.$inject = ["stateChangeService", "progressTracker", "enemiesService", "alliesService", "$timeout", "lootService", "inventoryService", "boardCreator"];

  function fightSummary(stateChangeService, progressTracker, enemiesService, alliesService, $timeout, lootService, inventoryService, boardCreator) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/fightSummary/fightSummary.html',
      controller: fightSummaryController,
      controllerAs: 'fightSummary',
      bindToController: true
    };

    return directive;

    function fightSummaryController() {
      var vm = this;

      vm.loot = [];

      vm.moneyAwarded = 0;

      vm.activeAllies = alliesService.activeAllies;

      vm.allies = alliesService.allies;

      alliesService.restoreAll();

      angular.forEach(vm.activeAllies, function(ally) {
        ally.leveledUp = false;
      });

      vm.battleWon = progressTracker.getBattleWon();

      if (vm.battleWon) {
        vm.experienceAwarded = 0;

        vm.moneyAwarded += enemiesService.getMoney();

        vm.loot = lootService.gimmeTheLoot();

        vm.experienceAwarded += enemiesService.getExperience();

        vm.experienceToEach = vm.experienceAwarded / alliesService.activeAllies.length;

        $timeout(function() {
          alliesService.distributeExperience(vm.experienceAwarded);
        }, 1000);
      }

      vm.checkIfReqsMet = function(ally, item) {
        return inventoryService.checkIfReqsMet(ally, item);
      };

      vm.sellItem = function(item, index) {
        vm.loot.splice(index, 1);
        vm.moneyAwarded += item.worth;
      };

      vm.equipToAlly = function(ally, indexOfItem, item) {
        vm.loot.splice(indexOfItem, 1);
        alliesService.equipToAlly(ally, item);
      };

      vm.continue = function() {
        boardCreator.clearAllyLocations(vm.allies);
        inventoryService.addToInventory(vm.loot);
        inventoryService.money += vm.moneyAwarded;
        progressTracker.advanceStory();
        stateChangeService.setPlayerState('story');
      };

      vm.tryAgain = function() {
        stateChangeService.setPlayerState('mainMenu');
      };
    }
  }
})();
