(function () {
    'use strict';

    angular
        .module('outerZone')
        .service('progressTracker', progressTracker);

    function progressTracker() {
        var svc = this;

        svc.storyProgress = 0;
        svc.newAlly = -1;
        svc.fightOngoing = false;
        svc.battleWon = false;
        svc.fightType = null;

        svc.getStoryProgress = function () {
            return svc.storyProgress;
        };

        svc.advanceStory = function () {
            svc.storyProgress++;
        };

        svc.setBattleWon = function (result) {
            svc.battleWon = result;
        };

        svc.getBattleWon = function () {
            return svc.battleWon;
        };

        svc.setFightType = function (type) {
            svc.fightType = type;
        };

        svc.getFightType = function () {
            return svc.fightType;
        };

        svc.getNewAlly = function () {
            return svc.newAlly;
        };

        svc.addNewAlly = function () {
            svc.newAlly++;
        };

        svc.startFight = function () {
            svc.fightOngoing = true;
        };

        svc.stopFight = function () {
            svc.fightOngoing = false;
        };

        svc.loadGame = function (storyProgress, allyProgress) {
            svc.storyProgress = storyProgress;
            svc.newAlly = allyProgress;
        }
    }
})();
