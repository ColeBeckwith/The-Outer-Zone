(function() {
    'use strict';

    angular
        .module('outerZone')
        .directive('achievementUnlockedDisplay', achievementUnlockedDisplay);

    achievementUnlockedDisplay.$inject = ["achievementsService", "$timeout"];

    function achievementUnlockedDisplay(achievementsService, $timeout) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/achievements/achievementUnlockedDisplay/achievementUnlockedDisplay.html',
            controller: achievementUnlockedDisplayCtrl,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function achievementUnlockedDisplayCtrl() {
            var vm = this;

            vm.cycleAchievements = cycleAchievements;

            activate();

            function activate() {
                vm.achievementsToDisplay = achievementsService.recentlyUnlockedAchievements;

                cycleAchievements();
            }

            function cycleAchievements() {
                vm.achievementDisplayed = true;

                $timeout(function() {
                    vm.achievementDisplayed = false;
                }, 3500);

                $timeout(function() {
                    vm.achievementsToDisplay.splice(0, 1);
                    if (vm.achievementsToDisplay.length > 0) {
                        cycleAchievements();
                    }
                }, 4400);
            }
        }

    }

})();
