/**
 * Created by CBeckwith411 on 9/1/16.
 */
(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('allyMovesService', allyMovesService);

  function allyMovesService() {
    var vm = this;

    vm.scarecrowMoves = ['Attack', 'Defend', 'Run']
  }
})();
