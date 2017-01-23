(function () {
    'use strict';

    angular
        .module("outerZone")
        .directive('startScreen', startScreen);

    startScreen.$inject = ["stateChangeService", "saveGame"];

    function startScreen(stateChangeService, saveGame) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/startScreen/startScreen.html',
            controller: startScreenController,
            controllerAs: 'startScreen',
            bindToController: true
        };

        return directive;

        function startScreenController() {
            var vm = this;

            vm.saveGameRetrieved = false;

            vm.newGame = function () {
                stateChangeService.setPlayerState('story');
            };

            if (saveGame.checkForSaveFile()) {
                vm.saveGameRetrieved = true;
            }

            vm.loadGame = function () {
                saveGame.loadGame();
                stateChangeService.setPlayerState('mainMenu');
            };

        }
    }
})();
