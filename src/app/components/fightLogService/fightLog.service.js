(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('fightLogService', fightLogService);

  function fightLogService() {
    var vm = this;

    vm.fightLog = [];
    vm.fightLogId = 0;

    vm.pushToFightLog = function(string) {
      vm.fightLog.push({'message' : string, 'id' : vm.fightLogId});
      vm.fightLogId++;
    };

    vm.getFightLog = function() {
      return vm.fightLog
    };
    
    vm.clearLog = function() {
      vm.fightLog = [];
      vm.fightLogId = 0;
    }
  }
})();
