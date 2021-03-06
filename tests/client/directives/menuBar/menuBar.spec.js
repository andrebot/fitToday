'use strict';

describe('MenuBar Directive', function () {

  beforeEach(module('fitToday.directives'));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$mdDialog_, _$mdToast_, _$cookies_, _UserService_, _localStorageService_) {
    this.mdDialog = _$mdDialog_;
    this.mdToast = _$mdToast_;
    this.userService = _UserService_;
    this.localStorageService = _localStorageService_;
    this.$controller = _$controller_;
    this.cookies = _$cookies_;
    this.rootScope = _$rootScope_;

    sinon.spy(this.mdDialog, 'show');
    sinon.spy(this.mdDialog, 'cancel');
    sinon.spy(this.mdDialog, 'hide');
    sinon.spy(this.mdToast, 'show');
    sinon.spy(this.mdToast, 'simple');
    sinon.spy(this.userService, 'logOut');
    sinon.spy(this.userService, 'logIn');
    sinon.spy(this.userService, 'save');
    sinon.spy(this.localStorageService, 'remove');
    sinon.spy(this.rootScope, '$broadcast');

    this.localStorageSet = sinon.spy(this.localStorageService, 'set');
  }));

  describe('MenuBar Controller', function () {
    beforeEach(function() {
      this.controller = this.$controller('MenuBarController', {$scope: {}});
    });

    it('should have all its variables configured with their default values if user is not logged in', function () {
      this.controller.isLoggedIn.should.be.false;
      this.controller.userName.should.be.empty;
      should.exist(this.controller.documentElement);
    });

    it('should set the local varialbes if the user is logged in', function () {
      sinon.stub(this.cookies, 'get', function () {
        var metadata = btoa(JSON.stringify({method: 'b64'}));
        var payload = btoa(JSON.stringify({name: 'andre'}));
        var signature = btoa(JSON.stringify({secret: 'anything'}));

        return metadata + '.' + payload + '.' + signature;
      });

      this.controller = this.$controller('MenuBarController', {$scope: {}});

      this.controller.isLoggedIn.should.be.true;
      this.controller.userName.should.not.be.empty;
    });

    it('should broadcast the event \'loggedIn\'', function () {
      this.controller.isLoggedIn = true;
      this.controller.handleDocumentReady();

      this.rootScope.$broadcast.should.have.been.calledOnce;
      this.rootScope.$broadcast.should.have.been.calledWith('loggedIn');
    });

    it('should open the login modal', function () {
      this.controller.openLoginModal();

      this.mdDialog.show.should.have.been.calledOnce;
    });

    it('should open the register modal', function () {
      this.controller.openRegisterModal();

      this.mdDialog.show.should.have.been.calledOnce;
    });

    it('should show a toast and set the user as logged in', function () {
      this.controller.loggedResponse({msg: 'test1', userName: 'my test.'});

      this.mdToast.show.should.have.been.calledOnce;
      this.mdToast.simple.should.have.been.calledOnce;
      should.exist(this.controller.isLoggedIn);
      should.exist(this.controller.userName);
      this.controller.isLoggedIn.should.be.true;
      this.controller.userName.should.not.be.empty;
    });

    it('should show a toast and set the user as logged out if a modal send an error msg', function (){
      this.controller.loggedOutResponse('there was an error.');

      this.mdToast.show.should.have.been.calledOnce;
      this.mdToast.simple.should.have.been.calledOnce;
      this.controller.isLoggedIn.should.be.false;
      this.controller.userName.should.be.empty;
    });

    it('should keep the controller state if a modal send no error msg', function () {
      this.controller.loggedOutResponse();

      this.mdToast.show.should.not.have.been.calledOnce;
      this.mdToast.simple.should.not.have.been.calledOnce;
      this.controller.isLoggedIn.should.be.false;
      this.controller.userName.should.be.empty;

      this.controller.isLoggedIn = true;
      this.controller.userName = 'test';

      this.controller.loggedOutResponse();

      this.mdToast.show.should.not.have.been.calledOnce;
      this.mdToast.simple.should.not.have.been.calledOnce;
      this.controller.isLoggedIn.should.be.true;
      this.controller.userName.should.not.be.empty;
    });

    it('should call the logout srvice', function () {
      this.controller.logOut();

      this.userService.logOut.should.have.been.calledOnce;
    });

    it('should clear the localstorage if the user was logged out', function () {
      this.controller.logOutSuccess({data: 'logged out'});

      sinon.spy(this.controller, 'loggedOutResponse');

      this.localStorageService.remove.should.have.been.calledOnce;
      this.localStorageService.remove.should.have.been.calledWith('localUser');
    });

    it('should broadcast the event \'newMeal\' and toast a message after creating a new meal', function () {
      this.controller.createMealResponse({meal: {}});

      this.mdToast.show.should.have.been.calledOnce;
      this.mdToast.simple.should.have.been.calledOnce;
      this.rootScope.$broadcast.should.have.been.calledOnce
      this.rootScope.$broadcast.should.have.been.calledWith('newMeal');
    });

    it('should toast an error msg', function () {
      this.controller.errorResponse('error message');

      this.mdToast.show.should.have.been.calledOnce;
      this.mdToast.simple.should.have.been.calledOnce;
    });

    it('should open the create meal modal', function () {
      this.controller.openCreateMealModal();

      this.mdDialog.show.should.have.been.calledOnce;
    });

    it('should set a user as logged if we still have the cookie', function () {
      sinon.stub(this.cookies, 'get', function () {
        var metadata = btoa(JSON.stringify({method: 'b64'}));
        var payload = btoa(JSON.stringify({name: 'andre'}));
        var signature = btoa(JSON.stringify({secret: 'anything'}));

        return metadata + '.' + payload + '.' + signature;
      });

      this.controller.verifyUserLoggedIn();

      this.controller.isLoggedIn.should.be.true;
      this.controller.userName.should.not.be.empty;
    });

    it('should keep its state if there is no user cookie', function () {
      sinon.stub(this.cookies, 'get', function () {
        return null;
      });

      this.controller.verifyUserLoggedIn();

      this.controller.isLoggedIn.should.be.false;
      this.controller.userName.should.be.empty;
    });
  });

  describe('Login Controller', function () {
    beforeEach(function () {
      this.controller = this.$controller('loginController', {$scope: {}});
    });

    it('should have all its variables configured with their default values', function() {
      this.controller.login.email.should.be.empty;
      this.controller.login.password.should.be.empty;
    });

    it('should close the modal', function () {
      this.controller.hide();

      this.mdDialog.cancel.should.have.been.calledOnce;
    });

    it('should call the login service', function () {
      this.controller.logIn();

      this.userService.logIn.should.have.been.calledOnce;
    });

    it('should refresh the loggin info and close the modal successfuly', function () {
      this.controller.loginSuccessful({
        email: 'test@gmail.com',
        name: 'test',
        role: 'user',
        id: 'a123k'
      });

      this.localStorageService.remove.should.have.been.calledWith('localUser');
      this.localStorageService.set.should.have.been.calledOnce;
      this.mdDialog.hide.should.have.been.calledOnce;
    });

    it('should remove the loggin info and close the modal with error if localstorage is out', function () {
      this.localStorageSet.restore();

      sinon.stub(this.localStorageService, 'set', function () {
        return false;
      });

      this.controller.loginSuccessful({
        email: 'test@gmail.com',
        name: 'test',
        role: 'user',
        id: 'a123k'
      });

      this.localStorageService.remove.should.have.been.calledWith('localUser');
      this.localStorageService.set.should.have.been.calledOnce;
      this.mdDialog.cancel.should.have.been.calledOnce;
      this.mdDialog.hide.should.have.not.been.calledOnce;
    });

    it('should close the modal if the server couldn\'t login the user', function () {
      this.controller.loginFail();

      this.mdDialog.cancel.should.have.been.calledOnce;
    });
  });

  describe('Register Controller', function () {
    beforeEach(function() {
      this.controller = this.$controller('registerController', {$scope: {}});
    });

    it('should have all its variables configured with their default values', function () {
      should.exist(this.controller.user);
      this.controller.user.name.should.be.empty;
      this.controller.user.email.should.be.empty;
      this.controller.user.password.should.be.empty;
      this.controller.user.confirmPassword.should.be.empty;
    });

    it('should close the modal', function () {
      this.controller.hide();

      this.mdDialog.cancel.should.have.been.calledOnce;
    });

    it('should call the save user endpoint', function () {
      this.controller.register();

      this.userService.save.should.have.been.calledOnce;
    });

    it('should reset the logged user info and close the model without error', function () {
      this.controller.registerSuccess({
        name: 'test',
        email: 'test@gmail.com',
        role: 'user',
        id: 'a123c'
      });

      this.localStorageService.remove.should.have.been.calledWith('localUser');
      this.localStorageService.set.should.have.been.calledOnce;
      this.mdDialog.hide.should.have.been.calledOnce;
    });

    it('should remove the loggin info and close the modal with error if localstorage is out', function () {
      this.localStorageSet.restore();

      sinon.stub(this.localStorageService, 'set', function () {
        return false;
      });

      this.controller.registerSuccess({
        email: 'test@gmail.com',
        name: 'test',
        role: 'user',
        id: 'a123k'
      });

      this.localStorageService.remove.should.have.been.calledWith('localUser');
      this.localStorageService.set.should.have.been.calledOnce;
      this.mdDialog.cancel.should.have.been.calledOnce;
      this.mdDialog.hide.should.have.not.been.calledOnce;
    });

    it('should close the modal if the register fail in the server', function () {
      this.controller.registerFail();

      this.mdDialog.cancel.should.have.been.calledOnce;
    });
  });
});