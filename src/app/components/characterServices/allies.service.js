(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('alliesService', alliesService);

  alliesService.$inject = ["stateChangeService", "progressTracker"];

  function alliesService(stateChangeService, progressTracker) {
    var vm = this;

    vm.allies = [
      {
        'name' : 'The Scarecrow',
        'id' : 101,
        'level' : 1,
        'exp' : 0,
        'status' : 'inactive',
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1
        },
        'builds' : [
          {
            'name' : 'Berserker',
            'description' : 'The Berserker fights with reckless abandon. He favors speed and brute force over accuracy.' +
            ' He isn\'t concerned with preservation, only destruction.',
            'baseStats' : {
                'maxHealth' : 250,
                'maxEnergy' : 40,
                'strength' : 103,
                'speed' : 106,
                'defense' : 101
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
                'defense' : 3
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
                'defense' : 6
              }
          }
        ]
      },
      {
        'name' : 'Dorothy',
        'id' : 102,
        'level' : 1,
        'status' : 'inactive',
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1
        },
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
              'defense' : 1
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
              'defense' : 3
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
              'defense' : 6
            }
        }
      ]
      },
      {
        'name' : 'The Lion',
        'id' : 103,
        'level' : 1,
        'status' : 'inactive',
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1
        },
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
              'defense' : 1
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
              'defense' : 3
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
              'defense' : 6
            }
          }
        ]
      },
      {
        'name' : 'Tin Man',
        'id' : 104,
        'level' : 1,
        'status' : 'inactive',
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1
        },
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
              'defense' : 1
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
              'defense' : 3
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
              'defense' : 6
            }
          }
          ]
      },
      {
        'name' : 'The Wizard',
        'id' : 105,
        'level' : 1,
        'status' : 'inactive',
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1
        },
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
              'defense' : 1
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
              'defense' : 3
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
              'defense' : 6
            }
          }
          ]
      }
    ];

    vm.getMoves = function(ally) {
      var moves = [];

      if (ally.id === 101) {
        //Scarecrow
        moves.push('Punch');

        if (ally.class === "Berserker") {
          moves.push('Fury');
          if (ally.level >= 5) {
            moves.push('Reckless Abandon')
          }
        }

        if (ally.class === "Brawler") {
          moves.push('Parry');
          if (ally.level >= 5) {
            moves.push('Knockout')
          }
        }

        if (ally.class === "Tank") {
          moves.push('Fortify');
          if (ally.level >= 5) {
            moves.push('Taunt')
          }
        }

      }

      if (ally.id === 104) {
        //Tin Man
        moves.push('Punch');

      }

      if (ally.id === 103) {
        //Lion
        moves.push('Shoot');
      }

      if (ally.id === 102) {
        //Dorothy

      }

      if (ally.id === 105) {
        //Wizard
      }

      ally.moves = moves;
    };

    vm.activateAlly = function(ally) {
      ally.status = 'alive';
      vm.getMoves(ally);
      vm.updateActives();
    };

    vm.levelUp = function(ally) {
      ally.level++;
      vm.getMoves(ally);
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
      ally.percentageEnergy = (ally.stats.energy/ally.stats.maxEnergy)*100 + '%';
    };

    vm.checkForDeath = function(ally) {
      vm.checkForDefeat();
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
        stateChangeService.setPlayerState('fightSummary');
      }
    };

    vm.restoreAll = function() {
      angular.forEach(vm.activeAllies, function(ally) {
        ally.status = 'alive';
        ally.stats.health = ally.stats.maxHealth;
        ally.stats.energy = ally.stats.maxEnergy;
        vm.updatePercentages(ally);
      })
    };

    vm.updateActives();
  }
})();
