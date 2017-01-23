(function () {
    'use strict';

    angular
        .module('outerZone')
        .directive('storyText', storyText);

    storyText.$inject = ["stateChangeService", "progressTracker", "storyService", "saveGame"];

    function storyText(stateChangeService, progressTracker, storyService, saveGame) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/storyText/storyText.html',
            controller: storyTextController,
            controllerAs: 'storyText',
            bindToController: true
        };

        return directive;

        function storyTextController() {
            var vm = this;

            vm.storyProgress = progressTracker.getStoryProgress();

            vm.storyTexts = storyService.storyTexts;

            vm.continue = function () {

                if (vm.storyProgress === 0 || vm.storyProgress === 2) {
                    progressTracker.addNewAlly();
                    stateChangeService.setPlayerState('characterSelect');
                } else {
                    saveGame.saveGame();
                    stateChangeService.setPlayerState('mainMenu');
                }
            }
        }
    }
})();
