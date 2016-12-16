(function() {
  'use strict';

  describe('allyHotkeysService', function() {
    var hks;
    var alliesService;

    beforeEach(module('outerZone'));

    beforeEach(inject(function (_allyHotkeysService_, _alliesService_) {
      hks = _allyHotkeysService_;
      alliesService = _alliesService_;
      this.defaultCharacter = alliesService.allies[0];
      this.defaultBuild = alliesService.builds[0][0];
      alliesService.setClassForAlly(this.defaultCharacter, this.defaultBuild);
    }));


  });

})();
