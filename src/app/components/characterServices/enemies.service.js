(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('enemiesService', enemiesService);

  enemiesService.$inject = ["progressTracker"];

  function enemiesService(progressTracker) {
    var vm = this;
    vm.targetSelectMode = 0;

    vm.enemies = [
      [
        {
          'name' : 'Flying Monkey',
          'id' : 201,
          'status' : 'alive',
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
          'status' : 'alive',
          'stats' : {
            'maxHealth': 200,
            'health': 200,
            'speed': 403,
            'strength' : 48,
            'defense' : 4
          }
        },
        {
          'name' : 'Flying Monkey',
          'id' : 203,
          'status' : 'alive',
          'stats' : {
            'maxHealth': 30,
            'health': 30,
            'speed': 4,
            'strength' : 3,
            'defense' : 1
          }
        }
      ],
      [
        {
          'name' : 'Brick',
          'id' : 201,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 500,
            'health' : 500,
            'speed' : 400,
            'strength' : 3,
            'defense' : 1
          }
        }
      ]
    ];

    vm.getEnemies = function() {
      return vm.enemies[progressTracker.storyProgress]
    }
  }
})();
