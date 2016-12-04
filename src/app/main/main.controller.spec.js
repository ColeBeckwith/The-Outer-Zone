(function() {
  'use strict';

  describe('controllers', function(){
    // var vm;
    
    beforeEach(module('outerZone'));
    beforeEach(inject(function(_$controller_, _$timeout_, _webDevTec_, _toastr_) {
      spyOn(_webDevTec_, 'getTec').and.returnValue([{}, {}, {}, {}, {}]);
      spyOn(_toastr_, 'info').and.callThrough();

      // vm = _$controller_('MainController');
    }));
    
    
  });
})();
