(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('fightLogService', fightLogService);

  function fightLogService() {
    var svc = this;

    svc.pushToFightLog = pushToFightLog;
    svc.getFightLog = getFightLog;
    svc.clearLog = clearLog;

    clearLog();

    function pushToFightLog(string) {
      svc.fightLog.push({'message' : string, 'id' : svc.fightLogId});
      svc.fightLogId++;
    }

    function getFightLog() {
      return svc.fightLog
    }

    function clearLog() {
      svc.fightLog = [];
      svc.fightLogId = 0;
    }
  }
})();
