(function () {
    'use strict';

    angular
        .module('outerZone')
        .service('gameStats', gameStatsService);

    gameStatsService.$inject = ['achievementsService'];

    function gameStatsService(achievementsService) {
        var svc = this;

        svc.setGameStats = setGameStats;
        svc.mergeInBattleStats = mergeInBattleStats;

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

            highestDamageDealt: 0
        };

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
            highestDamageDealtBy: null

        };

        function setGameStats(stats) {
            svc.gameStats = stats;
        }

        function mergeInBattleStats(stats, battleType) {
            svc.gameStats.totalDamageDealtToEnemy += stats.totalDamageDealtToEnemy;
            svc.gameStats.totalDamageDealtByAllyOne += stats.totalDamageDealtByAllyOne;
            svc.gameStats.totalDamageDealtByAllyTwo += stats.totalDamageDealtByAllyTwo;
            svc.gameStats.totalDamageDealtByAllyThree += stats.totalDamageDealtByAllyThree;
            svc.gameStats.totalDamageDealtByAllyFour += stats.totalDamageDealtByAllyFour;
            svc.gameStats.totalDamageDealtByAllyFive += stats.totalDamageDealtByAllyFive;

            svc.gameStats.totalDamageRecievedFromEnemy += stats.totalDamageRecievedFromEnemy;
            svc.gameStats.totalDamageRecievedByAllyOne += stats.totalDamageRecievedByAllyOne;
            svc.gameStats.totalDamageRecievedByAllyTwo += stats.totalDamageRecievedByAllyTwo;
            svc.gameStats.totalDamageRecievedByAllyThree += stats.totalDamageRecievedByAllyThree;
            svc.gameStats.totalDamageRecievedByAllyFour += stats.totalDamageRecievedByAllyFour;
            svc.gameStats.totalDamageRecievedByAllyFive += stats.totalDamageRecievedByAllyFive;

            svc.gameStats.enemiesDefeated += stats.enemiesDefeated;
            svc.gameStats.alliesFallen += stats.alliesFallen;

            if (stats.highestDamageDealt > svc.gameStats.highestDamageDealt) {
                svc.gameStats.highestDamageDealt = stats.highestDamageDealt;
                svc.gameStats.highestDamageDealtBy = stats.highestDamageDealtBy;
            }

            svc.gameStats.totalBattlesWon++;

            if (battleType === 'Arena') {
                svc.gameStats.arenaBattlesWon++;
            }

            if (battleType === 'Story') {
                svc.gameStats.storyBattlesWon++;
            }

            achievementsService.runEndBattleAchievementCheck(svc.battleStats, svc.gameStats);

            resetBattleStats();
        }

        function resetBattleStats() {

        }
    }

})();
