module StrongPasswordField
  class Railtie < ::Rails::Railtie

    initializer 'strong_password_field.form_helpers' do
      ActionView::Helpers::FormHelper.send(:include, StrongPasswordField::FormHelper)
      ActionView::Helpers::FormBuilder.send(:include, StrongPasswordField::FormBuilder)
    end

    config.assets.paths << File.expand_path("../../../vendor/assets/javascripts", __FILE__)
    config.assets.paths << File.expand_path("../../../vendor/assets/stylesheets", __FILE__)
  end
end
