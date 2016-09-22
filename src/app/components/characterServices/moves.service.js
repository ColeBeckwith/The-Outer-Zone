(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('movesService', movesService);

  movesService.$inject = ["alliesService", "enemiesService", "fightLogService", "fightQueueService"];

  function movesService(alliesService, enemiesService, fightLogService) {
    var vm = this;

    vm.selectedMove = "";

    vm.activeAllies = alliesService.activeAllies;

    vm.setSelectedMove = function(move) {
      vm.selectedMove = move;
    };

    vm.getSelectedMove = function() {
      return vm.selectedMove;
    };

    vm.enemyAttackAlly = function(enemy) {

      //TODO for Man of Stone create an if that checks for target priority and if not targets as normal.

      var target = Math.floor(Math.random() * vm.activeAllies.length);
      while (vm.activeAllies[target].status !== 'alive') {
        target = Math.floor(Math.random() * vm.activeAllies.length);
      }

      if (vm.activeAllies[target].stance === "Parrying") {
        fightLogService.pushToFightLog(vm.activeAllies[target].name + " blocked the attack.");
        vm.activeAllies[target].stanceCount--;
        if (vm.activeAllies[target].stanceCount === 0) {
          vm.activeAllies[target].stance = "Normal";
        }
        return;
      }

      if ((Math.random() * 6 * enemy.stats.speed) > (Math.random() * vm.activeAllies[target].stats.speed)) {
        var damage = Math.round(((1.7 + ((Math.random() * 6) / 10)) * enemy.stats.strength) - (.75 * vm.activeAllies[target].stats.defense));

        if (damage <= 0) {
          damage = 1;
        }

        alliesService.activeAllies[target].stats.health -= damage;
        fightLogService.pushToFightLog(enemy.name + " attacked " + vm.activeAllies[target].name + " for " + damage + " damage.");
        alliesService.checkForDeath(vm.activeAllies[target]);
        alliesService.updatePercentages(vm.activeAllies[target]);
      } else {
        fightLogService.pushToFightLog(vm.activeAllies[target].name + ' dodged ' + enemy.name + '\'s attack.')
      }
    };
  }
})();
