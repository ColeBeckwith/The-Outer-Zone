(function() {
  'use strict';

  angular
    .module('outerZone')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
    
      .state('fight', {
        url: '/fight',
        templateUrl: 'app/fight/fight.html',
        controller: 'FightController',
        controllerAs: 'fight'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
