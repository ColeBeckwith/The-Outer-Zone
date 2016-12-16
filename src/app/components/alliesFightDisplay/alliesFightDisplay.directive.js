(function () {
  'use strict';

  angular
    .module('outerZone')
    .directive('alliesFightDisplay', alliesFightDisplay);

  alliesFightDisplay.$inject = ["alliesService", "movesService", "fightQueueService", "hotkeys", "allyHotkeysService"];

  function alliesFightDisplay(alliesService, movesService, fightQueueService, hotkeys, allyHotkeysService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/alliesFightDisplay/alliesFightDisplay.html',
      controller: alliesFightDisplayController,
      controllerAs: 'alliesFightDisplay',
      bindToController: true
    };

    return directive;

    function alliesFightDisplayController($scope) {
      var vm = this;

      vm.selectMove = selectMove;
      vm.clickAlly = clickAlly;
      vm.pass = pass;

      activate();

      function activate() {
        vm.targetSelectMode = alliesService.targetSelectMode;
        vm.activeAllies = alliesService.activeAllies;
        vm.movesService = movesService;
        vm.alliesService = alliesService;
        vm.movesService = movesService;
        //TODO Temporary solution. Don't want to expose entire services, but certain primitives are needed.

        vm.cardWidth = (90 / vm.activeAllies.length).toString() + '%';
      }

      function selectMove(move) {
        fightQueueService.selectMove(move);
      }

      function clickAlly(ally) {
        if (vm.alliesService.targetSelectMode > 0) {
          fightQueueService.actionOnAlly(ally);
        }
      }

      // After a player has moved. Their only option should be to pass and not rest.
      function pass() {
        fightQueueService.endTurn();
      }

      // Hotkeys
      hotkeys.bindTo($scope)
        .add({
          combo: 'p',
          description: 'Pass.',
          callback: function(event, hotkey) {
            vm.pass();
          }
        })
        .add({
          combo: '1',
          description: 'Select first move.',
          callback: function(event) {
            allyHotkeysService.handleNumberPress(event);
          }
        })
        .add({
          combo: '2',
          description: 'Select second move.',
          callback: function(event) {
            allyHotkeysService.handleNumberPress(event);
          }
        })
        .add({
          combo: '3',
          description: 'Select third move.',
          callback: function(event) {
            allyHotkeysService.handleNumberPress(event);
          }
        })
        .add({
          combo: '4',
          description: 'Select fourth move.',
          callback: function(event) {
            allyHotkeysService.handleNumberPress(event);
          }
        })
        .add({
          combo: '5',
          description: 'Select fifth move.',
          callback: function(event) {
            allyHotkeysService.handleNumberPress(event);
          }
        })
        .add({
          combo: 'up',
          description: 'Move up 1 cell.',
          callback: function(event) {
            allyHotkeysService.handleArrowPress(event);
          }
        })
        .add({
          combo: 'down',
          description: 'Move down 1 cell.',
          callback: function(event) {
            allyHotkeysService.handleArrowPress(event);
          }
        })
        .add({
          combo: 'right',
          description: 'Move right 1 cell.',
          callback: function(event) {
            allyHotkeysService.handleArrowPress(event);
          }
        })
        .add({
          combo: 'left',
          description: 'Move left 1 cell.',
          callback: function(event) {
            allyHotkeysService.handleArrowPress(event);
          }
        })
        .add({
          combo: 'w',
          description: 'Move up 1 cell.',
          callback: function(event) {
            allyHotkeysService.handleArrowPress(event);
          }
        })
        .add({
          combo: 's',
          description: 'Move down 1 cell.',
          callback: function(event) {
            allyHotkeysService.handleArrowPress(event);
          }
        })
        .add({
          combo: 'd',
          description: 'Move right 1 cell.',
          callback: function(event) {
            allyHotkeysService.handleArrowPress(event);
          }
        })
        .add({
          combo: 'a',
          description: 'Move left 1 cell.',
          callback: function(event) {
            allyHotkeysService.handleArrowPress(event);
          }
        })
        .add({
          combo: 'space',
          description: 'Auto Attack.',
          callback: function(event) {
            allyHotkeysService.handleSpacebarPress(event);
          }
        })


    }

  }
})();
