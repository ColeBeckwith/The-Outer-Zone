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
          'name' : 'Clive',
          'id' : 201,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 50,
            'health' : 50,
            'speed' : 12,
            'strength' : 12,
            'defense' : 12,
            'intellect' : 12
          },
          'experience' : 600
        }
      ],


      [
        {
          'name' : 'Wolf',
          'id' : 201,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 11,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          'experience' : 100
        },
        {
          'name' : 'Wolf',
          'id' : 202,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 11,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          'experience' : 100
        },
        {
          'name' : 'Wolf',
          'id' : 203,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 11,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          'experience' : 100
        },
        {
          'name' : 'Wolf',
          'id' : 204,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 11,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          'experience' : 100
        }
      ],

      [
        {
          'name' : 'Thug',
          'id' : 201,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 100,
            'health' : 100
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
          },
          'experience' : 100
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
          },
          'experience' : 100
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
          },
          'experience' : 100
        }
      ]
    ];

    vm.getEnemies = function() {
      return vm.enemies[progressTracker.storyProgress]
    };

    vm.restoreAll = function() {
      angular.forEach(vm.enemies[progressTracker.storyProgress], function(enemy) {
        enemy.stats.health = enemy.stats.maxHealth;
        enemy.status = 'alive';
        enemy.statusEffects = [];
      })
    };

    vm.targetSelectMode = 0;

    vm.selectNumberOfTargets = function(number) {
      vm.targetSelectMode = number;
    };
  }
})();
