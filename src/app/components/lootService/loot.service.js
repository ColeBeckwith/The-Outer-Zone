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
        'type' : 'Hands',
        'stats' : {
          'health': 10,
          'energy': 0,
          'strength': 0,
          'defense': 0,
          'speed': 0,
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
        'worth' : 30,
        'type' : 'Hands',
        'stats' : {
          'health': 10,
          'energy': 0,
          'strength': 0,
          'defense': 0,
          'speed': 0,
          'intellect': 0
        }
      }
    ];

    svc.rares = [

    ];

    svc.epics = [

    ];

    svc.gimmeTheLoot = function() {
      var loot = [];
      var exp = enemiesService.getExperience();

      var chance = Math.random() * 100000 + exp;
      console.log(chance);

      loot.push(svc.commons[Math.floor(Math.random()*svc.commons.length)]);
      loot.push(svc.epics[Math.floor(Math.random()*svc.epics.length)]);
      loot.push(svc.rares[Math.floor(Math.random()*svc.rares.length)]);
      loot.push(svc.uncommons[Math.floor(Math.random()*svc.uncommons.length)]);

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
      } else if (chance > 50000) {
        loot.push(svc.commons[Math.floor(Math.random()*svc.commons.length)]);
        loot.push(svc.commons[Math.floor(Math.random()*svc.commons.length)])
      } else if (chance > 20000) {
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
        'name' : 'Steel Toed Boots',
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
        'type' : 'Hands',
        'stats' : {
          'health' : 10,
          'energy' : 0,
          'strength' : 1,
          'defense' : 0,
          'speed' : 0,
          'intellect' : 0
        }
      }
    ];

    svc.uncommonsVault = [

    ];

    svc.raresVault = [
      {
        'name' : 'Medic Rare Item',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Medic',
        'lvlReq' : 5,
        'rarity' : 'Rare',
        'worth' : 15,
        'type' : 'Hands',
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
        'name' : 'Commander Rare Item',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Commander',
        'lvlReq' : 5,
        'rarity' : 'Rare',
        'worth' : 15,
        'type' : 'Head',
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
        'name' : 'Engineer Rare Item',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Engineer',
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
        'name' : 'Tank Rare Item',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'Tank',
        'lvlReq' : 5,
        'rarity' : 'Rare',
        'worth' : 15,
        'type' : 'Body',
        'stats' : {
          'health' : 60,
          'energy' : 0,
          'strength' : 0,
          'defense' : 3,
          'speed' : 0,
          'intellect' : 0
        }
      },
      {
        'name' : 'Brawler Rare Item',
        'description' : 'This is a description.',
        'characterReq' : 101,
        'classReq' : 'Brawler',
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
        'name' : 'Berserker Rare Item',
        'description' : 'This is a description.',
        'characterReq' : 101,
        'classReq' : 'Berserker',
        'lvlReq' : 5,
        'rarity' : 'Rare',
        'worth' : 15,
        'type' : 'Hands',
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
        'type' : 'Hands',
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
        'name' : 'Commander Epic Item',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Commander',
        'lvlReq' : 10,
        'rarity' : 'Epic',
        'worth' : 15,
        'type' : 'Head',
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
        'name' : 'Engineer Epic Item',
        'description' : '',
        'characterReq' : 102,
        'classReq' : 'Engineer',
        'lvlReq' : 10,
        'rarity' : 'Epic',
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
        'name' : 'Tank Epic Item',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'Tank',
        'lvlReq' : 10,
        'rarity' : 'Epic',
        'worth' : 15,
        'type' : 'Body',
        'stats' : {
          'health' : 60,
          'energy' : 0,
          'strength' : 0,
          'defense' : 3,
          'speed' : 0,
          'intellect' : 0
        }
      },
      {
        'name' : 'Brawler Epic Item',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'Brawler',
        'lvlReq' : 10,
        'rarity' : 'Epic',
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
        'name' : 'Berserker Epic Item',
        'description' : '',
        'characterReq' : 101,
        'classReq' : 'Berserker',
        'lvlReq' : 10,
        'rarity' : 'Epic',
        'worth' : 15,
        'type' : 'Hands',
        'stats' : {
          'health' : 0,
          'energy' : 30,
          'strength' : 2,
          'defense' : 0,
          'speed' : 5,
          'intellect' : 0
        }
      }
    ];
  }
})();
