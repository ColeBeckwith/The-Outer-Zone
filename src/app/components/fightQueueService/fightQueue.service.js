(function () {
    'use strict';

    angular
        .module('outerZone')
        .service('fightQueueService', fightQueueService);

    fightQueueService.$inject = ["alliesService", "enemiesService", "fightLogService", "$timeout", "progressTracker",
        "movesService", "stateChangeService", "statusEffectsService", "boardManager", "AIService", "userSettingsService",
        "gameStatsService"];

    function fightQueueService(alliesService, enemiesService, fightLogService, $timeout, progressTracker, movesService,
                               stateChangeService, statusEffectsService, boardManager, AIService, userSettingsService,
                                gameStatsService) {
        var svc = this;

        svc.buildQueue = buildQueue;
        svc.cycleQueue = cycleQueue;
        svc.nextTurn = nextTurn;
        svc.enemyTurn = enemyTurn;
        svc.endTurn = endTurn;
        svc.removeFromPool = removeFromPool;
        svc.allyCharge = allyCharge;
        svc.takeAwayTurn = takeAwayTurn;
        svc.selectMove = selectMove;
        svc.actionOnAlly = actionOnAlly;
        svc.actionOnEnemy = actionOnEnemy;

        function buildQueue() {
            svc.activeAllies = alliesService.activeAllies;
            svc.enemies = enemiesService.getCurrentEnemies();
            svc.queuePool = [];

            angular.forEach(svc.activeAllies, function (ally) {
                var x = 0;
                while (x < ally.stats.speed) {
                    svc.queuePool.push(ally);
                    x++;
                }
            });

            angular.forEach(svc.enemies, function (enemy) {
                var x = 0;
                while (x < enemy.stats.speed) {
                    svc.queuePool.push(enemy);
                    x++;
                }
            });

            for (var i = svc.queuePool.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = svc.queuePool[i];
                svc.queuePool[i] = svc.queuePool[j];
                svc.queuePool[j] = temp;
            }

            return svc.queuePool;
        }

        function cycleQueue() {
            svc.queuePool.push(svc.queuePool.shift());
        }

        function nextTurn() {
            if (progressTracker.fightOngoing) {
                if (svc.queuePool[0].status === 'dead') {
                    fightLogService.pushToFightLog(svc.queuePool[0].name + " is unable to act.");
                    svc.endTurn();
                } else if (statusEffectsService.checkForStatusEffect(svc.queuePool[0], "Building Turret")) {
                    fightLogService.pushToFightLog(svc.queuePool[0].name + " is building.");
                    svc.endTurn();
                } else if (svc.queuePool[0].stance === 'Man of Stone') {
                    fightLogService.pushToFightLog(svc.queuePool[0].name + " stands firm.");
                    svc.endTurn();
                } else if (svc.queuePool[0].id >= 200) {
                    svc.enemyTurn();
                } else {
                    var distance = 1 + Math.floor(svc.queuePool[0].stats.speed / 10);
                    var currentLocation = [svc.queuePool[0].coordinates.x, svc.queuePool[0].coordinates.y];
                    var validMoves = boardManager.getValidMovements(boardManager.currentBoard, currentLocation, distance);
                    boardManager.makeCellsMovable(validMoves);
                    fightLogService.pushToFightLog('Select Move or Action.');
                }
            }
        }

        function enemyTurn() {
            var moveLocation = AIService.getMoveLocation(boardManager.currentBoard, svc.queuePool[0]);


            $timeout(function () {
                if (moveLocation) {
                    var distance = 1 + Math.floor(svc.queuePool[0].stats.speed / 10);
                    boardManager.moveCharacterTowardLocation(boardManager.currentBoard, svc.queuePool[0], moveLocation, distance);
                }

                $timeout(function () {
                    var target = AIService.getAttackTarget(boardManager.currentBoard, svc.queuePool[0]);
                    if (target) {
                        movesService.enemyAttackAlly(svc.queuePool[0], target);
                    }

                    svc.endTurn();

                }, userSettingsService.getEnemyTurnSpeed() / 2);

            }, userSettingsService.getEnemyTurnSpeed() / 2);

        }

        function endTurn() {
            boardManager.clearMoveAndTarget();
            statusEffectsService.runEndTurnStatusEffects(svc.queuePool[0]);
            movesService.setSelectedMove(null);
            svc.cycleQueue();
            gameStatsService.turnComplete(svc.queuePool[0]);
            $timeout(function () {
                svc.nextTurn();
            }, 400);
        }

        function removeFromPool(id) {
            for (var i = svc.queuePool.length - 1; i >= 0; i--) {
                if (svc.queuePool[i].id === id) {
                    svc.queuePool.splice(i, 1);
                }
            }
        }

        function allyCharge() {
            var temp = [];
            angular.forEach(svc.activeAllies, function (ally) {
                temp.push(ally);
            });
            angular.forEach(temp, function (ally) {
                svc.queuePool.splice(1, 0, ally)
            });
            fightLogService.pushToFightLog("CHARGE!")
        }

        function takeAwayTurn(player, numOfTurns) {
            for (var i = 0; i < svc.queuePool.length; i++) {
                if (svc.queuePool[i].id === player.id) {
                    svc.queuePool.splice(i, 1);
                    numOfTurns--;
                    if (numOfTurns === 0) {
                        break;
                    }
                }
            }
        }

        function selectMove(move) {
            // Fight Queue needs to know if the turn will end or not, so it passes through on its way to the
			// movesService.
            if (movesService.selectMove(move, svc.queuePool[0])) {
                if (move.name === "Charge") {
                    svc.allyCharge()
                }
                svc.endTurn();
            }
        }

        function actionOnAlly(ally) {
            if (movesService.selectedMove.targetType !== 'Ally') {
                fightLogService.pushToFightLog('Cannot target Ally with this move');
                return;
            }
            movesService.allyActionAlly(ally, svc.queuePool[0]);
            if (alliesService.targetSelectMode === 0) {
                svc.endTurn();
            }
        }

        function actionOnEnemy(enemy) {
            if (movesService.selectedMove.targetType !== 'Enemy') {
                fightLogService.pushToFightLog('Cannot target Enemy with this move');
                return;
            }
            if (['Fury', 'Attack', 'Knockout'].indexOf(movesService.selectedMove.name) !== -1) {
                if (movesService.regularAttackEnemy(enemy, svc.queuePool[0])) {
                    if (movesService.selectedMove.name === 'Knockout') {
                        svc.takeAwayTurn(enemy, 1);
                        fightLogService.pushToFightLog(enemy.name + " is knocked out and will miss their next turn.")
                    }
                }
            }

            if (movesService.selectedMove.name === 'Death Punch') {
                movesService.deathPunch(enemy, svc.queuePool[0]);
            }

            if (movesService.selectedMove.name === 'Vanquish') {
                movesService.vanquish(enemy);
            }

            if (movesService.selectedMove.name === 'Last Dance') {
                movesService.lastDance(enemy, svc.queuePool[0]);
            }

            if (movesService.selectedMove.name === "Finishing Touch") {
                movesService.finishingTouch(enemy, svc.queuePool[0]);
            }

            enemiesService.updateHealthBarType(enemy);

            if (enemiesService.checkForDead(enemy)) {
                fightLogService.pushToFightLog(enemy.name + " has been defeated.");
                alliesService.runEnemyDeathStatuses();
                svc.removeFromPool(enemy.id);
                if (enemiesService.checkForVictory()) {
                    gameStatsService.mergeInBattleStats(gameStatsService.battleStats, true);
                    progressTracker.stopFight();
                    progressTracker.setBattleWon(true);
                    fightLogService.pushToFightLog("Victorious");
                    $timeout(function () {
                        stateChangeService.setPlayerState("fightSummary");
                    }, 1500);
                }
            }

            enemiesService.targetSelectMode--;

            if (enemiesService.targetSelectMode === 0) {
                svc.endTurn();
            }
        }

    }

})();
