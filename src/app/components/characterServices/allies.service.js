(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('alliesService', alliesService);

  function alliesService() {
    var vm = this;

    vm.allies = [
      {
        'name' : 'The Scarecrow',
        'level' : 1,
        'active' : true,
        'maxHealth' : 150,
        'health' : 150,
        'maxEnergy' : 10,
        'energy' : 10
      },
      {
        'name' : 'Dorothy',
        'level' : 1,
        'active' : true,
        'maxHealth' : 200,
        'health' : 200,
        'maxEnergy' : 25,
        'energy' : 25
      },
      {
        'name' : 'The Lion',
        'level' : 1,
        'active' : true,
        'maxHealth' : 300,
        'health' : 300,
        'maxEnergy' : 20,
        'energy' : 10
      },
      {
        'name' : 'Tin Man',
        'level' : 1,
        'active' : true,
        'maxHealth' : 500,
        'health' : 500,
        'maxEnergy' : 12,
        'energy' : 12
      },
      {
        'name' : 'The Wizard',
        'level' : 1,
        'active' : false,
        'maxHealth' : 1000,
        'health' : 1000,
        'maxEnergy' : 30,
        'energy' : 30
      }
    ];

  }
})();
