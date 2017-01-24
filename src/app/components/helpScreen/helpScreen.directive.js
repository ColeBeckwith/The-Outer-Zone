(function () {
    'use strict';

    angular
        .module('outerZone')
        .directive('helpScreen', helpScreen);

    helpScreen.$inject = ["stateChangeService"];

    function helpScreen(stateChangeService) {
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

            vm.goBack = goBack;

            function goBack() {
                stateChangeService.setPlayerState('mainMenu');
            }
        }
    }

})();
