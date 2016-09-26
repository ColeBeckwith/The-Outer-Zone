(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('alliesService', alliesService);

  alliesService.$inject = ["stateChangeService", "progressTracker", "fightLogService", '$timeout', 'inventoryService'];

  function alliesService(stateChangeService, progressTracker, fightLogService, $timeout, inventoryService) {
    var vm = this;

    vm.targetSelectMode = 0;

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
        'equipment' : []
      },
      {
        'name' : 'D. Taylor',
        'id' : 102,
        'level' : 10,
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

    vm.setAllies = function(allies) {
      vm.allies = allies;
      vm.updateActives();
    };

    vm.getActiveAllies = function() {
      return vm.activeAllies;
    };

    vm.updatePercentages = function(ally) {
      ally.percentageHealth = (ally.stats.health/ally.stats.maxHealth)*100 + '%';
    };

    vm.distributeExperience = function(exp) {
      angular.forEach(vm.activeAllies, function(ally) {
        ally.exp += Math.round((exp/vm.activeAllies.length)*((100 + ally.baseStats.intellect)/100));
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

    vm.healAlly = function(ally, points) {
      ally.stats.health += points;
      if (ally.stats.health > ally.stats.maxHealth) {
        ally.stats.health = ally.stats.maxHealth;
      }
      vm.updatePercentages(ally);
      fightLogService.pushToFightLog(ally.name + " healed by " + points + " points.");
    };

    vm.energizeAlly = function(ally, points) {
      ally.stats.energy += points;
      if (ally.stats.energy > ally.stats.maxEnergy) {
        ally.stats.energy = ally.stats.maxEnergy;
      }
      fightLogService.pushToFightLog(ally.name + " energized by " + points + " points.");
    };

    vm.restoreAlliesMove = function(healer) {
      angular.forEach(vm.activeAllies, function(ally) {
        if (ally.id !== healer.id) {
          vm.healAlly(ally, healer.stats.intellect * 3);
          vm.energizeAlly(ally, healer.stats.intellect);
          if (ally.status === 'dead') {
            ally.status = 'alive'
          }
        }
      });
    };

    vm.selectNumberOfTargets = function(number) {
      vm.targetSelectMode = number;
    };

    vm.checkForTargetPriority = function() {
      for (var i = 0; i < vm.activeAllies.length; i++) {
        if (vm.activeAllies[i].stance === 'Man of Stone') {
          return i
        }
      }
      return undefined;
    };

    vm.reduceStanceCount = function(ally) {
      ally.stanceCount--;
      if (ally.stanceCount === 0) {
        ally.stance = "Normal";
      }
    };

    vm.runEnemyDeathStatuses = function() {
      angular.forEach(vm.activeAllies, function(ally) {
        angular.forEach(ally.statusEffects, function(effect) {
          if (effect[0] === "Bloodbath") {
            fightLogService.pushToFightLog(ally.name + ' grows stronger.');
            ally.stats.strength += (Math.round(ally.stats.strength/3));
            ally.stats.speed += (Math.round(ally.stats.speed/3));
            vm.healAlly(ally, (Math.round(ally.stats.maxHealth/6)));
            vm.energizeAlly(ally, (Math.round(ally.stats.maxEnergy/4)));
          }
        })
      });
    };
    
    vm.runEndTurnStatusEffects = function(ally) {
      angular.forEach(ally.statusEffects, function(effect, index) {
        if (effect[0] === "Poisoned Weapons") {
          effect[1]--;
        }
        if (effect[1] === 0) {
          ally.statusEffects.splice(index, 1)
        }
      })
    };

    vm.updateActives();
  }
})();
