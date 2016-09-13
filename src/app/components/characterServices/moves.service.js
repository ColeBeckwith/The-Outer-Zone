(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('movesService', movesService);

  function movesService() {
    var vm = this;

    vm.selectedMove = "";

  }
})();
