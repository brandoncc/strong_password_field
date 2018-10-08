var Rdun = (function() {
  var Rdun = function() {
    this.min_length = 6;
    this.strongPasswordFields = [];
  };

  Rdun.prototype.validate = function() {
    this.strongPasswordFields = this.getStrongPasswordFields();
    for (var i = 0; i < this.strongPasswordFields.length; i++) {
      this.strongPasswordFields[i].addEventListener('input', this.onValidate)
    }
  };

  Rdun.prototype.onValidate = function() {
    console.log(this)
  }

  Rdun.prototype.getStrongPasswordFields = function() {
    return document.querySelectorAll('input[type="password"][data-strong-password=true]');
  };

  return Rdun;
})();