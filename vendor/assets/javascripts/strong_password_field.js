
var StrongPasswordField = (function() {
  var StrongPasswordField = function() {
    this.min_length = 6;
    this.strongPasswordFields = [];
    this.strengthMetaData = {
      score: 0,
      text: ''
    };
  };

  StrongPasswordField.prototype.validate = function() {
    this.strongPasswordFields = this.getStrongPasswordFields();
    for (var i = 0; i < this.strongPasswordFields.length; i++) {
      this.strongPasswordFields[i].addEventListener('input', this.onValidate.bind(this))
    }
  };

  StrongPasswordField.prototype.onValidate = function(e) {
    var password = e.target.value;
    if (window.zxcvbn === undefined) {
      this.basicAdapter(password)
    }
    else {
      this.zxcvbnAdapter(password);
    }
  };

  StrongPasswordField.prototype.zxcvbnAdapter = function(password) {
    var adapter = new ZxcvbnAdapter();
    this.strengthMetaData = Utils.mergeObjects(this.strengthMetaData, adapter.evaluatePassword(password));
    console.log(this.strengthMetaData)
  };

  StrongPasswordField.prototype.basicAdapter = function(password) {
    if ((password.length) < this.min_length) {
      alert('password length must be at least' + this.min_length)
    }
  };

  StrongPasswordField.prototype.getStrongPasswordFields = function() {
    return document.querySelectorAll('input[type="password"][data-strong-password=true]');
  };

  return StrongPasswordField;
})();

var ZxcvbnAdapter = (function() {

  var ZxcvbnAdapter = function() {
    this.strength = {
      0: 'worst',
      1: 'bad',
      2: 'weak',
      3: 'good',
      4: 'strong'
    };
    this.score = 0;
    this.strengthText = '';
  };

  ZxcvbnAdapter.prototype.evaluatePassword = function(password) {
    var result = zxcvbn(password)
    this.score = result.score;
    this.strengthText = this.strength[result.score]
    return { score: this.score, text: this.strengthText }
  };

  return ZxcvbnAdapter;
})();

var Utils = function() {};
Utils.mergeObjects = function(target, obj) {
  for (var keyInObj in obj) {
    if (!obj.hasOwnProperty(keyInObj) || !target.hasOwnProperty(keyInObj)) continue;
    target[keyInObj] = obj[keyInObj];
  }
  return target;
};
