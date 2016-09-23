(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('enemiesFightDisplay', enemiesFightDisplay);

  enemiesFightDisplay.$inject = ["enemiesService", "fightQueueService"];

  function enemiesFightDisplay(enemiesService, fightQueueService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/enemiesFightDisplay/enemiesFightDisplay.html',
      controller: enemiesFightDisplayController,
      controllerAs: 'enemiesFightDisplay',
      bindToController: true
    };

    return directive;

    function enemiesFightDisplayController() {
      var vm = this;

      vm.enemiesService = enemiesService;

      vm.enemies = enemiesService.getEnemies();

      vm.clickEnemy = function(enemy) {
        if (enemiesService.targetSelectMode > 0) {
          fightQueueService.actionOnEnemy(enemy);
        }
      };

      enemiesService.getCardWidth();

    }
  }
})();
