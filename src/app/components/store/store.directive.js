(function() {
  'use strict';

  angular
    .module("outerZone")
    .directive('store', store);

  store.$inject = ["stateChangeService", "inventoryService"];

  function store(stateChangeService, inventoryService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/store/store.html',
      controller: storeController,
      controllerAs: 'store',
      bindToController: true
    };

    return directive;

    function storeController() {
      var vm = this;

      vm.storeInventory = [];

      vm.inventoryService = inventoryService;

      vm.equipment = inventoryService.equipment;

      vm.sellItem = function(item, index) {
        inventoryService.money += item.worth;
        vm.equipment.splice(index, 1);
      };

      vm.backToMain = function() {
        stateChangeService.setPlayerState('mainMenu');
      };

    }
  }
})();
