(function() {
  'use strict';

  angular
    .module('outerZone')
    .directive('movesList', movesList);

  movesList.$inject = ["alliesService"];

  function movesList(alliesService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/movesList/movesList.html',
      controller: movesListCtrl,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function movesListCtrl() {
      var vm = this;

      activate();

      function activate() {
        vm.moves = [];
        angular.forEach(alliesService.activeAllies, function(ally) {
          angular.forEach(ally.moves, function(move) {
            for (var i = 0; i < vm.moves.length; i++) {
              if (vm.moves[i].name === move.name) {
                return;
              }
            }
            vm.moves.push(move);

          })
        });
      }
    }
  }
})();

