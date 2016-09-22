(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('lootService', lootService);

  lootService.$inject = ['enemiesService'];

  function lootService(enemiesService) {
    var svc = this;

    svc.lootId = 0;

    svc.commons = [
      {
        'name' : 'Leather Gloves',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 15,
        'type' : 'Arms',
        'stats' : {
          'health': 10,
          'energy': 0,
          'strength': 0,
          'defense': 0,
          'speed': 0,
          'intellect': 0
        }
      },
      {
        'name' : 'Baseball Bat',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 15,
        'type' : 'Weapon',
        'stats' : {
          'health': 0,
          'energy': 0,
          'strength': 2,
          'defense': 0,
          'speed': 1,
          'intellect': 0
        }
      },
      {
        'name' : 'Steel Toed Boots',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 25,
        'type' : 'Legs',
        'stats' : {
          'health': 10,
          'energy': 0,
          'strength': 0,
          'defense': 1,
          'speed': 0,
          'intellect': 0
        }
      },
      {
        'name' : '2X4',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 2,
        'type' : 'Weapon',
        'stats' : {
          'health': 0,
          'energy': 0,
          'strength': 1,
          'defense': 1,
          'speed': 0,
          'intellect': 0
        }
      },
      {
        'name' : 'Baseball Cap',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 18,
        'type' : 'Head',
        'stats' : {
          'health': 0,
          'energy': 0,
          'strength': 0,
          'defense': 0,
          'speed': 1,
          'intellect': 1
        }
      },
      {
        'name' : 'Pipe',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 6,
        'type' : 'Weapon',
        'stats' : {
          'health': 0,
          'energy': 5,
          'strength': 0,
          'defense': 0,
          'speed': 1,
          'intellect': 0
        }
      },
      {
        'name' : 'Switchblade',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 18,
        'type' : 'Weapon',
        'stats' : {
          'health': 0,
          'energy': 0,
          'strength': 2,
          'defense': 0,
          'speed': 0,
          'intellect': 0
        }
      },
      {
        'name' : 'Sunglasses',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 50,
        'type' : 'Head',
        'stats' : {
          'health': 0,
          'energy': 0,
          'strength': 0,
          'defense': 0,
          'speed': 0,
          'intellect': 0
        }
      },
      {
        'name' : 'Reading Glasses',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 40,
        'type' : 'Head',
        'stats' : {
          'health': 0,
          'energy': 0,
          'strength': 0,
          'defense': 0,
          'speed': 0,
          'intellect': 1
        }
      },
      {
        'name' : 'Whiskey',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 32,
        'type' : 'Item',
        'stats' : {
          'health': 10,
          'energy': 0,
          'strength': 1,
          'defense': 2,
          'speed': 0,
          'intellect': -1
        }
      },
      {
        'name' : 'Yellow',
        'description' : 'Follow it.',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 60,
        'type' : 'Item',
        'stats' : {
          'health': -20,
          'energy': 10,
          'strength': 4,
          'defense': -3,
          'speed': 5,
          'intellect': -3
        }
      },
      {
        'name' : 'Biker\'s Jacket',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 70,
        'type' : 'Body',
        'stats' : {
          'health': 20,
          'energy': 0,
          'strength': 0,
          'defense': 0,
          'speed': 0,
          'intellect': 0
        }
      },
      {
        'name' : 'Running Shorts',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 45,
        'type' : 'Legs',
        'stats' : {
          'health': 0,
          'energy': 10,
          'strength': 0,
          'defense': 0,
          'speed': 2,
          'intellect': 0
        }
      },
      {
        'name' : 'Broken Bottle',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 1,
        'type' : 'Weapon',
        'stats' : {
          'health': 0,
          'energy': 0,
          'strength': 1,
          'defense': 0,
          'speed': 1,
          'intellect': 0
        }
      },
      {
        'name' : 'Tennis Shoes',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 80,
        'type' : 'Legs',
        'stats' : {
          'health': 0,
          'energy': 0,
          'strength': 0,
          'defense': 0,
          'speed': 3,
          'intellect': 0
        }
      }
    ];

    svc.uncommons = [
      {
        'name' : 'Brass Knuckles',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 3,
        'rarity' : 'Uncommon',
        'worth' : 300,
        'type' : 'Arms',
        'stats' : {
          'health': 10,
          'energy': 0,
          'strength': 3,
          'defense': 0,
          'speed': 1,
          'intellect': 0
        }
      },
      {
        'name' : '9mm',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 3,
        'rarity' : 'Uncommon',
        'worth' : 180,
        'type' : 'Weapon',
        'stats' : {
          'health': 0,
          'energy': 0,
          'strength': 2,
          'defense': 0,
          'speed': 3,
          'intellect': 0
        }
      },
      {
        'name' : 'Motorcycle Helmet',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 2,
        'rarity' : 'Uncommon',
        'worth' : 180,
        'type' : 'Head',
        'stats' : {
          'health': 40,
          'energy': 0,
          'strength': 0,
          'defense': 3,
          'speed': 0,
          'intellect': 0
        }
      }
    ];

    svc.rares = [
      {
        'name' : '.44 Magnum',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Rare',
        'worth' : 1800,
        'type' : 'Weapon',
        'stats' : {
          'health': 0,
          'energy': 10,
          'strength': 8,
          'defense': 0,
          'speed': 7,
          'intellect': 0
        }
      }
    ];

    svc.epics = [
      {
        'name' : 'Singularity Energy Katana',
        'description' : 'Straight from the lab.',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 12,
        'rarity' : 'Epic',
        'worth' : 18000,
        'type' : 'Weapon',
        'stats' : {
          'health': 0,
          'energy': 30,
          'strength': 5,
          'defense': 3,
          'speed': 11,
          'intellect': 0
        }
      },
      {
        'name' : 'Singularity Optics Tool',
        'description' : '',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 12,
        'rarity' : 'Epic',
        'worth' : 25000,
        'type' : 'Head',
        'stats' : {
          'health': 0,
          'energy': 20,
          'strength': 0,
          'defense': 6,
          'speed': 3,
          'intellect': 5
        }
      }
    ];

    svc.gimmeTheLoot = function() {
      var loot = [];
      var exp = enemiesService.getExperience();
      var chance = Math.random() * 100000 + exp;

      if (chance > 99910) {
        loot.push(svc.epics[Math.floor(Math.random()*svc.epics.length)]);
        loot.push(svc.rares[Math.floor(Math.random()*svc.rares.length)]);
      } else if (chance > 99800) {
        loot.push(svc.epics[Math.floor(Math.random()*svc.epics.length)])
      } else if (chance > 99400) {
        loot.push(svc.rares[Math.floor(Math.random()*svc.rares.length)]);
        loot.push(svc.rares[Math.floor(Math.random()*svc.rares.length)])
      } else if (chance > 98000) {
        loot.push(svc.rares[Math.floor(Math.random()*svc.rares.length)]);
        loot.push(svc.uncommons[Math.floor(Math.random()*svc.uncommons.length)])
      } else if (chance > 90000) {
        loot.push(svc.uncommons[Math.floor(Math.random()*svc.uncommons.length)])
      } else if (chance > 70000) {
        loot.push(svc.commons[Math.floor(Math.random()*svc.commons.length)]);
        loot.push(svc.commons[Math.floor(Math.random()*svc.commons.length)])
      } else if (chance > 50000) {
        loot.push(svc.commons[Math.floor(Math.random()*svc.commons.length)])
      }

      angular.forEach(enemiesService.getEnemies(), function(enemy) {
        angular.forEach(enemy.loot, function(enemyLoot) {
          loot.push(enemyLoot);
        });
      });

      return loot;
    };


    svc.pullFromVault = function(ally) {
      angular.forEach(svc.commonsVault, function(item) {
        if (item.characterReq === ally.id && (item.classReq === ally.class || item.classReq === 'None')) {
          svc.commons.push(item);
        }
      });
      angular.forEach(svc.uncommonsVault, function(item) {
        if (item.characterReq === ally.id && (item.classReq === ally.class || item.classReq === 'None')) {
          svc.uncommons.push(item);
        }
      });
      angular.forEach(svc.raresVault, function(item) {
        if (item.characterReq === ally.id && (item.classReq === ally.class || item.classReq === 'None')) {
          svc.rares.push(item);
        }
      });
      angular.forEach(svc.epicsVault, function(item) {
        if (item.characterReq === ally.id && (item.classReq === ally.class || item.classReq === 'None')) {
          svc.epics.push(item);
        }
      });
    };


    svc.commonsVault = [
      {
        'name' : 'Combat Boots',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'Tank',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 15,
        'type' : 'Legs',
        'stats' : {
          'health': 10,
          'energy' : 0,
          'strength': 1,
          'defense': 1,
          'speed': -1,
          'intellect': 0
        }
      },
      {
        'name' : 'Carhartt Jacket',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 15,
        'type' : 'Body',
        'stats' : {
          'health': 10,
          'energy' : 0,
          'strength': 0,
          'defense': 2,
          'speed': 0,
          'intellect': 0
        }
      },
      {
        'name' : 'Wifebeater',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'Bloodsport',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 15,
        'type' : 'Body',
        'stats' : {
          'health': 0,
          'energy' : 10,
          'strength': 0,
          'defense': -1,
          'speed': 4,
          'intellect': 0
        }
      },
      {
        'name' : 'MMA Gloves',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'Champion',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 15,
        'type' : 'Arms',
        'stats' : {
          'health': 0,
          'energy' : 0,
          'strength': 2,
          'defense': 1,
          'speed': 2,
          'intellect': 0
        }
      },
      {
        'name' : 'Bandages',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Medic',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 15,
        'type' : 'Item',
        'stats' : {
          'health' : 0,
          'energy' : 10,
          'strength' : 0,
          'defense' : 0,
          'speed' : 0,
          'intellect' : 1
        }
      },
      {
        'name' : 'Hand Wraps',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 15,
        'type' : 'Arms',
        'stats' : {
          'health' : 10,
          'energy' : 0,
          'strength' : 1,
          'defense' : 0,
          'speed' : 1,
          'intellect' : 0
        }
      },
      {
        'name' : 'Wrench',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Engineer',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 13,
        'type' : 'Item',
        'stats' : {
          'health': 0,
          'energy' : 0,
          'strength': 0,
          'defense': 0,
          'speed': 3,
          'intellect': 2
        }
      },
      {
        'name' : 'Radio',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Commander',
        'lvlReq' : 1,
        'rarity' : 'Common',
        'worth' : 300,
        'type' : 'Item',
        'stats' : {
          'health': 0,
          'energy' : 30,
          'strength': 0,
          'defense': 0,
          'speed': 2,
          'intellect': 0
        }
      }
    ];

    svc.uncommonsVault = [
      {
        'name': 'Petroleum Jelly',
        'description': '',
        'characterReq': 101,
        'classReq': 'Tank',
        'lvlReq': 3,
        'rarity': 'Uncommon',
        'worth': 100,
        'type': 'Item',
        'stats': {
          'health': 20,
          'energy': 0,
          'strength': 0,
          'defense': 4,
          'speed': 0,
          'intellect': 0
        }
      },
      {
        'name': 'Blood Stained Shoes',
        'description': '',
        'characterReq': 101,
        'classReq': 'Bloodsport',
        'lvlReq': 3,
        'rarity': 'Uncommon',
        'worth': 2,
        'type': 'Legs',
        'stats': {
          'health': 0,
          'energy': 10,
          'strength': 3,
          'defense': 0,
          'speed': 3,
          'intellect': 0
        }
      },
      {
        'name': 'Mouth Guard',
        'description': '',
        'characterReq': 101,
        'classReq': 'Champion',
        'lvlReq': 3,
        'rarity': 'Uncommon',
        'worth': 107,
        'type': 'Head',
        'stats': {
          'health': 20,
          'energy': 0,
          'strength': 0,
          'defense': 5,
          'speed': 0,
          'intellect': 0
        }
      },
      {
        'name': 'Multitool',
        'description': '',
        'characterReq': 102,
        'classReq': 'Engineer',
        'lvlReq': 3,
        'rarity': 'Uncommon',
        'worth': 240,
        'type': 'Item',
        'stats': {
          'health': 0,
          'energy': 40,
          'strength': 0,
          'defense': 0,
          'speed': 3,
          'intellect': 0
        }
      },
      {
        'name': 'Cargo Pants',
        'description': '',
        'characterReq': 102,
        'classReq': 'Engineer',
        'lvlReq': 3,
        'rarity': 'Uncommon',
        'worth': 220,
        'type': 'Legs',
        'stats': {
          'health': 10,
          'energy': 0,
          'strength': 2,
          'defense': 4,
          'speed': 0,
          'intellect': 0
        }
      },
      {
        'name': 'Scrubs',
        'description': '',
        'characterReq': 102,
        'classReq': 'Medic',
        'lvlReq': 3,
        'rarity': 'Uncommon',
        'worth': 200,
        'type': 'Body',
        'stats': {
          'health': 20,
          'energy': 20,
          'strength': 0,
          'defense': 0,
          'speed': 0,
          'intellect': 2
        }
      },
      {
        'name': 'Frank\'s Jacket',
        'description': '',
        'characterReq': 102,
        'classReq': 'Commander',
        'lvlReq': 3,
        'rarity': 'Uncommon',
        'worth': 2400,
        'type': 'Item',
        'stats': {
          'health': 20,
          'energy': 0,
          'strength': 2,
          'defense': 2,
          'speed': 1,
          'intellect': 0
        }
      }
    ];

    svc.raresVault = [
      {
        'name' : 'Defibrillator',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Medic',
        'lvlReq' : 7,
        'rarity' : 'Rare',
        'worth' : 1300,
        'type' : 'Item',
        'stats' : {
          'health' : 10,
          'energy' : 30,
          'strength' : 0,
          'defense' : 0,
          'speed' : 7,
          'intellect' : 0
        }
      },
      {
        'name' : 'Frank\'s Necklace',
        'description' : 'Most of Baumville recognizes this iconic necklace.',
        'characterReq' : 102,
        'classReq' : 'Commander',
        'lvlReq' : 7,
        'rarity' : 'Rare',
        'worth' : 90000,
        'type' : 'Head',
        'stats' : {
          'health': 0,
          'energy' : 0,
          'strength': 4,
          'defense': 4,
          'speed': 4,
          'intellect': 4
        }
      },
      {
        'name' : 'Blowtorch',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Engineer',
        'lvlReq' : 7,
        'rarity' : 'Rare',
        'worth' : 800,
        'type' : 'Weapon',
        'stats' : {
          'health' : 0,
          'energy' : 40,
          'strength' : 2,
          'defense' : 0,
          'speed' : 4,
          'intellect' : 5
        }
      },
      {
        'name' : 'BPD Riot Vest',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'Tank',
        'lvlReq' : 7,
        'rarity' : 'Rare',
        'worth' : 2700,
        'type' : 'Body',
        'stats' : {
          'health' : 60,
          'energy' : 0,
          'strength' : 0,
          'defense' : 9,
          'speed' : -2,
          'intellect' : 0
        }
      },
      {
        'name' : 'Champion Rare Item',
        'description' : 'This is a description.',
        'characterReq' : 101,
        'classReq' : 'Champion',
        'lvlReq' : 5,
        'rarity' : 'Rare',
        'worth' : 15,
        'type' : 'Item',
        'stats' : {
          'health' : 0,
          'energy' : 30,
          'strength' : 0,
          'defense' : 0,
          'speed' : 2,
          'intellect' : 5
        }
      },
      {
        'name' : 'Bloodsport Rare Item',
        'description' : 'This is a description.',
        'characterReq' : 101,
        'classReq' : 'Bloodsport',
        'lvlReq' : 5,
        'rarity' : 'Rare',
        'worth' : 15,
        'type' : 'Arms',
        'stats' : {
          'health' : 100,
          'energy' : 30,
          'strength' : 2,
          'defense' : 10,
          'speed' : 5,
          'intellect' : 10
        }
      }
    ];

    svc.epicsVault = [
      {
        'name' : 'Singularity MedTool',
        'description' : 'Singularity\'s MedTool is an all-in-one enhancement for those in the medical profession. It' +
        ' offers diagnosis as well as treatment options.',
        'characterReq' : 102,
        'classReq' : 'Medic',
        'lvlReq' : 10,
        'rarity' : 'Epic',
        'worth' : 15,
        'type' : 'Arms',
        'stats' : {
          'health' : 0,
          'energy' : 30,
          'strength' : 0,
          'defense' : 0,
          'speed' : 2,
          'intellect' : 5
        }
      },
      {
        'name' : 'Frank\'s Kicks',
        'description' : 'He wore this back in high school. Never got rid of them.',
        'characterReq' : 102,
        'classReq' : 'Commander',
        'lvlReq' : 10,
        'rarity' : 'Epic',
        'worth' : 0,
        'type' : 'Legs',
        'stats' : {
          'health' : 30,
          'energy' : 30,
          'strength' : 2,
          'defense' : 2,
          'speed' : 2,
          'intellect' : 4
        }
      },
      {
        'name' : 'D\'s Homemade Assault Rifle',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Engineer',
        'lvlReq' : 10,
        'rarity' : 'Epic',
        'worth' : 100000,
        'type' : 'Item',
        'stats' : {
          'health' : 0,
          'energy' : 30,
          'strength' : 15,
          'defense' : 0,
          'speed' : 6,
          'intellect' : 0
        }
      },
      {
        'name' : 'Singularity Stasis Module',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'Tank',
        'lvlReq' : 10,
        'rarity' : 'Epic',
        'worth' : 15,
        'type' : 'Arms',
        'stats' : {
          'health' : 100,
          'energy' : -20,
          'strength' : -8,
          'defense' : 27,
          'speed' : -8,
          'intellect' : 0
        }
      },
      {
        'name' : 'Singularity Combat Implants',
        'description' : 'Welcome to the next level.',
        'characterReq' : 101,
        'classReq' : 'Champion',
        'lvlReq' : 10,
        'rarity' : 'Epic',
        'worth' : 15,
        'type' : 'Head',
        'stats' : {
          'health' : 0,
          'energy' : 30,
          'strength' : 4,
          'defense' : 10,
          'speed' : 8,
          'intellect' : 10
        }
      },
      {
        'name' : 'Synthetic Yellow',
        'description' : 'User beware.',
        'characterReq' : 101,
        'classReq' : 'Bloodsport',
        'lvlReq' : 10,
        'rarity' : 'Epic',
        'worth' : 0,
        'type' : 'Item',
        'stats' : {
          'health' : -20,
          'energy' : 40,
          'strength' : 16,
          'defense' : -8,
          'speed' : 16,
          'intellect' : 0
        }
      }
    ];
  }
})();
