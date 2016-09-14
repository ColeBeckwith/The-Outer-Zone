(function() {
  'use strict';

  angular
    .module('outerZone')
    .directive('storyText', storyText);

  storyText.$inject = ["stateChangeService", "progressTracker"];

  function storyText(stateChangeService, progressTracker) {
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

      vm.storyTexts = [
        [
          "This is the first part of the story",
          "Here it is",
          "Right here"
        ],
        [
          "This is the second part of the story",
          "right here"
        ]
      ];

      vm.continue = function() {
        if (vm.storyProgress === 0) {
          stateChangeService.setPlayerState('characterSelect');
        }
        if (vm.storyProgress === 1) {
          stateChangeService.setPlayerState('fight');
        }
      }
    }
  }
})();
