(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('enemiesFightDisplay', enemiesFightDisplay);

  enemiesFightDisplay.$inject = ["enemiesService"];

  function enemiesFightDisplay(enemiesService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/enemiesFightDisplay/enemiesFightDisplay.html',
      controller: enemiesFightDisplayController,
      controllerAs: 'enemiesFightDisplay',
      bindToController: true
    };

    return directive;

    function enemiesFightDisplayController() {
      var vm = this;

      vm.enemies = enemiesService.enemies;
      vm.enemyCount = 0;

      angular.forEach(vm.enemies, function(enemy) {
        if (enemy.active) {
          vm.enemyCount++
        }
        enemy.percentageHealth = (enemy.health/enemy.maxHealth)*100 + '%';
      });

      vm.cardWidth = (90/vm.enemyCount).toString() + '%';

    }
  }
})();
