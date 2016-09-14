(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('enemiesFightDisplay', enemiesFightDisplay);

  enemiesFightDisplay.$inject = ["enemiesService", "fightQueueService", "fightLogService", "stateChangeService", "progressTracker"];

  function enemiesFightDisplay(enemiesService, fightQueueService, fightLogService, stateChangeService, progressTracker) {
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

      vm.enemies = enemiesService.getEnemies();

      vm.allyAttackEnemy = function(enemy) {
        if (enemiesService.targetSelectMode > 0) {
          var damage = fightQueueService.queuePool[0].stats.strength * Math.floor((Math.random() * 6) + 1);
          var trueDamage = damage - (enemy.stats.defense * (Math.floor(Math.random() * 4) + 1));
          if (trueDamage <= 0) {
            trueDamage = 1;
          }
          enemy.stats.health -= trueDamage;
          enemy.percentageHealth = (enemy.stats.health/enemy.stats.maxHealth)*100 + '%';
          fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + " attacked " + enemy.name + " for " + trueDamage + " damage.");
          enemiesService.targetSelectMode--;
          if (enemiesService.targetSelectMode === 0) {
            fightQueueService.endTurn();
          }
          vm.checkForDead(enemy);
        }
      };

      vm.checkForDead = function(enemy) {
        if (enemy.stats.health <= 0) {
          enemy.stats.health = 0;
          enemy.active = false;
          fightLogService.pushToFightLog(enemy.name + " has been killed.");
          vm.updateActiveEnemies();
          vm.checkForVictory();
        }
      };

      vm.checkForVictory = function() {
        if (vm.enemyCount === 0) {
          fightLogService.pushToFightLog("Victory!");
          stateChangeService.setPlayerState("fightSummary");
          progressTracker.advanceStory();
          vm.cleanUpFight();
        }

        //TODO still the problem of rebuilding the queue after the fight. Ideally, this wouldn't be done until right
        // before the fight to allow for last minute speed stat changes.
      };

      vm.cleanUpFight = function() {
        fightLogService.clearLog();
      };

      vm.updateActiveEnemies = function() {
        vm.enemyCount = 0;
        angular.forEach(vm.enemies, function(enemy) {
          if (enemy.active) {
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
