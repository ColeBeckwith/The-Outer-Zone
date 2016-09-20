(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('lootService', lootService);

  lootService.$inject = ['enemiesService'];

  function lootService(enemiesService) {
    var svc = this;

    svc.commons = [
      {
        'name' : 'Leather Gloves',
        'characterReq' : 'None',
        'classReq' : 'None',
        'lvlReq' : 1,
        'rarity' : 'Common',
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

    ];

    svc.rares = [

    ];

    svc.epics = [

    ];

    svc.gimmeTheLoot = function() {
      var loot = [];
      var exp = enemiesService.getExperience();

      angular.forEach(enemiesService.getEnemies(), function(enemy) {
        angular.forEach(enemy.loot, function(enemyLoot) {
          loot.push(enemyLoot);
        });
      });

      loot.push(svc.commons[Math.floor(Math.random()*svc.commons.length)]);


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
        'characterReq' : 101,
        'classReq' : 'Tank',
        'rarity' : 'Common',
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
        'characterReq' : 102,
        'classReq' : 'Medic',
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
        'characterReq' : 101,
        'classReq' : 'None',
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

    ];

    svc.epicsVault = [

    ];
  }
})();
