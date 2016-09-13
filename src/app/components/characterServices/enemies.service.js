(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('enemiesService', enemiesService);

  function enemiesService(fightLogService) {
    var vm = this;
    vm.targetSelectMode = false;

    vm.enemies = [
      {
        'name' : 'Flying Monkey',
        'id' : 201,
        'active' : true,
        'stats' : {
          'maxHealth': 75,
          'health': 75,
          'speed': 4,
          'strength' : 3
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
          'strength' : 12
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
          'strength' : 3
        }
      }
    ];

    //TODO update percentages function here. SHould also run on initialization. 

    vm.allyAttackEnemy = function(enemy) {
      if (vm.targetSelectMode === true) {
        enemy.stats.health -= 100;
        //TODO should be attack value of currently queued Ally;
        fightLogService.pushToFightLog("Attacked " + enemy.name);
      };
      vm.targetSelectMode = false;
    };
  }
})();
