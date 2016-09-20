(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('fightSummary', fightSummary);

  fightSummary.$inject = ["stateChangeService", "progressTracker", "enemiesService", "alliesService", "$timeout", "lootService"];

  function fightSummary(stateChangeService, progressTracker, enemiesService, alliesService, $timeout, lootService) {
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

      vm.activeAllies = alliesService.activeAllies;

      angular.forEach(vm.activeAllies, function(ally) {
        ally.leveledUp = false;
      });

      vm.battleWon = progressTracker.getBattleWon();

      if (vm.battleWon) {
        vm.experienceAwarded = 0;

        lootService.gimmeTheLoot();

        vm.experienceAwarded += enemiesService.getExperience();

        vm.experienceToEach = vm.experienceAwarded / alliesService.activeAllies.length;

        $timeout(function() {
          alliesService.distributeExperience(vm.experienceAwarded);
        }, 1000);
      }

      vm.continue = function() {
        progressTracker.advanceStory();
        stateChangeService.setPlayerState('story');
      };

      vm.tryAgain = function() {
        stateChangeService.setPlayerState('prefight');
      };
    }
  }
})();
