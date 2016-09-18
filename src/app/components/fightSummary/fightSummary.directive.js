(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('fightSummary', fightSummary);

  fightSummary.$inject = ["stateChangeService", "progressTracker", "enemiesService", "alliesService"];

  function fightSummary(stateChangeService, progressTracker, enemiesService, alliesService) {
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

      vm.battleWon = progressTracker.getBattleWon();

      if (vm.battleWon) {
        vm.experienceAwarded = 0;

        angular.forEach(enemiesService.enemies[progressTracker.storyProgress], function (enemy) {
          vm.experienceAwarded += enemy.experience;
        });

        vm.experienceToEach = vm.experienceAwarded / alliesService.activeAllies.length;

        alliesService.distributeExperience(vm.experienceAwarded);
      }

      vm.continue = function() {
        progressTracker.advanceStory();
        stateChangeService.setPlayerState('story');
      };

      vm.tryAgain = function() {
        stateChangeService.setPlayerState('prefight');
      }
    }
  }
})();
