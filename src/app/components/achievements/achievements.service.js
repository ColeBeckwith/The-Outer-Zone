(function () {
    'use strict';

    angular
        .module('outerZone')
        .service('achievementsService', achievementsService);

    achievementsService.$inject = ["toastr"];

    function achievementsService(toastr) {
        var svc = this;

        svc.recentlyUnlockedAchievements = [];

        svc.achievements = [
            {
                displayName: 'Off To See The Wizard',
                alias: 'Start the Game',
                displayOrder: 1,
                unlockedDescription: 'Started the Game.',
                lockedDescription: 'Start the Game. Wait... how are you even seeing this?',
                unlocked: false,
                requirements: {
                    startedTheGame: false
                },
                unlockedDate: null,
                secret: false
            },
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
                displayName: 'Full Circle',
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
                displayName: 'Rome Wasn\'t Built In a Day',
                alias: 'Level 2 Character',
                displayOrder: 6,
                unlockedDescription: 'Had a character reach level 2.',
                lockedDescription: 'Have a character reach level 2.',
                unlocked: false,
                requirements: {
                    characterLevelReached: false,
                    current: 0,
                    needed: 2
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Big One O',
                alias: 'Level 10 Character',
                unlockedDescription: 'Had a character reach Level 10.',
                lockedDescription: 'Have a character reach Level 10.',
                unlocked: false,
                requirements: {
                    characterLevelReached: false,
                    current: 0,
                    needed: 10
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'No Quarter',
                alias: 'Level 25 Character',
                unlockedDescription: 'Had a character reach Level 25.',
                lockedDescription: 'Have a character reach Level 25.',
                unlocked: false,
                requirements: {
                    characterLevelReached: false,
                    current: 0,
                    needed: 25
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Halfway To Heaven...',
                alias: 'Level 50 Character',
                unlockedDescription: 'Had a character reach Level 50.',
                lockedDescription: 'Have a character reach Level 50.',
                unlocked: false,
                requirements: {
                    characterLevelReached: false,
                    current: 0,
                    needed: 50
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: '...With Paradise Waiting',
                alias: 'Level 75 Character',
                unlockedDescription: 'Had a character reach Level 75.',
                lockedDescription: 'Have a character reach Level 75.',
                unlocked: false,
                requirements: {
                    characterLevelReached: false,
                    current: 0,
                    needed: 75
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Centennial Man',
                alias: 'Level 100 Character',
                displayOrder: 6,
                unlockedDescription: 'Had a character reach level 100.',
                lockedDescription: 'Have a character reach level 100.',
                unlocked: false,
                requirements: {
                    characterLevelReached: false,
                    current: 0,
                    needed: 100
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'An English Ton Of Damage',
                alias: '2000 Total Damage Delivered',
                displayOrder: 2,
                unlockedDescription: 'Dealt 2000 cumulative damage to the enemy.',
                lockedDescription: 'Deal 2000 cumulative damage to the enemy.',
                description: 'Deal 2000 cumulative damage to the enemy.',
                unlocked: false,
                requirements: {
                    damageMet: false,
                    current: 0,
                    needed: 2000
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'A Metric Ton Of Damage',
                alias: '2205 Total Damage Delivered',
                displayOrder: 3,
                unlockedDescription: 'Dealt 2205 cumulative damage to the enemy.',
                lockedDescription: 'Deal 2205 cumulative damage to the enemy.',
                unlocked: false,
                requirements: {
                    damageMet: false,
                    current: 0,
                    needed: 2205
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Ten Ton Hammer',
                alias: '20000 Total Damage Delivered',
                displayOrder: 4,
                unlockedDescription: 'Dealt 20,000 cumulative damage to the enemy.',
                lockedDescription: 'Deal 20,000 cumulative damage to the enemy.',
                unlocked: false,
                requirements: {
                    damageMet: false,
                    current: 0,
                    needed: 20000
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Punching Bag',
                alias: '2000 Total Damage Taken',
                displayOrder: 5,
                unlockedDescription: 'Took 2000 cumulative damage from the enemy.',
                lockedDescription: 'Take 2000 cumulative damage from the enemy.',
                unlocked: false,
                requirements: {
                    damageMet: false,
                    current: 0,
                    needed: 2000
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Body Bag',
                alias: '20000 Total Damage Taken',
                displayOrder: 6,
                unlockedDescription: 'Took 20,000 cumulative damage from the enemy.',
                lockedDescription: 'Take 20,000 cumulative damage from the enemy.',
                unlocked: false,
                requirements: {
                    damageMet: false,
                    current: 0,
                    needed: 20000
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'King of the Ring',
                alias: 'Win 100 Arena Matches',
                displayOrder: 8,
                unlockedDescription: 'Won 100 Arena Matches.',
                lockedDescription: 'Win 100 Arena Matches.',
                requirements: {
                    wonMatches: false,
                    current: 0,
                    needed: 100
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Blink and You\'ll Miss It',
                alias: 'Win in 3 Turns',
                displayOrder: 7,
                unlockedDescription: 'Won a match in three turns.',
                lockedDescription: 'Win a match in three turns.',
                unlocked: false,
                requirements: {
                    wonInThree: false
                },
                unlockedDate: null,
                secret: false
            },
            {
                displayName: 'Runaround Sue',
                alias: '200 Turns Lasted',
                displayOrder: 7,
                unlockedDescription: 'Ran around for 200 turns.',
                lockedDescription: 'Drag a match out for 200 turns.',
                unlocked: false,
                requirements: {
                    twoHundredTurns: false
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
            },
            {
                displayName: 'Book Worm',
                alias: 'Read Tutorial',
                displayOrder: 14,
                unlockedDescription: 'I can\'t believe you actually read the tutorial.',
                secretDescription: 'Nerd.',
                unlocked: false,
                requirements: {
                    readTutorial: false
                },
                secret: true
            },
            {
                displayName: 'Why Even Name This Achievement?',
                alias: 'Beat New Game+',
                displayOrder: 15,
                unlockedDescription: 'Seriously? This game is not that good.',
                secretDescription: 'You\'ll Never Get This.',
                unlocked: false,
                requirements: {
                    beatNewGamePlus: false
                },
                secret: true
            }
        ];

        svc.unlockAchievement = unlockAchievement;
        svc.updatePercentageComplete = updatePercentageComplete;
        svc.allyUnlockAchievement = allyUnlockAchievement;
        svc.allyLeveledUp = allyLeveledUp;
        svc.runEndBattleAchievementCheck = runEndBattleAchievementCheck;
        svc.runEndTurnAchievementCheck = runEndTurnAchievementCheck;
        svc.getAchievementByAlias = getAchievementByAlias;
        svc.setAchievements = setAchievements;
        svc.readTutorial = readTutorial;

        updatePercentageComplete();

        function unlockAchievement(achievement) {
            if (!achievement.unlocked) {
                var date = new Date();
                achievement.unlockedDate = (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
                achievement.unlocked = true;
                svc.recentlyUnlockedAchievements.push(achievement);
                updatePercentageComplete();
            }
        }

        function allyUnlockAchievement(character) {
            var alias;

            switch (character.id) {
                case 101:
                    alias = 'Unlock First Character';
                    // This is a hack just to show off how the game handles multiple achievement unlocks.
                    unlockAchievement(getAchievementByAlias('Start the Game'));
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

        function allyLeveledUp(character) {
            // TODO could store the achievements on the service so they don't have to loop through five time to get
            // them. Would need to add another call to setAchievements to refresh them.

            var levelBasedAchievements = [
                getAchievementByAlias('Level 2 Character'),
                getAchievementByAlias('Level 10 Character'),
                getAchievementByAlias('Level 25 Character'),
                getAchievementByAlias('Level 50 Character'),
                getAchievementByAlias('Level 75 Character'),
                getAchievementByAlias('Level 100 Character')
            ];

            levelBasedAchievements.forEach(function (achievement) {
                if (!achievement.unlocked && character.level > achievement.requirements.current) {
                    achievement.requirements.current = character.level;
                    if (achievement.requirements.current >= achievement.requirements.needed) {
                        achievement.requirements.characterLevelReached = true;
                        unlockAchievement(achievement);
                    }
                }
            });

        }

        function runEndBattleAchievementCheck(battleStats, gameStats, playerWon) {
            totalDamageAchievementCheck(gameStats);

            if (battleStats.allyTurns <= 3 && playerWon) {
                unlockAchievement(getAchievementByAlias('Win in 3 Turns'));
            }
        }

        function runEndTurnAchievementCheck(battleStats) {
            if (battleStats.totalTurns >= 200) {
                unlockAchievement(getAchievementByAlias('200 Turns Lasted'));
            }
        }

        function totalDamageAchievementCheck(gameStats) {
            var damageDeliveredAchievements = [
                getAchievementByAlias('2000 Total Damage Delivered'),
                getAchievementByAlias('2205 Total Damage Delivered'),
                getAchievementByAlias('20000 Total Damage Delivered')
            ];

            damageDeliveredAchievements.forEach(function (achievement) {
                if (!achievement.unlocked) {
                    achievement.requirements.current = gameStats.totalDamageDealtToEnemy;
                    if (achievement.requirements.current >= achievement.requirements.needed) {
                        achievement.requirements.damageMet = true;
                        achievement.requirements.current = achievement.requirements.needed;
                        unlockAchievement(achievement);
                    }
                }
            });

            var damageReceivedAchievements = [
                getAchievementByAlias('2000 Total Damage Taken'),
                getAchievementByAlias('20000 Total Damage Taken')
            ];

            damageReceivedAchievements.forEach(function (achievement) {
                if (!achievement.unlocked) {
                    achievement.requirements.current = gameStats.totalDamageReceivedFromEnemy;
                    if (achievement.requirements.current >= achievement.requirements.needed) {
                        achievement.requirements.damageMet = true;
                        achievement.requirements.current = achievement.requirements.needed;
                        unlockAchievement(achievement);
                    }
                }
            });
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

        function readTutorial() {
            unlockAchievement(getAchievementByAlias('Read Tutorial'));
        }

    }

})();
