var StrongPasswordField = (function() {
  var StrongPasswordField = function() {
    this.min_length = 6;
    this.strongPasswordFields = [];
  };

  StrongPasswordField.prototype.validate = function() {
    this.strongPasswordFields = this.getStrongPasswordFields();
    for (var i = 0; i < this.strongPasswordFields.length; i++) {
      this.strongPasswordFields[i].addEventListener('input', this.onValidate)
    }
  };

  StrongPasswordField.prototype.onValidate = function() {
    console.log(this)
  }

  StrongPasswordField.prototype.getStrongPasswordFields = function() {
    return document.querySelectorAll('input[type="password"][data-strong-password=true]');
  };

  return StrongPasswordField;
})();