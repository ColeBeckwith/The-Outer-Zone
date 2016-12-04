(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('alliesService', alliesService);

  alliesService.$inject = ["stateChangeService", "progressTracker", "fightLogService", '$timeout', 'inventoryService'];

  function alliesService(stateChangeService, progressTracker, fightLogService, $timeout, inventoryService) {
    var svc = this;

    svc.targetSelectMode = 0;

    svc.allies = [
      {
        'name' : 'Scarecrow',
        'id' : 101,
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
        'equipment' : []
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
        'equipment' : []
      },
      {
        'name' : 'Lionel',
        'id' : 103,
        'level' : 2,
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
        'equipment' : []
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
        'equipment' : []
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
        'equipment' : []
      }
    ];

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

    svc.activateAlly = function(ally) {
      ally.status = 'alive';
      svc.updateActives();
    };

    svc.deactivateAlly = function(ally) {
      ally.status = 'inactive';
      svc.updateActives();
    };

    svc.updateActives = function() {
      svc.activeAllies = [];
      angular.forEach(svc.allies, function(ally) {
        if (ally.status !== 'inactive') {
          svc.activeAllies.push(ally);
        }
      });
      angular.forEach(svc.activeAllies, function(ally) {
        svc.updatePercentages(ally);
      });
    };

    svc.setAllies = function(allies) {
      svc.allies = allies;
      svc.updateActives();
    };

    svc.getActiveAllies = function() {
      return svc.activeAllies;
    };

    svc.setClassForAlly = function(ally, build) {
      ally.baseStats = build.baseStats;
      ally.baseStats.health = build.baseStats.maxHealth;
      ally.baseStats.energy = build.baseStats.maxEnergy;
      ally.class = build.name;
      ally.icon = build.icon;
      ally.levelingSchedule = build.levelingSchedule;
      ally.moves = [['Attack', 1, 0, 0],['Rest', 1, 0, 0]].concat(build.moves);
    };

    svc.updatePercentages = function(ally) {
      ally.percentageHealth = (ally.stats.health/ally.stats.maxHealth)*100 + '%';
    };

    svc.distributeExperience = function(exp) {
      angular.forEach(svc.activeAllies, function(ally) {
        ally.exp += Math.round((exp/svc.activeAllies.length)*((100 + ally.baseStats.intellect)/100));
        if (ally.exp >= ally.expNeeded) {
          $timeout(function() {
            svc.levelUp(ally);
          }, 1200);
        }
      })
    };

    svc.levelUp = function(ally) {
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

    svc.checkForDeath = function(ally) {
      if (ally.stats.health <= 0) {
        ally.stats.health = 0;
        ally.status = 'dead';
        svc.checkForDefeat();
      }
    };

    svc.checkForDefeat = function() {
      var livingAllies = 0;
      angular.forEach(svc.activeAllies, function(ally) {
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

    svc.getBaseStats = function(id) {
      var baseStats = [];
      for (var i = 0; i < svc.allies.length; i++) {
        if (svc.allies[i].id === id) {
          baseStats = svc.allies[i].baseStats;
        }
      }
      return baseStats
    };

    svc.restoreAll = function() {
      angular.forEach(svc.activeAllies, function(ally) {
        ally.stats = angular.copy(ally.baseStats);
        ally.status = 'alive';
        ally.stance = 'Normal';
        ally.statusEffects = [];
        ally.stanceCount = 0;
        ally.stats.health = ally.stats.maxHealth;
        ally.stats.energy = ally.stats.maxEnergy;
        svc.updatePercentages(ally);
      });
    };

    svc.equipToAlly = function(ally, item) {
      angular.forEach(ally.equipment, function(piece, index) {
        if (piece.type === item.type) {
          svc.removeEquipment(ally, piece, index);
        }
      });
      ally.baseStats.maxHealth += item.stats.health;
      ally.baseStats.maxEnergy += item.stats.energy;
      ally.baseStats.strength += item.stats.strength;
      ally.baseStats.defense += item.stats.defense;
      ally.baseStats.speed += item.stats.speed;
      ally.equipment.push(item);
    };

    svc.removeEquipment = function(ally, piece, index) {
      ally.baseStats.maxHealth -= piece.stats.health;
      ally.baseStats.maxEnergy -= piece.stats.energy;
      ally.baseStats.strength -= piece.stats.strength;
      ally.baseStats.defense -= piece.stats.defense;
      ally.baseStats.speed -= piece.stats.speed;
      ally.equipment.splice(index, 1);
      inventoryService.addToInventory([piece]);
    };

    svc.healAlly = function(ally, points) {
      ally.stats.health += points;
      if (ally.stats.health > ally.stats.maxHealth) {
        ally.stats.health = ally.stats.maxHealth;
      }
      svc.updatePercentages(ally);
      fightLogService.pushToFightLog(ally.name + " healed by " + points + " points.");
    };

    svc.energizeAlly = function(ally, points) {
      ally.stats.energy += points;
      if (ally.stats.energy > ally.stats.maxEnergy) {
        ally.stats.energy = ally.stats.maxEnergy;
      }
      fightLogService.pushToFightLog(ally.name + " energized by " + points + " points.");
    };

    svc.restoreAlliesMove = function(healer) {
      angular.forEach(svc.activeAllies, function(ally) {
        if (ally.id !== healer.id) {
          svc.healAlly(ally, healer.stats.intellect * 3);
          svc.energizeAlly(ally, healer.stats.intellect);
          if (ally.status === 'dead') {
            ally.status = 'alive'
          }
        }
      });
    };

    svc.selectNumberOfTargets = function(number) {
      svc.targetSelectMode = number;
    };

    svc.checkForTargetPriority = function() {
      for (var i = 0; i < svc.activeAllies.length; i++) {
        if (svc.activeAllies[i].stance === 'Man of Stone') {
          return i
        }
      }
      return undefined;
    };

    svc.reduceStanceCount = function(ally) {
      ally.stanceCount--;
      if (ally.stanceCount === 0) {
        ally.stance = "Normal";
      }
    };

    svc.runEnemyDeathStatuses = function() {
      angular.forEach(svc.activeAllies, function(ally) {
        angular.forEach(ally.statusEffects, function(effect) {
          if (effect[0] === "Bloodbath") {
            fightLogService.pushToFightLog(ally.name + ' grows stronger.');
            ally.stats.strength += (Math.round(ally.stats.strength/3));
            ally.stats.speed += (Math.round(ally.stats.speed/3));
            svc.healAlly(ally, (Math.round(ally.stats.maxHealth/6)));
            svc.energizeAlly(ally, (Math.round(ally.stats.maxEnergy/4)));
          }
        })
      });
    };

    svc.runEndTurnStatusEffects = function(ally) {
      angular.forEach(ally.statusEffects, function(effect, index) {
        if (effect[0] === "Poisoned Weapons") {
          effect[1]--;
        }
        if (effect[1] === 0) {
          ally.statusEffects.splice(index, 1)
        }
      })
    };

    svc.getBuilds = function() {
      return svc.builds[progressTracker.newAlly];
    };

    svc.updateActives();
  }
})();
