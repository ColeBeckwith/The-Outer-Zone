(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('enemiesService', enemiesService);

  function enemiesService() {
    var vm = this;

    vm.enemies = [
      {
        'name' : 'Flying Monkey',
        'id' : 201,
        'active' : true,
        'stats' : {
          'maxHealth': 75,
          'health': 75,
          'speed': 4,
          'strength' : 7
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
          'strength' : 7
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
          'strength' : 7
        }
      }
    ]
  }
})();
