(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('movesService', movesService);

  function movesService() {
    var vm = this;

    vm.selectedMove = "";

    vm.setSelectedMove = function(move) {
      vm.selectedMove = move;
    };

    vm.getSelectedMove = function() {
      return vm.selectedMove;
    };
  }
})();
