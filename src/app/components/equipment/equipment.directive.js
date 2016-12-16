(function() {

  angular
    .module('outerZone')
    .directive('equipment', equipment);

  equipment.$inject = ["stateChangeService", "inventoryService", "alliesService", "saveGame"];

  function equipment(stateChangeService, inventoryService, alliesService, saveGame) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/equipment/equipment.html',
      controller: equipmentController,
      controllerAs: 'equipment',
      bindToController: true
    };

    return directive;

    function equipmentController() {
      var vm = this;

      vm.activeAllies = alliesService.activeAllies;

      vm.activeSelection = vm.activeAllies[0];

      vm.equipment = inventoryService.equipment;

      vm.equipmentTypes = ['Head', 'Body', 'Arms', 'Legs', 'Weapon', 'Item'];

      vm.makeActiveSelection = function(ally) {
        vm.activeSelection = ally;
      };

      vm.checkIfReqsMet = function(item) {
        return inventoryService.checkIfReqsMet(vm.activeSelection, item);
      };

      vm.equipItem = function(item, indexOfEquipped) {
        alliesService.equipToAlly(vm.activeSelection, item);
        vm.equipment.splice(indexOfEquipped, 1)
      };

      vm.backToMain = function() {
        stateChangeService.setPlayerState('mainMenu');
        saveGame.saveGame();
      }

    }
  }
})();
