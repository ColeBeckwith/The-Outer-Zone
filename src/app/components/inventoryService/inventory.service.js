(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('inventoryService', inventoryService);

  function inventoryService() {
    var svc = this;
    
    svc.money = 0;
    
    svc.equipment = [];
    
    svc.addToInventory = function(items) {
      angular.forEach(items, function(item) {
        svc.equipment.push(item);
      })
    }
  }
})();
