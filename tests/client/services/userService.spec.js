'use strict';

describe('Services', function () {

  beforeEach(module('fitToday.services'));

  beforeEach(inject(function (_UserService_) {
    this.userService = _UserService_;
  }));

  describe('User Service', function () {
    it('should have \'logIn\' and \'logOut\' functions', function () {
      should.exist(this.userService.logIn);
      should.exist(this.userService.logOut);
    });
  });
});
