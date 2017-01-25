(function () {
    'use strict';

    angular
        .module('outerZone')
        .directive('helpScreen', helpScreen);

    helpScreen.$inject = ["stateChangeService", "achievementsService"];

    function helpScreen(stateChangeService, achievementsService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/helpScreen/helpScreen.html',
            controller: helpScreenController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function helpScreenController() {
            var vm = this;

            vm.tester = 'Here I am';

            vm.goBack = goBack;
            vm.readTutorial = readTutorial;

            function readTutorial() {
                achievementsService.readTutorial();
            }

            function goBack() {
                stateChangeService.setPlayerState('mainMenu');
            }
        }
    }

})();
