(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('enemiesService', enemiesService);

  enemiesService.$inject = ["progressTracker", "boardManager"];

  function enemiesService(progressTracker, boardManager) {
    var svc = this;

    svc.getEnemiesForStory = getEnemiesForStory;
    svc.setCurrentEnemies = setCurrentEnemies;
    svc.getCurrentEnemies = getCurrentEnemies;
    svc.updateHealthBarType = updateHealthBarType;
    svc.getExperience = getExperience;
    svc.getMoney = getMoney;
    svc.restoreAll = restoreAll;
    svc.checkForDead = checkForDead;
    svc.checkForVictory = checkForVictory;
    svc.selectNumberOfTargets = selectNumberOfTargets;
    svc.getCardWidth = getCardWidth;
    svc.deliverRegularDamage = deliverRegularDamage;

    activate();

    function activate() {
      // TODO these use a copy for now to prevent the original data from being changed, but they should eventually
      // have baseStats as well.
      svc.enemies = [
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
              'speed' : 10,
              'strength' : 13,
              'defense' : 13,
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
              'strength' : 16,
              'defense' : 10,
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

      svc.targetSelectMode = 0;

      svc.currentEnemySet = null;
    }

    function getEnemiesForStory() {
      angular.forEach (svc.enemies[progressTracker.storyProgress], function(enemy) {
        svc.updateHealthBarType(enemy);
      });
      return angular.copy(svc.enemies[progressTracker.storyProgress]);
    }

    function setCurrentEnemies(set) {
      svc.currentEnemySet = set;
    }

    function getCurrentEnemies() {
      return svc.currentEnemySet;
    }

    function updateHealthBarType(enemy) {
      if ((enemy.stats.health/enemy.stats.maxHealth) > .5) {
        enemy.healthBarType = 'success'
      } else if ((enemy.stats.health/enemy.stats.maxHealth) > .25) {
        enemy.healthBarType = 'warning'
      } else {
        enemy.healthBarType = 'danger'
      }
    }

    function getExperience() {
      var exp = 0;
      angular.forEach(svc.currentEnemySet, function(enemy) {
        exp += enemy.experience
      });
      return exp;
    }

    function getMoney() {
      var money = 0;
      angular.forEach(svc.currentEnemySet, function(enemy) {
        money += enemy.money
      });
      return money;
    }

    function restoreAll() {
      angular.forEach(svc.currentEnemySet, function(enemy) {
        enemy.stats.health = enemy.stats.maxHealth;
        enemy.status = 'alive';
        enemy.statusEffects = [];
        enemy.healthBarType = 'success';
      })
    }

    function checkForDead(enemy) {
      if (enemy.stats.health <= 0) {
        enemy.status = 'dead';
        enemy.stats.health = 0;
        enemy.active = false;
        svc.getCardWidth();
        boardManager.vacateCell(enemy.coordinates.x, enemy.coordinates.y);
        return true;
      }
      return false;
    }

    function checkForVictory() {
      for (var i = 0; i < svc.currentEnemySet.length; i++) {
        if (svc.currentEnemySet[i].status !== 'dead') {
          return false;
        }
      }
      return true;
    }

    function selectNumberOfTargets(number) {
      svc.targetSelectMode = number;
    }

    function getCardWidth() {
      var livingEnemies = 0;
      for (var i = 0; i < svc.currentEnemySet.length; i++) {
        if (svc.currentEnemySet[i].status !== 'dead') {
          livingEnemies++;
        }
      }
      svc.cardWidth = 90 / livingEnemies + '%';
    }

    function deliverRegularDamage(enemy, power) {
      var damage = Math.round(((1.7 + ((Math.random() * 6) / 10)) * power) - (.75 * enemy.stats.defense));
      if (damage <= 0) {
        damage = 0;
      }
      enemy.stats.health -= damage;
    }

  }
})();
