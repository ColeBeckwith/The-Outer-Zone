(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('alliesService', alliesService);

  function alliesService(allyMovesService) {
    var vm = this;

    vm.allies = [
      {
        'name' : 'The Scarecrow',
        'level' : 1,
        'exp' : 0,
        'active' : true,
        'stats' : {
          'maxHealth' : 1,
          'maxEnergy' : 1,
          'strength' : 1,
          'speed' : 1,
          'defense' : 1
        },
        'moves' : allyMovesService.scarecrowMoves,
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
        'name' : 'Dorothy',
        'level' : 1,
        'active' : false,
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
        'level' : 1,
        'active' : false,
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
        'level' : 1,
        'active' : false,
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
        'level' : 1,
        'active' : false,
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

    vm.activateAlly = function(ally) {
      ally.active = true;
    };

    vm.deactivateAlly = function(ally) {
      ally.active = false;
    };
  }
})();
