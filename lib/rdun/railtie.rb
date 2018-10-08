module Rdun
  class Railtie < ::Rails::Railtie

    initializer 'rdun.form_helpers' do
      ActionView::Helpers::FormHelper.send(:include, Rdun::FormHelper)
      ActionView::Helpers::FormBuilder.send(:include, Rdun::FormBuilder)
    end

    config.assets.paths << File.expand_path("../../../vendor/assets/javascripts", __FILE__)
    config.assets.paths << File.expand_path("../../../vendor/assets/stylesheets", __FILE__)
  end
end
