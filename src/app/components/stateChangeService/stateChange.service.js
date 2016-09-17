(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('stateChangeService', stateChangeService);

  function stateChangeService() {
    var vm = this;

    vm.playerState = 'characterSelect';
    //TODO SHould be initialized as 'story' while not debugging. 

    vm.setPlayerState = function(state) {
      vm.playerState = state;
    }

  }

})();
