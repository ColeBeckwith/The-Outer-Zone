(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('buildsService', buildsService);

  buildsService.$inject = ["progressTracker"];

  function buildsService(progressTracker) {
    var svc = this;

    svc.builds = [
      [
        {
          'name' : 'Bloodsport',
          'description' : 'The Bloodsport fights with reckless abandon. He favors speed and brute force over' +
          ' accuracy. He isn\'t concerned with preservation, only destruction.',
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
          'moves' : [['Fury', 1, 40, 70], ['Unchained', 5, 0, 0], ['Bloodbath', 10, 10, 0]],
          'icon' : 'fa fa-tint'


        },
        {
          'name' : 'Champion',
          'description' : 'The Champion engages in a careful chess match with his opponent. The Brawler is not' +
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
          'moves' : [['Parry', 1, 10, 0], ['Knockout', 5, 20, 0], ['Death Punch', 10, 10, 0]],
          'icon' : 'fa fa-trophy'
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
          'moves' : [['Fortify', 1, 10, 0], ['Absorb', 5, 10, 0], ['Man of Stone', 10, 10, 0]],
          'icon' : 'fa fa-shield'
        }
      ],
      [
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
          'moves' : [['Heal', 1, 30, 0], ['Energize', 5, 5, 0], ['Restore', 10, 10, 0]],
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
          'moves' : [['Charge', 1, 40, 0], ['Inspire', 5, 60, 0], ['Vanquish', 10, 100, 0]],
          'icon' : 'fa fa-flag'
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
          'moves' : [['Upgrade', 1, 10, 0], ['Hijack Weapons', 5, 10, 0], ['Build Turret', 10, 10, 0]],
          'icon' : 'fa fa-wrench'
        }
      ],
      [
        {
          'name' : 'Eliminator',
          'description' : 'The Eliminator watches the battle from a perch picking off targets one at a time.',
          'baseStats' : {
            'maxHealth' : 100,
            'maxEnergy' : 40,
            'strength' : 35,
            'speed' : 8,
            'defense' : 10,
            'intellect' : 15
          },
          'levelingSchedule' : {
            'health' : [2, 10],
            'energy' : [1, 10],
            'strength' : [1, 3],
            'speed' : [1, 1],
            'defense' : [1, 1],
            'intellect' : [1, 1]
          },
          'moves' : [['Headshot', 1], ['Perch', 5], ['Eagle Eye', 10]],
          'icon' : 'fa fa-target'
        },
        {
          'name' : 'Warlord',
          'description' : 'The Warlord brings a dangerous amount of lead to the party.',
          'baseStats' : {
            'maxHealth' : 250,
            'maxEnergy' : 50,
            'strength' : 20,
            'speed' : 12,
            'defense' : 20,
            'intellect' : 8
          },
          'levelingSchedule' : {
            'health' : [1, 20],
            'energy' : [2, 10],
            'strength' : [1, 3],
            'speed' : [2, 1],
            'defense' : [1, 1],
            'intellect' : [2, 1]
          },
          'moves' : [['Unload', 1], ['Arsenal', 5], ['Bullet Hell', 10]],
          'icon' : 'fa fa-bomb'
        },
        {
          'name' : 'Blink',
          'description' : 'If you see the Blink in battle, you probably don\'t have much time left.',
          'baseStats' : {
            'maxHealth' : 140,
            'maxEnergy' : 100,
            'strength' : 10,
            'speed' : 25,
            'defense' : 10,
            'intellect' : 25
          },
          'levelingSchedule' : {
            'health' : [2, 10],
            'energy' : [1, 10],
            'strength' : [1, 1],
            'speed' : [1, 2],
            'defense' : [2, 1],
            'intellect' : [1, 2]
          },
          'moves' : [['Last Dance', 1], ['Poison Tips', 5], ['Finishing Touch', 10]],
          'icon' : 'fa fa-eye-slash'
        }
      ],
      [
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
      ],
      [
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
    ];

    svc.getBuilds = function() {
      return svc.builds[progressTracker.newAlly];
    }

  }


})();
