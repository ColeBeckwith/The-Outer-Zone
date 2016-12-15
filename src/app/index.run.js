(function() {
  'use strict';

  angular
    .module('outerZone')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');


  }

})();
