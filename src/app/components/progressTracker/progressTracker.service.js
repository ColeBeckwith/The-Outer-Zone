(function() {
  'use strict';
  
  angular
    .module('outerZone')
    .service('progressTracker', progressTracker);
  
  function progressTracker() {
    var vm = this;
    
    vm.storyProgress = 0;
    
    vm.getStoryProgress = function() {
      return vm.storyProgress;
    };
    
    vm.advanceStory = function() {
      vm.storyProgress++
    };
  }
})();
