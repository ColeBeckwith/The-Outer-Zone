(function () {
    'use strict';

    angular
        .module('outerZone')
        .service('achievementsService', achievementsService);

    achievementsService.$inject = ["toastr"];

    function achievementsService(toastr) {
        var svc = this;

        svc.achievements = [
            {
                displayName: 'Street Fighting Man',
                alias: 'Unlock First Character',
                displayOrder: 1,
                unlockedDescription: 'Unlocked the Scarecrow.',
                lockedDescription: 'Unlock First Character.',
                unlocked: false,
                requirements: {
                    characterUnlocked: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Not In Kansas Anymore',
                alias: 'Unlock Second Character',
                displayOrder: 2,
                unlockedDescription: 'Unlocked D. Taylor.',
                lockedDescription: 'Unlock Second Character.',
                unlocked: false,
                requirements: {
                    characterUnlocked: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Apex Predator',
                alias: 'Unlock Third Character',
                displayOrder: 3,
                unlockedDescription: 'Unlocked Leon.',
                lockedDescription: 'Unlock Third Character.',
                unlocked: false,
                requirements: {
                    characterUnlocked: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Heartless',
                alias: 'Unlock Fourth Character',
                displayOrder: 4,
                unlockedDescription: 'Unlocked Tin Man.',
                lockedDescription: 'Unlock Fourth Character.',
                unlocked: false,
                requirements: {
                    characterUnlocked: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Upgrade Complete',
                alias: 'Unlock Fifth Character',
                displayOrder: 5,
                unlockedDescription: 'Unlocked The Wizard.',
                lockedDescription: 'Unlock Fifth Character.',
                unlocked: false,
                requirements: {
                    characterUnlocked: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'An English Ton Of Damage',
                alias: '2000 Damage',
                displayOrder: 2,
                unlockedDescription: 'Dealt 2000 cumulative damage to the enemy.',
                lockedDescription: 'Deal 2000 cumulative damage to the enemy.',
                description: 'Deal 2000 cumulative damage to the enemy.',
                unlocked: false,
                requirements: {
                    damageMet: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'A Metric Ton Of Damage',
                alias: '2205 Damage',
                displayOrder: 3,
                unlockedDescription: 'Dealt 2205 cumulative damage to the enemy.',
                lockedDescription: 'Deal 2205 cumulative damage to the enemy.',
                unlocked: false,
                requirements: {
                    damageMet: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Hope You Didn\'t Chip a Nail',
                alias: 'Beat Game on Easy',
                displayOrder: 3,
                unlockedDescription: 'Beat the game on Easy.',
                lockedDescription: 'Beat the game on Easy.',
                unlocked: false,
                requirements: {
                    beatTheGame: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Everyone Just Calls Me Chaw',
                alias: 'Beat Game on Normal',
                displayOrder: 3,
                unlockedDescription: 'Beat the game on Normal. Now that\'s checked.',
                lockedDescription: 'Beat the game on Normal. Be a normal guy.',
                unlocked: false,
                requirements: {
                    beatTheGame: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Tough Guy',
                alias: 'Beat Game on Hard',
                displayOrder: 3,
                unlockedDescription: 'Beat the game on Hard.',
                lockedDescription: 'Beat the game on Hard.',
                unlocked: false,
                requirements: {
                    startedGameOnHardOrHigher: false,
                    beatTheGame: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Captain Insano',
                alias: 'Beat Game on Insane',
                displayOrder: 3,
                unlockedDescription: 'Beat the game on Insane.',
                lockedDescription: 'Beat the game on Insane.',
                unlocked: false,
                requirements: {
                    startedGameOnInsaneOrHigher: false,
                    beatTheGame: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Chief Bromden',
                alias: 'Double Insanity',
                displayOrder: 4,
                unlockedDescription: 'Won an insane fight in the Arena while on Insane difficulty.',
                lockedDescription: 'Win an Insane fight in the Arena while on Insane difficulty.',
                unlocked: false,
                requirements: {
                    gameDifficultyInsane: false,
                    matchDifficultyInsane: false,
                    wonMatch: false
                },
                unlockedDate: null,
                secret: false
            }
        ];

        svc.unlockAchievement = unlockAchievement;
        svc.updatePercentageComplete = updatePercentageComplete;
        svc.characterUnlockAchievement = characterUnlockAchievement;
        svc.getAchievementByAlias = getAchievementByAlias;
        svc.setAchievements = setAchievements;

        updatePercentageComplete();

        function unlockAchievement(achievement) {
            toastr.success('Achievement Unlocked: ' + achievement.displayName);
            var date = new Date();
            achievement.unlockedDate = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
            achievement.unlocked = true;
            updatePercentageComplete();
        }

        function characterUnlockAchievement(character) {
            var alias;

            switch (character.id) {
                case 101:
                    alias = 'Unlock First Character';
                    break;
                case 102:
                    alias = 'Unlock Second Character';
                    break;
                case 103:
                    alias = 'Unlock Third Character';
                    break;
                case 104:
                    alias = 'Unlock Fourth Character';
                    break;
                case 105:
                    alias = 'Unlock Fifth Character';
                    break;
                default:
                    break;
            }

            unlockAchievement(getAchievementByAlias(alias));
        }

        function getAchievementByAlias(alias) {
            for (var i = 0; i < svc.achievements.length; i++) {
                if (svc.achievements[i].alias === alias) {
                    return svc.achievements[i];
                }
            }
        }

        function updatePercentageComplete() {
            var unlockedCount = 0;
            angular.forEach(svc.achievements, function (achievement) {
                if (achievement.unlocked) {
                    unlockedCount++;
                }
            });
            svc.percentageComplete = (unlockedCount / svc.achievements.length) * 100;
        }

        function setAchievements(achievements) {
            svc.achievements = achievements;
            updatePercentageComplete();
        }


    }

})();
