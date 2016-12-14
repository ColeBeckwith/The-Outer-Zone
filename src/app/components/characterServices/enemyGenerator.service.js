(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('enemyGenerator', enemyGenerator);

  function enemyGenerator() {
    var svc = this;

    svc.generateEnemies = generateEnemies;

    activate();

    function activate() {
      svc.enemyPool = [
        {
          name: 'Witch',
          level: 4,
          status : 'alive',
          stats : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          experience : 20,
          money : 0
        },
        {
          name: 'Monkey',
          level: 1,
          status : 'alive',
          stats : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          experience : 20,
          money : 0
        },
        {
          name: 'Thug',
          level: 2,
          status : 'alive',
          stats : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          experience : 20,
          money : 0
        },
        {
          name: 'Sniper',
          level: 4,
          status : 'alive',
          stats : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          experience : 20,
          money : 0
        },
        {
          name: 'Gunner',
          level: 3,
          status : 'alive',
          stats : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          experience : 20,
          money : 0
        },
        {
          name: 'Punching Bag',
          level: 0,
          status : 'alive',
          stats : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          experience : 20,
          money : 0
        },
        {
          name: 'Behemoth',
          level: 15,
          status : 'alive',
          stats : {
            'maxHealth' : 40,
            'health' : 40,
            'speed' : 9,
            'strength' : 8,
            'defense' : 5,
            'intellect' : 3
          },
          experience : 20,
          money : 0
        }
      ];

      svc.punchingBag = {
        name: 'Punching Bag',
        level: 0,
        status : 'alive',
        stats : {
          'maxHealth' : 40,
          'health' : 40,
          'speed' : 9,
          'strength' : 8,
          'defense' : 5,
          'intellect' : 3
        },
        experience : 20,
        money : 0
      }
    }

    function generateEnemies(difficulty, allies) {
      var totalAllyLevel = 0;
      angular.forEach(allies, function(ally) {
        totalAllyLevel += ally.level;
      });
      totalAllyLevel += parseInt(difficulty) * allies.length;

      var totalEnemyLevel = 0;
      var enemies = [];

      while (totalEnemyLevel !== totalAllyLevel) {
        if (totalAllyLevel > totalEnemyLevel) {
          var addedEnemy = svc.enemyPool[Math.floor(Math.random() * svc.enemyPool.length)];
          enemies.push(angular.copy(addedEnemy));
          totalEnemyLevel += addedEnemy.level;
        } else if (totalAllyLevel < totalEnemyLevel) {
          var removedEnemy = enemies.shift();
          totalEnemyLevel -= removedEnemy.level;
        }
      }

      if (enemies.length === 0) {
        enemies.push(svc.punchingBag);
      }

      var id = 201;
      angular.forEach(enemies, function(enemy) {
        enemy.id = id;
        id++;
      });

      return enemies;
    }
  }
})();
