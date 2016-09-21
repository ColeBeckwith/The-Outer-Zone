(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('alliesService', alliesService);

  alliesService.$inject = ["stateChangeService", "progressTracker", "fightLogService", '$timeout', 'inventoryService'];

  function alliesService(stateChangeService, progressTracker, fightLogService, $timeout, inventoryService) {
    var vm = this;

    vm.allies = [
      {
        'name' : 'Scarecrow',
        'id' : 101,
        'level' : 1,
        'exp' : 0,
        'expNeeded' : 500,
        'status' : 'alive',
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1,
          'intellect' : 1
        },
        'equipment' : [],
        'builds' : [
          {
            'name' : 'Berserker',
            'description' : 'The Berserker fights with reckless abandon. He favors speed and brute force over accuracy.' +
            ' He isn\'t concerned with preservation, only destruction.',
            'baseStats' : {
              'maxHealth' : 150,
              'maxEnergy' : 40,
              'strength' : 16,
              'speed' : 18,
              'defense' : 8,
              'intellect' : 8
            },
            'levelingSchedule' : {
              'health' : [1, 10],
              'energy' : [2, 10],
              'strength' : [1, 1],
              'speed' : [1, 2],
              'defense' : [3, 1],
              'intellect' : [2, 1]
            },
            'moves' : [['Fury', 1], ['Unchained', 5], ['Bloodbath', 10]],
            'icon' : 'fa fa-bolt'
            //TODO would be cool to eventually add a passive ability to each class.

          },
          {
            'name' : 'Brawler',
            'description' : 'The Brawler engages in a careful chess match with his opponent. The Brawler is not' +
            ' concerned with who appears to be winning the fight. He always deals the final blow.',
            'baseStats' : {
              'maxHealth' : 200,
              'maxEnergy' : 20,
              'strength' : 12,
              'speed' : 12,
              'defense' : 12,
              'intellect' : 14
            },
            'levelingSchedule' : {
              'health' : [1, 10],
              'energy' : [1, 5],
              'strength' : [2, 1],
              'speed' : [2, 1],
              'defense' : [1, 1],
              'intellect' : [1, 2]
            },
            'moves' : [['Parry', 1], ['Knockout', 5], ['Death Punch', 10]],
            'icon' : 'fa fa-hand-rock-o'
          },
          {
            'name' : 'Tank',
            'description' : 'The Tank is built on pure endurance. By minimizing the damage taken he wears down his' +
            ' opponents and finishes them off in their weakened state.',
            'baseStats' : {
              'maxHealth' : 240,
              'maxEnergy' : 10,
              'strength' : 12,
              'speed' : 10,
              'defense' : 20,
              'intellect' : 8
            },
            'levelingSchedule' : {
              'health' : [1, 30],
              'energy' : [2, 10],
              'strength' : [1, 1],
              'speed' : [3, 1],
              'defense' : [1, 3],
              'intellect' : [2, 1]
            },
            'moves' : [['Fortify', 1], ['Absorb', 5], ['Man of Stone', 10]],
            'icon' : 'fa fa-shield'
          }
        ]
      },
      {
        'name' : 'D. Taylor',
        'id' : 102,
        'level' : 1,
        'exp' : 0,
        'expNeeded' : 500,
        'status' : 'inactive',
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1,
          'intellect' : 1
        },
        'equipment' : [],
        'builds' : [
          {
            'name' : 'Medic',
            'description' : 'The Medic sticks to the back. She prefers to keep her allies healthy while they deal' +
            ' with the enemy.',
            'baseStats' : {
              'maxHealth' : 160,
              'maxEnergy' : 40,
              'strength' : 8,
              'speed' : 15,
              'defense' : 9,
              'intellect' : 18
            },
            'levelingSchedule' : {
              'health' : [1, 10],
              'energy' : [2, 10],
              'strength' : [2, 1],
              'speed' : [1, 1],
              'defense' : [2, 1],
              'intellect' : [1, 2]
            },
            'moves' : [['Heal', 1], ['Energize', 5], ['Restore', 10]],
            'icon' : 'fa fa-medkit'
          },
          {
            'name' : 'Commander',
            'description' : 'The Commander leads the group. She isn\'t always the most powerful opponent on the' +
            ' field, but her presence inspires those around her.',
            'baseStats' : {
              'maxHealth' : 220,
              'maxEnergy' : 60,
              'strength' : 10,
              'speed' : 10,
              'defense' : 10,
              'intellect' : 15
            },
            'levelingSchedule' : {
              'health' : [1, 10],
              'energy' : [1, 20],
              'strength' : [2, 1],
              'speed' : [1, 1],
              'defense' : [2, 1],
              'intellect' : [1, 1]
            },
            'moves' : [['Charge', 1], ['Inspire', 5], ['Vanquish', 10]],
            'icon' : 'fa fa-users'
          },
          {
            'name' : 'Engineer',
            'description' : 'The Engineer lives and dies by her own preparation. When she\'s aware of the enemy,' +
            ' there\'s no stopping her. Catching her off guard is another story.',
            'baseStats' : {
              'maxHealth' : 180,
              'maxEnergy' : 10,
              'strength' : 6,
              'speed' : 15,
              'defense' : 10,
              'intellect' : 20
            },
            'levelingSchedule' : {
              'health' : [2, 10],
              'energy' : [2, 10],
              'strength' : [2, 1],
              'speed' : [2, 1],
              'defense' : [2, 1],
              'intellect' : [1, 4]
            },
            'moves' : [['Upgrade', 1], ['Hijack Weapons', 5], ['Build Turret', 10]],
            'icon' : 'fa fa-wrench'
        }
      ]
      },
      {
        'name' : 'The Lion',
        'id' : 103,
        'level' : 1,
        'exp' : 0,
        'expNeeded' : 500,
        'status' : 'inactive',
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1,
          'intellect' : 1
        },
        'equipment' : [],
        'builds' : [
          {
            'name' : 'Berserker',
            'description' : 'The Berserker fights with reckless abandon. He favors speed and brute force over accuracy.' +
            ' He isn\'t concerned with preservation, only destruction.',
            'baseStats' : {
              'maxHealth' : 250,
              'maxEnergy' : 40,
              'strength' : 3,
              'speed' : 7,
              'defense' : 1,
              'intellect' : 1
            }
          },
          {
            'name' : 'Brawler',
            'description' : 'The Brawler engages in a careful chess match with his opponent. The Brawler is not' +
            ' concerned with who appears to be winning the fight. He always deals the final blow.',
            'baseStats' : {
              'maxHealth' : 350,
              'maxEnergy' : 20,
              'strength' : 3,
              'speed' : 3,
              'defense' : 3,
              'intellect' : 1
            }
          },
          {
            'name' : 'Tank',
            'description' : 'The Tank is built on pure endurance. By minimizing the damage taken he wears down his' +
            ' opponents and finishes them off in their weakened state.',
            'baseStats' : {
              'maxHealth' : 500,
              'maxEnergy' : 10,
              'strength' : 3,
              'speed' : 1,
              'defense' : 6,
              'intellect' : 1
            }
          }
        ]
      },
      {
        'name' : 'Tin Man',
        'id' : 104,
        'level' : 1,
        'exp' : 0,
        'expNeeded' : 500,
        'status' : 'inactive',
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1,
          'intellect' : 1
        },
        'equipment' : [],
        'builds' : [
          {
            'name' : 'Berserker',
            'description' : 'The Berserker fights with reckless abandon. He favors speed and brute force over accuracy.' +
            ' He isn\'t concerned with preservation, only destruction.',
            'baseStats' : {
              'maxHealth' : 250,
              'maxEnergy' : 40,
              'strength' : 3,
              'speed' : 7,
              'defense' : 1,
              'intellect' : 1
            }
          },
          {
            'name' : 'Brawler',
            'description' : 'The Brawler engages in a careful chess match with his opponent. The Brawler is not' +
            ' concerned with who appears to be winning the fight. He always deals the final blow.',
            'baseStats' : {
              'maxHealth' : 350,
              'maxEnergy' : 20,
              'strength' : 3,
              'speed' : 3,
              'defense' : 3,
              'intellect' : 1
            }
          },
          {
            'name' : 'Tank',
            'description' : 'The Tank is built on pure endurance. By minimizing the damage taken he wears down his' +
            ' opponents and finishes them off in their weakened state.',
            'baseStats' : {
              'maxHealth' : 500,
              'maxEnergy' : 10,
              'strength' : 3,
              'speed' : 1,
              'defense' : 6,
              'intellect' : 1
            }
          }
          ]
      },
      {
        'name' : 'The Wizard',
        'id' : 105,
        'level' : 1,
        'exp' : 0,
        'expNeeded' : 500,
        'status' : 'inactive',
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1,
          'intellect' : 1
        },
        'equipment' : [],
        'builds' : [
          {
            'name' : 'Berserker',
            'description' : 'The Berserker fights with reckless abandon. He favors speed and brute force over accuracy.' +
            ' He isn\'t concerned with preservation, only destruction.',
            'baseStats' : {
              'maxHealth' : 250,
              'maxEnergy' : 40,
              'strength' : 3,
              'speed' : 7,
              'defense' : 1,
              'intellect' : 1
            }
          },
          {
            'name' : 'Brawler',
            'description' : 'The Brawler engages in a careful chess match with his opponent. The Brawler is not' +
            ' concerned with who appears to be winning the fight. He always deals the final blow.',
            'baseStats' : {
              'maxHealth' : 350,
              'maxEnergy' : 20,
              'strength' : 3,
              'speed' : 3,
              'defense' : 3,
              'intellect' : 1
            }
          },
          {
            'name' : 'Tank',
            'description' : 'The Tank is built on pure endurance. By minimizing the damage taken he wears down his' +
            ' opponents and finishes them off in their weakened state.',
            'baseStats' : {
              'maxHealth' : 500,
              'maxEnergy' : 10,
              'strength' : 3,
              'speed' : 1,
              'defense' : 6,
              'intellect' : 1
            }
          }
          ]
      }
    ];

    vm.activateAlly = function(ally) {
      ally.status = 'alive';
      vm.updateActives();
    };

    vm.deactivateAlly = function(ally) {
      ally.status = 'inactive';
      vm.updateActives();
    };

    vm.updateActives = function() {
      vm.activeAllies = [];
      angular.forEach(vm.allies, function(ally) {
        if (ally.status !== 'inactive') {
          vm.activeAllies.push(ally);
        }
      });
      angular.forEach(vm.activeAllies, function(ally) {
        vm.updatePercentages(ally);
      });
    };

    vm.updatePercentages = function(ally) {
      ally.percentageHealth = (ally.stats.health/ally.stats.maxHealth)*100 + '%';
    };

    vm.distributeExperience = function(exp) {
      angular.forEach(vm.activeAllies, function(ally) {
        ally.exp += Math.round((exp/vm.activeAllies.length)*((100 + ally.stats.intellect)/100));
        if (ally.exp >= ally.expNeeded) {
          $timeout(function() {
            vm.levelUp(ally);
          }, 1200);
        }
      })
    };

    vm.levelUp = function(ally) {
      ally.leveledUp = true;
      ally.exp -= ally.expNeeded;
      ally.expNeeded *= 2.6;
      ally.level++;
      if (ally.level % ally.levelingSchedule.strength[0] === 0) {
        ally.baseStats.strength += ally.levelingSchedule.strength[1];
      }
      if (ally.level % ally.levelingSchedule.health[0] === 0) {
        ally.baseStats.maxHealth += ally.levelingSchedule.health[1];
      }
      if (ally.level % ally.levelingSchedule.speed[0] === 0) {
        ally.baseStats.speed += ally.levelingSchedule.speed[1];
      }
      if (ally.level % ally.levelingSchedule.defense[0] === 0) {
        ally.baseStats.defense += ally.levelingSchedule.defense[1]
      }
      if (ally.level % ally.levelingSchedule.energy[0] === 0) {
        ally.baseStats.maxEnergy += ally.levelingSchedule.energy[1];
      }
      if (ally.level % ally.levelingSchedule.intellect[0] === 0) {
        ally.baseStats.intellect += ally.levelingSchedule.intellect[1];
      }
    };

    vm.checkForDeath = function(ally) {
      if (ally.stats.health <= 0) {
        ally.stats.health = 0;
        ally.status = 'dead';
        vm.checkForDefeat();
      }
    };

    vm.checkForDefeat = function() {
      var livingAllies = 0;
      angular.forEach(vm.activeAllies, function(ally) {
        if (ally.status === 'alive') {
          livingAllies++;
        }
      });
      if (livingAllies === 0) {
        progressTracker.stopFight();
        fightLogService.pushToFightLog('Defeated');
        $timeout(function() {
          stateChangeService.setPlayerState('fightSummary');
        }, 2500)
      }
    };

    vm.getBaseStats = function(id) {
      var baseStats = [];
      for (var i = 0; i < vm.allies.length; i++) {
        if (vm.allies[i].id === id) {
          baseStats = vm.allies[i].baseStats;
        }
      }
      return baseStats
    };

    vm.restoreAll = function() {
      angular.forEach(vm.activeAllies, function(ally) {
        ally.stats = angular.copy(ally.baseStats);
        ally.status = 'alive';
        ally.stance = 'Normal';
        ally.statusEffects = [];
        ally.stanceCount = 0;
        ally.stats.health = ally.stats.maxHealth;
        ally.stats.energy = ally.stats.maxEnergy;
        vm.updatePercentages(ally);
      });
    };

    vm.equipToAlly = function(ally, item) {
      angular.forEach(ally.equipment, function(piece, index) {
        if (piece.type === item.type) {
          vm.removeEquipment(ally, piece, index);
        }
      });
      ally.baseStats.maxHealth += item.stats.health;
      ally.baseStats.maxEnergy += item.stats.energy;
      ally.baseStats.strength += item.stats.strength;
      ally.baseStats.defense += item.stats.defense;
      ally.baseStats.speed += item.stats.speed;
      ally.equipment.push(item);
    };

    vm.removeEquipment = function(ally, piece, index) {
      ally.baseStats.maxHealth -= piece.stats.health;
      ally.baseStats.maxEnergy -= piece.stats.energy;
      ally.baseStats.strength -= piece.stats.strength;
      ally.baseStats.defense -= piece.stats.defense;
      ally.baseStats.speed -= piece.stats.speed;
      ally.equipment.splice(index, 1);
      inventoryService.addToInventory([piece]);
    };

    vm.updateActives();
  }
})();
