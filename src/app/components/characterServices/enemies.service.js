(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('enemiesService', enemiesService);

  function enemiesService() {
    var vm = this;
    vm.targetSelectMode = 0;

    vm.enemies = [
      {
        'name' : 'Flying Monkey',
        'id' : 201,
        'active' : true,
        'stats' : {
          'maxHealth': 30,
          'health': 30,
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
          'maxHealth': 200,
          'health': 200,
          'speed': 3,
          'strength' : 8,
          'defense' : 4
        }
      },
      {
        'name' : 'Flying Monkey',
        'id' : 203,
        'active' : true,
        'stats' : {
          'maxHealth': 30,
          'health': 30,
          'speed': 4,
          'strength' : 3,
          'defense' : 1
        }
      }
    ];
  }
})();
