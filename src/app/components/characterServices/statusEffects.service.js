(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('statusEffectsService', statusEffectsService);

  statusEffectsService.$inject = ["enemiesService", "alliesService", "fightLogService"];

  function statusEffectsService(enemiesService, alliesService, fightLogService) {
    var svc = this;

    svc.checkForStatusEffect = function(player, statusToCheck) {
      var hasStatus = 0;
      angular.forEach(player.statusEffects, function(status) {
        if (status.indexOf(statusToCheck) !== -1) {
          hasStatus++;
        }
      });
      return hasStatus;
    };

    svc.getStatus = function(player, statusToGet) {
      for (var i = 0; i < player.statusEffects.length; i++) {
        if (player.statusEffects[i].indexOf(statusToGet) !== -1) {
          return player.statusEffects[i];
        }
      }
    };

    svc.runEndTurnStatusEffects = function(player) {
      angular.forEach(player.statusEffects, function(status, index) {
        if (status[0] === 'Poisoned') {
          player.stats.health -= status[2];
          if (player.id >= 200) {
            enemiesService.checkForDead(player);
          } else {
            alliesService.checkForDeath(player);
          }
        }
        status[1]--;
        if (status[0] === 'Building Turret' && status[1] === 0) {
          player.stance = "Mounting Turret";
          player.stats.strength += player.stats.intellect;
          player.stats.defense += player.stats.intellect;
          fightLogService.pushToFightLog(player.name + '\'s turret is spinning up.')
        }
        if (status[1] === 0) {
          player.statusEffects.splice(index, 1)
        }
      })
    };
  }
})();
