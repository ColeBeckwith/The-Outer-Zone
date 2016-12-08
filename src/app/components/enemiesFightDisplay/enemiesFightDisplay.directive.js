(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('enemiesFightDisplay', enemiesFightDisplay);

  enemiesFightDisplay.$inject = ["enemiesService", "fightQueueService", "boardCreator", "fightLogService"];

  function enemiesFightDisplay(enemiesService, fightQueueService, boardCreator, fightLogService) {
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
          if (boardCreator.checkPositionTargetable(enemy.coordinates.x, enemy.coordinates.y)) {
            fightQueueService.actionOnEnemy(enemy);
          } else {
            fightLogService.pushToFightLog(enemy.name + ' is out of range.');
          }
        }
      };

      enemiesService.getCardWidth();

    }
  }
})();
