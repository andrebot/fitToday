'user strict';

class Validators {
  constructor() {
    this.name = /^[a-zA-Z0-9\u00C0-\u00FF\-\_\\\s\.\,\#\!\*\+\:\;\@\(\)\&\'\?\"\$\%]*$/;
    this.email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  isEmailValid(email) {
    return this.email.test(email);
  }
}

module.exports = new Validators();
