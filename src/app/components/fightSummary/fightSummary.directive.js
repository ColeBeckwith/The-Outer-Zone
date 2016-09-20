(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('fightSummary', fightSummary);

  fightSummary.$inject = ["stateChangeService", "progressTracker", "enemiesService", "alliesService", "$timeout", "lootService", "inventoryService"];

  function fightSummary(stateChangeService, progressTracker, enemiesService, alliesService, $timeout, lootService, inventoryService) {
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

      vm.sellItem = function(item, index) {
        vm.loot.splice(index, 1);
        vm.moneyAwarded += item.worth;
      };

      vm.continue = function() {
        inventoryService.addToInventory(vm.loot);
        inventoryService.money += vm.moneyAwarded;
        console.log(inventoryService.money);
        console.log(inventoryService.equipment);
        progressTracker.advanceStory();
        stateChangeService.setPlayerState('story');
      };

      vm.tryAgain = function() {
        stateChangeService.setPlayerState('prefight');
      };
    }
  }
})();
