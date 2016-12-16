(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('fightSummary', fightSummary);

  fightSummary.$inject = ["stateChangeService", "progressTracker", "enemiesService", "alliesService", "$timeout",
    "lootService", "inventoryService", "saveGame"];

  function fightSummary(stateChangeService, progressTracker, enemiesService, alliesService, $timeout, lootService,
                        inventoryService, saveGame) {
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

      vm.checkIfReqsMet = checkIfReqsMet;
      vm.sellItem = sellItem;
      vm.equipToAlly = equipToAlly;
      vm.continueFn = continueFn;
      vm.tryAgain = tryAgain;

      activate();

      function activate() {
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
          vm.experienceToEach = Math.round(vm.experienceAwarded / alliesService.activeAllies.length);

          $timeout(function() {
            alliesService.distributeExperience(vm.experienceAwarded);
          }, 1000);
        }
      }

      function checkIfReqsMet(ally, item) {
        return inventoryService.checkIfReqsMet(ally, item);
      }

      function sellItem(item, index) {
        vm.loot.splice(index, 1);
        vm.moneyAwarded += item.worth;
      }

      function equipToAlly(ally, indexOfItem, item) {
        vm.loot.splice(indexOfItem, 1);
        alliesService.equipToAlly(ally, item);
      }

      function continueFn() {
        inventoryService.addToInventory(vm.loot);
        inventoryService.money += vm.moneyAwarded;
        if (progressTracker.fightType === 'story') {
          progressTracker.advanceStory();
          stateChangeService.setPlayerState('story');
        } else if (progressTracker.fightType === 'arena') {
          saveGame.saveGame();
          stateChangeService.setPlayerState('mainMenu');
        }
      }

      function tryAgain() {
        stateChangeService.setPlayerState('mainMenu');
      }
    }
  }
})();
