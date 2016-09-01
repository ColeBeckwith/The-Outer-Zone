/**
 * Created by CBeckwith411 on 8/31/16.
 */
(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('enemiesService', enemiesService);

  function enemiesService() {
    var vm = this;

    vm.enemies = [
      {
        'name' : 'Flying Monkey',
        'active' : true,
        'maxHealth' : 75,
        'health' : 75
      },
      {
        'name' : 'Witch',
        'active' : true,
        'maxHealth' : 1000,
        'health' : 1000
      },
      {
        'name' : 'Flying Monkey',
        'active' : true,
        'maxHealth' : 75,
        'health' : 75
      }
    ]
  }
})();
