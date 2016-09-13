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

      vm.enemies = enemiesService.enemies;
      vm.enemyCount = 0;

      vm.allyAttackEnemy = function(enemy) {
        if (enemiesService.targetSelectMode > 0){
          var damage = fightQueueService.queuePool[0].stats.strength * Math.floor((Math.random() * 6) + 1);
          enemiesService.allyAttackEnemy(enemy, damage);
          enemy.percentageHealth = (enemy.stats.health/enemy.stats.maxHealth)*100 + '%';
          if (enemiesService.targetSelectMode === 0) {
            fightQueueService.endTurn();
          }
        }
      };
      //TODO something like this.

      angular.forEach(vm.enemies, function(enemy) {
        if (enemy.active) {
          vm.enemyCount++
        }
        enemy.percentageHealth = (enemy.stats.health/enemy.stats.maxHealth)*100 + '%';
      });

      vm.cardWidth = (90/vm.enemyCount).toString() + '%';

    }
  }
})();
