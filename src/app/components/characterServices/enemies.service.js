(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('enemiesService', enemiesService);

  function enemiesService(fightLogService) {
    var vm = this;
    vm.targetSelectMode = 0;

    vm.enemies = [
      {
        'name' : 'Flying Monkey',
        'id' : 201,
        'active' : true,
        'stats' : {
          'maxHealth': 75,
          'health': 75,
          'speed': 4,
          'strength' : 3,
          'defense' : 1
        }
      },
      {
        'name' : 'Witch',
        'id' : 202,
        'active' : true,
        'stats' : {
          'maxHealth': 1000,
          'health': 1000,
          'speed': 3,
          'strength' : 12,
          'defense' : 4
        }
      },
      {
        'name' : 'Flying Monkey',
        'id' : 203,
        'active' : true,
        'stats' : {
          'maxHealth': 75,
          'health': 75,
          'speed': 4,
          'strength' : 3,
          'defense' : 1
        }
      }
    ];


    vm.allyAttackEnemy = function(enemy, damage) {
      if (vm.targetSelectMode > 0) {
        var trueDamage = damage - (enemy.stats.defense * (Math.floor(Math.random() * 4) + 1));
        if (trueDamage <= 0) {
          trueDamage = 1;
        }
        enemy.stats.health -= trueDamage;
        fightLogService.pushToFightLog("Attacked " + enemy.name + " for " + trueDamage + " damage.");
      }
      vm.targetSelectMode--;
    };
  }
})();
