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

      vm.enemies = enemiesService.getEnemies();

      vm.allyAttackEnemy = function(enemy) {
        if (enemiesService.targetSelectMode > 0) {
          if ((Math.random() * 6 * fightQueueService.queuePool[0].stats.speed) > (Math.random() * enemy.stats.speed)) {
            var damage = Math.round(((1.7 + ((Math.random() * 6) / 10)) * fightQueueService.queuePool[0].stats.strength) - (.75*enemy.stats.defense));

            if (damage <= 0) {
              damage = 0;
            }

            enemy.stats.health -= damage;
            enemy.percentageHealth = (enemy.stats.health / enemy.stats.maxHealth) * 100 + '%';
            fightLogService.pushToFightLog(fightQueueService.queuePool[0].name + " attacked " + enemy.name + " for " + damage + " damage.");

            if (movesService.selectedMove === "Knockout") {
              fightQueueService.takeAwayTurn(enemy, 1);
              fightLogService.pushToFightLog(enemy.name + " is knocked out and will miss their next turn.")
            }

            enemiesService.targetSelectMode--;

            vm.checkForDead(enemy);

          } else {
            fightLogService.pushToFightLog(enemy.name + " dodged the attack.");
            enemiesService.targetSelectMode--;
          }
          if (enemiesService.targetSelectMode === 0) {
            fightQueueService.endTurn();
          }
        }
      };

      vm.checkForDead = function(enemy) {
        if (enemy.stats.health <= 0) {
          enemy.status = 'dead';
          enemy.stats.health = 0;
          enemy.active = false;
          fightLogService.pushToFightLog(enemy.name + " has been defeated.");
          fightQueueService.removeFromPool(enemy.id);
          vm.updateActiveEnemies();
          vm.checkForVictory();
        }
      };

      vm.checkForVictory = function() {
        if (vm.enemyCount === 0) {
          progressTracker.stopFight();
          progressTracker.setBattleWon(true);
          fightLogService.pushToFightLog("Victorious");
          $timeout(function() {
            stateChangeService.setPlayerState("fightSummary");
          }, 1500);
        }
      };

      vm.updateActiveEnemies = function() {
        vm.enemyCount = 0;
        angular.forEach(vm.enemies, function(enemy) {
          if (enemy.status === 'alive') {
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
