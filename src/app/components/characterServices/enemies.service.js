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
          'experience' : 60,
          'loot' : [
            {
              'name' : 'Clive\'s Hand Wraps',
              'description' : '',
              'characterReq' : 101,
              'classReq' : 'None',
              'lvlReq' : 1,
              'rarity' : 'Uncommon',
              'worth' : 5,
              'type' : 'Arms',
              'stats' : {
                'health': 10,
                'energy' : 0,
                'strength': 2,
                'defense': 1,
                'speed': 0,
                'intellect': 0
              }
            }
          ],
          'money' : 15
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
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          'experience' : 20,
          'money' : 0
        },
        {
          'name' : 'Wolf',
          'id' : 202,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          'experience' : 20,
          'money' : 0
        },
        {
          'name' : 'Wolf',
          'id' : 203,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          'experience' : 20,
          'money' : 0
        },
        {
          'name' : 'Wolf',
          'id' : 204,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          'experience' : 20,
          'money' : 0
        }
      ],

      [
        {
        'name' : 'Thug',
        'id' : 201,
        'status' : 'alive',
        'stats' : {
          'maxHealth' : 150,
          'health' : 150,
          'speed' : 5,
          'strength' : 12,
          'defense' : 10,
          'intellect' : 8
        },
        'experience' : 190,
        'money' : 200
        },
        {
          'name' : 'Thug',
          'id' : 202,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 150,
            'health' : 150,
            'speed' : 9,
            'strength' : 14,
            'defense' : 8,
            'intellect' : 8
          },
          'experience' : 190,
          'money' : 200
        }
      ],

      [
        {
          'name' : 'Bodyguard',
          'id' : 201,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 70,
            'health' : 70,
            'speed' : 5,
            'strength' : 10,
            'defense' : 8,
            'intellect' : 8
          },
          'experience' : 40,
          'money' : 0
        },
        {
          'name' : 'Bodyguard',
          'id' : 202,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 80,
            'health' : 80,
            'speed' : 5,
            'strength' : 16,
            'defense' : 8,
            'intellect' : 8
          },
          'experience' : 40,
          'money' : 0
        },
        {
          'name' : 'Alex Wright',
          'id' : 203,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 250,
            'health' : 250,
            'speed' : 7,
            'strength' : 10,
            'defense' : 10,
            'intellect' : 18
          },
          'experience' : 250,
          'money' : 1000,
          'loot' : [
            {
              'name' : 'Wright\'s Hand Cannon',
              'description' : '',
              'characterReq' : 102,
              'classReq' : 'None',
              'lvlReq' : 2,
              'rarity' : 'Rare',
              'worth' : 560,
              'type' : 'Weapon',
              'stats' : {
                'health': 0,
                'energy' : 0,
                'strength': 2,
                'defense': 0,
                'speed': 2,
                'intellect': 3
              }
            }
          ]
        },
        {
          'name' : 'Bodyguard',
          'id' : 204,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 80,
            'health' : 80,
            'speed' : 4,
            'strength' : 16,
            'defense' : 8,
            'intellect' : 8
          },
          'experience' : 40,
          'money' : 0
        },
        {
          'name' : 'Bodyguard',
          'id' : 205,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 90,
            'health' : 90,
            'speed' : 6,
            'strength' : 11,
            'defense' : 8,
            'intellect' : 8
          },
          'experience' : 40,
          'money' : 0
        }
      ],

      [
        {
          'name' : 'Tank',
          'id' : 201,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 150,
            'health' : 150,
            'speed' : 5,
            'strength' : 12,
            'defense' : 20,
            'intellect' : 4
          },
          'experience' : 60,
          'money' : 0
        },
        {
          'name' : 'Brawler',
          'id' : 202,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 70,
            'health' : 70,
            'speed' : 10,
            'strength' : 10,
            'defense' : 10,
            'intellect' : 10
          },
          'experience' : 60,
          'money' : 0
        },
        {
          'name' : 'Berserker',
          'id' : 203,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 50,
            'health' : 50,
            'speed' : 18,
            'strength' : 10,
            'defense' : 6,
            'intellect' : 6
          },
          'experience' : 60,
          'money' : 0
        }
      ],

      [
        {
          'name' : 'Nix',
          'id' : 201,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 300,
            'health' : 300,
            'speed' : 18,
            'strength' : 21,
            'defense' : 20,
            'intellect' : 20
          },
          'experience' : 260,
          'money' : 0,
          'loot' : [
            {
              'name' : 'Championship Belt',
              'description' : '',
              'characterReq' : 101,
              'classReq' : 'None',
              'lvlReq' : 2,
              'rarity' : 'Rare',
              'worth' : 5000,
              'type' : 'Body',
              'stats' : {
                'health': 15,
                'energy' : 0,
                'strength': 2,
                'defense': 3,
                'speed': 2,
                'intellect': 0
              }
            }
          ]
        },
        {
          'name' : 'Damien',
          'id' : 202,
          'status' : 'alive',
          'stats' : {
            'maxHealth' : 800,
            'health' : 800,
            'speed' : 4,
            'strength' : 4,
            'defense' : 4,
            'intellect' : 4
          },
          'experience' : 140,
          'money' : 500
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

    vm.getExperience = function() {
      var exp = 0;
      angular.forEach(vm.enemies[progressTracker.storyProgress], function(enemy) {
        exp += enemy.experience
      });
      return exp;
    };

    vm.getMoney = function() {
      var money = 0;
      angular.forEach(vm.enemies[progressTracker.storyProgress], function(enemy) {
        money += enemy.money
      });
      return money;
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
