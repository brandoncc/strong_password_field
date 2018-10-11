var StrongPasswordField = (function() {
  var StrongPasswordField = function() {
    this.min_length = 6;
    this.strongPasswordFields = [];
    this.passwordMetaData = {
      score: 0,
      text: '',
      strengthLevels: 5
    };
    this.strengthMeterSelector = '.password-strength-meter'
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
      this.loadTheme();
      console.log(this.passwordMetaData)
    }
  };

  StrongPasswordField.prototype.zxcvbnAdapter = function(password) {
    var adapter = new ZxcvbnAdapter();
    this.passwordMetaData = Utils.mergeObjects(this.passwordMetaData, adapter.evaluatePassword(password));
  };

  StrongPasswordField.prototype.basicAdapter = function(password) {
    if ((password.length) < this.min_length) {
      alert('password length must be at least' + this.min_length)
    }
  };

  StrongPasswordField.prototype.getStrongPasswordFields = function() {
    return document.querySelectorAll('input[type="password"][data-strong-password=true]');
  };

  StrongPasswordField.prototype.loadTheme = function() {
    // use default theme, will be configurable in the future
    theme = new DefaultTheme(this);
    theme.attachTheme();
  };

  StrongPasswordField.prototype.getStrengthMeterElement = function() {
    return document.querySelector(this.strengthMeterSelector);
  };

  var DefaultTheme = (function() {
    var DefaultTheme = function(spf) {
      this.spf = spf;
      this.passwordMetaData = spf.passwordMetaData;
      this.colors = {
        0: 'grey',
        1: 'red',
        2: 'orange',
        3: 'blue',
        4: 'green'
      }
    };

    DefaultTheme.prototype.meter = function() {
      return (this.passwordMetaData.score / this.passwordMetaData.strengthLevels) * 100
    };

    DefaultTheme.prototype.color = function() {
      return this.colors[this.passwordMetaData.score]
    };

    DefaultTheme.prototype.attachTheme = function() {
      var strengthMeterElement = this.spf.getStrengthMeterElement();
      if (strengthMeterElement.innerHTML.trim() === '') {
        this.initialLoad(strengthMeterElement);
      }
      else {
        this.update(strengthMeterElement);
      }
    };

    DefaultTheme.prototype.update = function(elem) {
      meterElem = this.getMeterElement(elem);

      meterElem.style.backgroundColor = this.color();
      meterElem.style.width = this.meter().toString() + '%';
      meterElem.style.height = '5px';
    };

    DefaultTheme.prototype.initialLoad = function(elem) {
      elem.innerHTML = '<div class="spf-meter"></div>';
      meterElem = this.getMeterElement(elem);

      meterElem.style.backgroundColor = this.color();
      meterElem.style.width = this.meter().toString() + '%';
      meterElem.style.height = '5px';
    };

    DefaultTheme.prototype.getMeterElement = function(elem) {
      return elem.querySelector('.spf-meter')
    };

    return DefaultTheme;
  })();

  var Utils = function() {};
  Utils.mergeObjects = function(target, obj) {
    for (var keyInObj in obj) {
      if (!obj.hasOwnProperty(keyInObj) || !target.hasOwnProperty(keyInObj)) continue;
      target[keyInObj] = obj[keyInObj];
    }
    return target;
  };

  var ZxcvbnAdapter = (function() {

    var ZxcvbnAdapter = function() {
      this.strengthLevels = 5;
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
      var result = zxcvbn(password);
      this.score = result.score;
      this.strengthText = this.strength[result.score];
      return { score: this.score, text: this.strengthText, strengthLevels: this.strengthLevels }
    };

    return ZxcvbnAdapter;
  })();

  return StrongPasswordField;
})();
