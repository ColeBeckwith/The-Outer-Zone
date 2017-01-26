(function() {
    'use strict';

    angular
        .module('outerZone')
        .directive('achievementsMenu', achievementsMenu);

    achievementsMenu.$inject = ["achievementsService", "stateChangeService"];

    function achievementsMenu(achievementsService, stateChangeService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/achievements/achievementsMenu/achievementsMenu.html',
            controller: achievementsMenuCtrl,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function achievementsMenuCtrl() {
            var vm = this;

            vm.goBack = goBack;

            activate();

            function activate() {
                vm.achievements = achievementsService.achievements;
                vm.percentageComplete = achievementsService.percentageComplete || 0;
            }

            function goBack() {
                stateChangeService.setPlayerState('mainMenu');
            }
        }
    }

})();
