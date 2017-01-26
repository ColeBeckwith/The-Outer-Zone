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
        if (status.name === statusToCheck) {
          hasStatus++;
        }
      });
      return hasStatus;
    };

    svc.getStatus = function(player, statusToGet) {
      for (var i = 0; i < player.statusEffects.length; i++) {
        if (player.statusEffects[i].name === statusToGet) {
          return player.statusEffects[i];
        }
      }
    };

    svc.runEndTurnStatusEffects = function(player) {
      angular.forEach(player.statusEffects, function(status, index) {

        if (status.name === 'Poisoned') {
          player.stats.health -= status.effectStrength;
          if (player.id >= 200) {
            enemiesService.checkForDead(player);
          } else {
            alliesService.checkForDeath(player);
          }
        }

        if(!status.infinite) {
            status.duration--;
        }

        if (status.name === 'Building Turret' && status.duration === 0) {
          player.stance = "Mounting Turret";
          player.stats.strength += player.stats.intellect;
          player.stats.defense += player.stats.intellect;
          fightLogService.pushToFightLog(player.name + '\'s turret is spinning up.')
        }

        if (status.duration === 0) {
          player.statusEffects.splice(index, 1)
        }
      })
    };
  }
})();
