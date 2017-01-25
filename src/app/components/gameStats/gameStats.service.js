(function () {
    'use strict';

    angular
        .module('outerZone')
        .service('gameStatsService', gameStatsService);

    gameStatsService.$inject = ['achievementsService', 'progressTracker'];

    function gameStatsService(achievementsService, progressTracker) {
        var svc = this;

        svc.setGameStats = setGameStats;
        svc.mergeInBattleStats = mergeInBattleStats;
        svc.resetBattleStats = resetBattleStats;
        svc.allyDeliveredDamage = allyDeliveredDamage;
        svc.allyReceivedDamage = allyReceivedDamage;
        svc.turnComplete = turnComplete;

        resetBattleStats();

        svc.gameStats = {
            totalDamageDealtToEnemy: 0,
            totalDamageDealtByAllyOne: 0,
            totalDamageDealtByAllyTwo: 0,
            totalDamageDealtByAllyThree: 0,
            totalDamageDealtByAllyFour: 0,
            totalDamageDealtByAllyFive: 0,

            totalDamageReceivedFromEnemy: 0,
            totalDamageReceivedByAllyOne: 0,
            totalDamageReceivedByAllyTwo: 0,
            totalDamageReceivedByAllyThree: 0,
            totalDamageReceivedByAllyFour: 0,
            totalDamageReceivedByAllyFive: 0,

            totalBattlesWon: 0,
            totalBattlesLost: 0,
            arenaBattlesWon: 0,
            arenaBattlesLost: 0,
            storyBattlesWon: 0,
            storyBattlesLost: 0,

            enemiesDefeated: 0,
            alliesFallen: 0,

            fewestMovesToWin: 99999,
            longestBattle: 0,

            highestDamageDealt: 0
        };

        function setGameStats(stats) {
            svc.gameStats = stats;
        }

        function mergeInBattleStats(stats, playerWon) {
            svc.gameStats.totalDamageDealtToEnemy += stats.totalDamageDealtToEnemy;

            svc.gameStats.totalDamageDealtByAllyOne += stats.totalDamageDealtByAllyOne;
            svc.gameStats.totalDamageDealtByAllyTwo += stats.totalDamageDealtByAllyTwo;
            svc.gameStats.totalDamageDealtByAllyThree += stats.totalDamageDealtByAllyThree;
            svc.gameStats.totalDamageDealtByAllyFour += stats.totalDamageDealtByAllyFour;
            svc.gameStats.totalDamageDealtByAllyFive += stats.totalDamageDealtByAllyFive;

            svc.gameStats.totalDamageReceivedFromEnemy += stats.totalDamageReceivedFromEnemy;

            svc.gameStats.totalDamageReceivedByAllyOne += stats.totalDamageReceivedByAllyOne;
            svc.gameStats.totalDamageReceivedByAllyTwo += stats.totalDamageReceivedByAllyTwo;
            svc.gameStats.totalDamageReceivedByAllyThree += stats.totalDamageReceivedByAllyThree;
            svc.gameStats.totalDamageReceivedByAllyFour += stats.totalDamageReceivedByAllyFour;
            svc.gameStats.totalDamageReceivedByAllyFive += stats.totalDamageReceivedByAllyFive;

            console.log(stats);
            console.log(svc.gameStats.totalDamageReceivedByAllyOne);

            svc.gameStats.enemiesDefeated += stats.enemiesDefeated;
            svc.gameStats.alliesFallen += stats.alliesFallen;

            if (stats.highestDamageDealt > svc.gameStats.highestDamageDealt) {
                svc.gameStats.highestDamageDealt = stats.highestDamageDealt;
                svc.gameStats.highestDamageDealtBy = stats.highestDamageDealtBy;
            }

            if (stats.totalTurns > svc.gameStats.longestBattle) {
                svc.gameStats.longestBattle = stats.totalTurns;
            }

            var battleType = progressTracker.fightType;

            if (playerWon) {
                svc.gameStats.totalBattlesWon++;
                svc.gameStats[battleType + 'BattlesWon']++;
                if (stats.allyTurns < svc.gameStats.fewestMovesToWin) {
                    svc.gameStats.fewestMovesToWin = stats.allyTurns;
                }
            } else {
                svc.gameStats.totalBattlesLost++;
                svc.gameStats[battleType + 'BattlesLost']++;
            }

            achievementsService.runEndBattleAchievementCheck(svc.battleStats, svc.gameStats, playerWon);

            resetBattleStats();
        }

        function allyDeliveredDamage(damage, ally) {
            svc.battleStats.totalDamageDealtToEnemy += damage;
            if (ally) {
                switch (ally.id) {
                    case 101:
                        svc.battleStats.totalDamageDealtByAllyOne += damage;
                        break;
                    case 102:
                        svc.battleStats.totalDamageDealtByAllyTwo += damage;
                        break;
                    case 103:
                        svc.battleStats.totalDamageDealtByAllyThree += damage;
                        break;
                    case 104:
                        svc.battleStats.totalDamageDealtByAllyFour += damage;
                        break;
                    case 105:
                        svc.battleStats.totalDamageDealtByAllyFive += damage;
                        break;
                    default:
                        break;
                }

                if (damage > svc.battleStats.highestDamageDealt) {
                    console.log('highest damage dealt');
                    svc.battleStats.highestDamageDealt = damage;
                    svc.battleStats.highestDamageDealtBy = ally.name;
                }
            }
        }

        function allyReceivedDamage(damage, ally) {
            svc.battleStats.totalDamageReceivedFromEnemy += damage;
            switch (ally.id) {
                case 101:
                    svc.battleStats.totalDamageReceivedByAllyOne += damage;
                    break;
                case 102:
                    svc.battleStats.totalDamageReceivedByAllyTwo += damage;
                    break;
                case 103:
                    svc.battleStats.totalDamageReceivedByAllyThree += damage;
                    break;
                case 104:
                    svc.battleStats.totalDamageReceivedByAllyFour += damage;
                    break;
                case 105:
                    svc.battleStats.totalDamageReceivedByAllyFive += damage;
                    break;
                default:
                    break;
            }
        }

        function resetBattleStats() {
            svc.battleStats = {
                totalDamageDealtToEnemy: 0,
                totalDamageDealtByAllyOne: 0,
                totalDamageDealtByAllyTwo: 0,
                totalDamageDealtByAllyThree: 0,
                totalDamageDealtByAllyFour: 0,
                totalDamageDealtByAllyFive: 0,

                totalDamageReceivedFromEnemy: 0,
                totalDamageReceivedByAllyOne: 0,
                totalDamageReceivedByAllyTwo: 0,
                totalDamageReceivedByAllyThree: 0,
                totalDamageReceivedByAllyFour: 0,
                totalDamageReceivedByAllyFive: 0,

                enemiesDefeated: 0,
                alliesFallen: 0,

                highestDamageDealt: 0,
                highestDamageDealtBy: null,

                totalTurns: 0,
                allyTurns: 0,
                enemyTurns: 0
            };
        }

        function turnComplete(turnActor) {
            svc.battleStats.totalTurns++;

            if (turnActor.id >= 200) {
                svc.battleStats.enemyTurns++;
            }

            if (turnActor.id < 200) {
                svc.battleStats.allyTurns++;
            }

            achievementsService.runEndTurnAchievementCheck(svc.battleStats);
        }
    }

})();
