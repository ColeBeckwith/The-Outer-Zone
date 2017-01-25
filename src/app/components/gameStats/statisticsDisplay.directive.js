(function() {

    angular
        .module('outerZone')
        .directive('statisticsDisplay', statisticsDisplay);

    statisticsDisplay.$inject = ["gameStatsService", "alliesService", "stateChangeService"];

    function statisticsDisplay(gameStatsService, alliesService, stateChangeService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/gameStats/statisticsDisplay.html',
            controller: statisticsDisplayCtrl,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function statisticsDisplayCtrl() {
            var vm = this;

            activate();

            vm.back = back;

            function activate() {
                vm.stats = gameStatsService.gameStats;

                getAllyNames()
            }

            function getAllyNames() {
                alliesService.allies.forEach(function(ally) {
                    switch (ally.id) {
                        case 101:
                            vm.allyOneName = ally.name;
                            break;
                        case 102:
                            vm.allyTwoName = ally.name;
                            break;
                        case 103:
                            vm.allyThreeName = ally.name;
                            break;
                        case 104:
                            vm.allyFourName = ally.name;
                            break;
                        case 105:
                            vm.allyFiveName = ally.name;
                            break;
                        default:
                            break;
                    }
                })
            }

            function back() {
                stateChangeService.setPlayerState('mainMenu');
            }
        }
    }

})();
