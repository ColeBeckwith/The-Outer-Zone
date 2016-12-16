(function() {
  'use strict';

  angular
    .module('outerZone')
    .service('achievementsService', achievementsService);

  function achievementsService() {
    var svc = this;

    svc.achievements = [
      {
        name: '',
        id: 1,
        description: '',
        unlocked: false,
        unlockedOn: null,
        secret: false
      },
      {
        name: '',
        id: 2,
        description: '',
        unlocked: false,
        unlockedOn: null,
        secret: false
      },
      {
        name: '',
        id: 3,
        description: '',
        unlocked: false,
        unlockedOn: null,
        secret: false
      }
    ];

    svc.unlockAchievement = unlockAchievement;

    function unlockAchievement(achievement) {

    }
  }

})();
