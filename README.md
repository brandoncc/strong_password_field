# StrongPasswordField
Rails engine for password strength checking

## Usage

```ruby
class User < ApplicationRecord
  include StrongPasswordField

  has_strong_password :password
end
```

```html
<%= form_for @user do |f| %>
  <%= f.strong_password_field :password %>
  <div class="password-strength-meter">
  </div>
<% end %>
```

```javascript
//= require strong_password_field
//= require zxcvbn

document.addEventListener('DOMContentLoaded', function() {
  var strongPasswordField = new StrongPasswordField({
    strengthMeterSelector: '.password-strength-meter'
  });
  strongPasswordField.validate();
});
```

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'strong_password_field'
```

And then execute:
```bash
$ bundle
```

Or install it yourself as:
```bash
$ gem install strong_password_field
```

## Contributing
Contribution directions go here.

##TODOs
- [ ] Add tests and travis-ci
- [ ] Better password strength meter UI
- [ ] Add support for regex

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
