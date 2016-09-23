(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('enemiesFightDisplay', enemiesFightDisplay);

  enemiesFightDisplay.$inject = ["enemiesService", "fightQueueService", "fightLogService", "stateChangeService", "progressTracker", "$timeout", "movesService"];

  function enemiesFightDisplay(enemiesService, fightQueueService, fightLogService, stateChangeService, progressTracker, $timeout, movesService) {
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
          vm.updateActiveEnemies();
        }
      };

      vm.updateActiveEnemies = function() {
        vm.enemyCount = 0;
        angular.forEach(vm.enemies, function(enemy) {
          if (enemy.status !== 'dead') {
            vm.enemyCount++
          }
          enemy.percentageHealth = (enemy.stats.health/enemy.stats.maxHealth)*100 + '%';
        });

        vm.cardWidth = (90/vm.enemyCount).toString() + '%';
      };

      vm.updateActiveEnemies();

    }
  }
})();
