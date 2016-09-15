(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('enemiesService', enemiesService);

  enemiesService.$inject = ["progressTracker"];

  function enemiesService(progressTracker) {
    var vm = this;

    vm.enemies = [
      [
        {
          'name' : 'Brick',
          'id' : 201,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 500,
            'health' : 500,
            'speed' : 15,
            'strength' : 30,
            'defense' : 20
          }
        }
      ],
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
            'speed': 12,
            'strength' : 35,
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
      ]
    ];

    vm.getEnemies = function() {
      return vm.enemies[progressTracker.storyProgress]
    };

    vm.restoreAll = function() {
      angular.forEach(vm.enemies[progressTracker.storyProgress], function(enemy) {
        enemy.stats.health = enemy.stats.maxHealth;
      })
    };

    vm.targetSelectMode = 0;

    vm.selectNumberOfTargets = function(number) {
      vm.targetSelectMode = number;
    };
  }
})();
