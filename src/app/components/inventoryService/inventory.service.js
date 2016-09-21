(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('inventoryService', inventoryService);

  function inventoryService() {
    var svc = this;

    svc.money = 0;

    svc.equipment = [];

    svc.getMoney = function() {
      return svc.money;
    };

    svc.addToInventory = function(items) {
      angular.forEach(items, function(item) {
        svc.equipment.push(item);
      })
    };

    svc.checkIfReqsMet = function(ally, item) {
      return (item.lvlReq > ally.level || (item.characterReq !== ally.id && item.characterReq !== 'None') || (item.classReq !== ally.class && item.classReq !== 'None'))
    };
  }
})();
