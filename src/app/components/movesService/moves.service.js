(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('movesService', movesService);

  movesService.$inject = ["alliesService", "enemiesService", "fightLogService", "$timeout", "statusEffectsService", "boardCreator"];

  function movesService(alliesService, enemiesService, fightLogService, $timeout, statusEffectsService, boardCreator) {
    var svc = this;

    svc.selectedMove = null;

    svc.getActiveAllies = getActiveAllies;
    svc.setSelectedMove = setSelectedMove;
    svc.getSelectedMove = getSelectedMove;
    svc.enemyAttackAlly = enemyAttackAlly;
    svc.selectMove = selectMove;
    svc.allyActionAlly = allyActionAlly;
    svc.deathPunch = deathPunch;
    svc.vanquish = vanquish;
    svc.lastDance = lastDance;
    svc.finishingTouch = finishingTouch;
    svc.regularAttackEnemy = regularAttackEnemy;
    svc.checkResources = checkResources;

    activate();

    function activate() {
      getActiveAllies();
    }

    function getActiveAllies() {
      svc.activeAllies = alliesService.getActiveAllies();
    }

    function setSelectedMove(move) {
      svc.selectedMove = move;
    }

    function getSelectedMove() {
      return svc.selectedMove;
    }

    function enemyAttackAlly(enemy, target) {
      if (statusEffectsService.checkForStatusEffect(enemy, 'Hijacked')) {
        var hijack = statusEffectsService.getStatus(enemy, 'Hijacked');
        if ((Math.random() * 100) < hijack[2]) {
          fightLogService.pushToFightLog(enemy.name + '\'s weapon backfired.');
          enemiesService.deliverRegularDamage(enemy, enemy.stats.strength);
          return;
        }
      }

      // TODO a version of this needs to be reimplemented. Also debug this whole function as a lot has changed.
      // var target = alliesService.checkForTargetPriority();
      // if (!target) {
      //   target = Math.floor(Math.random() * svc.activeAllies.length)
      // }
      // while (svc.activeAllies[target].status === 'dead') {
      //   target = Math.floor(Math.random() * svc.activeAllies.length);
      // }

      if (target.stance === "Parrying") {
        enemy.stats.health -= Math.round(target.stats.defense/3);
        fightLogService.pushToFightLog(target.name + " deflected the attack.");
        alliesService.reduceStanceCount(target);
        return;
      }

      if (target.stance === "Absorbing") {
        alliesService.healAlly(target, Math.round(((1.7 + ((Math.random() * 6) / 10)) * enemy.stats.strength)));
        fightLogService.pushToFightLog(target.name + " absorbed the attack.");
        alliesService.reduceStanceCount(target);
        return;
      }

      if ((Math.random() * 6 * enemy.stats.speed) > (Math.random() * target.stats.speed)) {
        var damage = Math.round(((1.7 + ((Math.random() * 6) / 10)) * enemy.stats.strength) - (.75 * target.stats.defense));

        if (damage <= 0) {
          damage = 1;
        }

        target.stats.health -= damage;
        fightLogService.pushToFightLog(enemy.name + " attacked " + target.name + " for " + damage + " damage.");
        alliesService.checkForDeath(target);
        alliesService.updatePercentages(target);
      } else {
        fightLogService.pushToFightLog(target.name + ' dodged ' + enemy.name + '\'s attack.')
      }
    }

    function selectMove(move, atBat) {
      svc.setSelectedMove(move);
      if (checkResources(atBat, move)) {
        boardCreator.clearMoveAndTarget();

        if (svc.selectedMove.numOfTargets) {
          if (svc.selectedMove.targetType === "Enemy") {
            enemiesService.selectNumberOfTargets(svc.selectedMove.numOfTargets);
          } else if (svc.selectedMove.targetType === "Ally") {
            $timeout(function () {
              alliesService.selectNumberOfTargets(svc.selectedMove.numOfTargets);
            }, 100);
          }
        }

        if (svc.selectedMove.range) {
          if (svc.selectedMove.rangeType === 'Single Cell') {
            var origin = [atBat.coordinates.x, atBat.coordinates.y];
            var targetableCells = boardCreator.getValidTargets(origin, svc.selectedMove.range);
            boardCreator.makeCellsTargetable(targetableCells, svc.selectedMove.targetType);
          }
        }

        if (move.name === "Attack") {
          fightLogService.pushToFightLog('Select target to Attack.');
        }

        if (move.name === "Rest") {
          atBat.stats.energy += 5;
          if (atBat.stats.energy > atBat.stats.maxEnergy) {
            atBat.stats.energy = atBat.stats.maxEnergy;
          }
          atBat.stats.health += 5;
          if (atBat.stats.health > atBat.stats.maxHealth) {
            atBat.stats.health = atBat.stats.maxHealth;
          }
          alliesService.updatePercentages(atBat);
          fightLogService.pushToFightLog(atBat.name + " is resting.");
          return true;
        }

        if (svc.selectedMove.name === "Fury") {
          fightLogService.pushToFightLog('Select Three Targets');
        }

        if (svc.selectedMove.name === "Unchained") {
          //Needs check for status.
          atBat.stats.strength += atBat.stats.defense;
          atBat.stats.defense = 0;
          atBat.stats.speed += atBat.stats.intellect;
          atBat.stats.intellect = 0;
          fightLogService.pushToFightLog(atBat.name + ' is unchained.');
          return true;
        }

        if (svc.selectedMove.name === "Bloodbath") {
          if (!statusEffectsService.checkForStatusEffect(atBat, 'Bloodbath')) {
            atBat.statusEffects.push(['Bloodbath', 9999]);
          }
          fightLogService.pushToFightLog('Let the carnage begin.');
          return true;
        }

        if (svc.selectedMove.name === "Fortify") {
          if (!statusEffectsService.checkForStatusEffect(atBat, 'Fortified')) {
            var boost = Math.round(atBat.baseStats.defense * .15);
            atBat.stats.defense += boost;
            fightLogService.pushToFightLog(atBat.name + "'s defense has been raised by " + boost + " for the duration" +
              " of the fight. This effect does NOT stack.");
            atBat.statusEffects.push(['Fortified', 9999]);
            return true;
          } else {
            fightLogService.pushToFightLog(atBat.name + " has already been fortified.");
            svc.setSelectedMove(null);
          }
        }

        if (svc.selectedMove.name === "Absorb") {
          atBat.stance = 'Absorbing';
          atBat.stanceCount = 1;
          fightLogService.pushToFightLog(atBat.name + ' will absorb the next incoming attack.')
          return true
        }

        if (svc.selectedMove.name === "Man of Stone") {
          atBat.stance = 'Man of Stone';
          atBat.stanceCount = 9999;
          atBat.stats.defense += atBat.stats.speed;
          atBat.stats.speed = 0;
          fightLogService.pushToFightLog(atBat.name + " is the Man of Stone.");
          return true
        }

        if (svc.selectedMove.name === "Parry") {
          atBat.stance = 'Parrying';
          atBat.stanceCount = 2;
          fightLogService.pushToFightLog(atBat.name + " will deflect the next 2 incoming attacks.");
          return true;
        }

        if (svc.selectedMove.name === "Knockout") {
          fightLogService.pushToFightLog('Select target to Knockout.');
        }

        if (svc.selectedMove.name === "Death Punch") {
          fightLogService.pushToFightLog('Select target to Death Punch.');
        }

        if (svc.selectedMove.name === "Heal") {
          fightLogService.pushToFightLog("Select ally to Heal.")
        }

        if (svc.selectedMove.name === "Energize") {
          $timeout(function () {
            alliesService.selectNumberOfTargets(1);
          }, 100);
          fightLogService.pushToFightLog("Select ally to Energize.")
        }

        if (svc.selectedMove.name === "Restore") {
          alliesService.restoreAlliesMove(atBat);
          return true;
        }

        if (svc.selectedMove.name === "Charge") {
          return true;
        }

        if (svc.selectedMove.name === "Inspire") {
          angular.forEach(svc.activeAllies, function(ally) {
            if (ally.id !== atBat.id) {
              ally.statusEffects.push(['Inspired', 1])
            }
          });
          return true;
        }

        if (svc.selectedMove.name === "Vanquish") {
          fightLogService.pushToFightLog('Select target to Vanquish.');
        }

        if (svc.selectedMove.name === "Upgrade") {
          angular.forEach(svc.activeAllies, function (ally) {
            if (!statusEffectsService.checkForStatusEffect(ally, 'Upgraded')) {
              var upgrade = Math.round(atBat.stats.intellect / 6);

              var max = ally.stats.strength;
              if (ally.stats.speed > max) {
                max = ally.stats.speed
              }
              if (ally.stats.intellect > max) {
                max = ally.stats.intellect
              }
              if (ally.stats.defense > max) {
                max = ally.stats.defense
              }

              if (ally.stats.speed === max) {
                ally.stats.speed += upgrade;
              } else if (ally.stats.defense === max) {
                ally.stats.defense += upgrade;
              } else if (ally.stats.intellect === max) {
                ally.stats.intellect += upgrade;
              } else if (ally.stats.strength === max) {
                ally.stats.strength += upgrade;
              }

              ally.statusEffects.push(['Upgraded', 9999]);
            } else {
              fightLogService.pushToFightLog(ally.name + ' has already been upgraded.')
            }
          });
          return true;
        }

        if (svc.selectedMove.name === "Hijack Weapons") {
          angular.forEach(enemiesService.getCurrentEnemies(), function(enemy) {
            if (atBat.stats.intellect > enemy.stats.intellect) {
              enemy.statusEffects.push(["Hijacked", 5, atBat.stats.intellect]);
              fightLogService.pushToFightLog(enemy.name + '\'s weapons have been hijacked.')
            } else {
              fightLogService.pushToFightLog(enemy.name + ' stopped the Hijacking attempt.')
            }
          });
          return true;
        }

        if (svc.selectedMove.name === "Build Turret") {
          atBat.statusEffects.push(['Building Turret', 5]);
          return true;
        }

        if (svc.selectedMove.name === "Last Dance") {
          fightLogService.pushToFightLog('Select target to Attack.');
        }

        if (svc.selectedMove.name === "Poison Tips") {
          atBat.statusEffects.push(['Poison Weapons', 4, atBat.stats.intellect]);
          return true;
        }

        if (svc.selectedMove.name === "Finishing Touch") {
          fightLogService.pushToFightLog('Select target to Attack.');
        }

        if (svc.selectedMove.name === "Headshot") {}

        if (svc.selectedMove.name === "Perch") {
          atBat.stance = 'Perched';
          return true;
        }

        if (svc.selectedMove.name === "Eagle Eye") {}

        if (svc.selectedMove.name === "Unload") {}

        if (svc.selectedMove.name === "Arsenal") {}

        if (svc.selectedMove.name === "Bullet Hell") {}
      }

    }

    function allyActionAlly(allyActed, allyActing) {
      if (svc.selectedMove.name === "Heal") {
        if (allyActed.status === 'dead') {
          fightLogService.pushToFightLog(allyActed.name + " cannot be revived.")
        } else {
          alliesService.healAlly(allyActed, 3 * allyActing.stats.intellect);
          alliesService.targetSelectMode--;
        }
      }
      if (svc.selectedMove.name === "Energize") {
        if (allyActed.status === 'dead') {
          fightLogService.pushToFightLog(allyActed.name + " cannot be energized.")
        } else {
          alliesService.energizeAlly(allyActed, allyActing.stats.intellect);
          alliesService.targetSelectMode--;
        }
      }
    }

    function deathPunch(enemy, ally) {
      if (ally.stats.intellect + (Math.random() * 20) > 40) {
        enemy.stats.health -= 100 + (ally.stats.strength * 3);
        fightLogService.pushToFightLog(ally.name + ' struck ' + enemy.name + ' in the temple.');
      } else {
        fightLogService.pushToFightLog(ally.name + ' struck ' + enemy.name + ', but missed the strike zone.');
        svc.regularAttackEnemy(enemy, ally)
      }
    }

    function vanquish(enemy) {
      var power = 0;
      angular.forEach(svc.activeAllies, function(ally) {
        power += ally.stats.strength;
      });
      enemiesService.deliverRegularDamage(enemy, power);
      fightLogService.pushToFightLog(enemy.name + ' has been Vanquished.')
    }

    function lastDance(enemy, ally) {
      enemiesService.deliverRegularDamage(enemy, ally.stats.speed);
      if (enemiesService.checkForDead(enemy)) {
        fightLogService.pushToFightLog('Keep on dancing.');
        enemiesService.targetSelectMode++;
      }
    }

    function finishingTouch(enemy) {
      if (enemy.stats.health/enemy.stats.maxHealth < .3) {
        enemy.stats.health = 0;
      }
    }

    function regularAttackEnemy(enemy, ally) {
      if ((Math.random() * 6 * ally.stats.speed) > (Math.random() * enemy.stats.speed)) {
        if (statusEffectsService.checkForStatusEffect(ally, "Poison Weapons")) {
          var poison = statusEffectsService.getStatus(ally, "Poison Weapons");
          enemy.statusEffects.push(["Poisoned", 3, poison[2]])
        }
        enemiesService.deliverRegularDamage(enemy, ally.stats.strength);
        fightLogService.pushToFightLog(ally.name + " attacked " + enemy.name + '.');
        return true;
      } else {
        fightLogService.pushToFightLog(enemy.name + " dodged the attack.");
      }
    }

    function checkResources(player, move) {
      var energyReq = 0;
      if (statusEffectsService.checkForStatusEffect(player, "Inspired")) {
        energyReq = Math.round(move.energyReq/2);
      } else {
        energyReq = move.energyReq
      }
      if (player.stats.energy >= energyReq && player.stats.health > move.healthReq) {
        player.stats.energy -= energyReq;
        player.stats.health -= move.healthReq;
        alliesService.updatePercentages(player);
        return true;
      } else {
        fightLogService.pushToFightLog(player.name + " doesn't have the resources to perform " + move.name + ".");
        svc.setSelectedMove(null);
        return false;
      }
    }
  }
})();
