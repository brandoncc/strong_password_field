require 'strong_password_field/railtie'
require 'strong_password_field/form_helpers'
require 'strong_password_field/strategies/zxcvbn_strategy'

module StrongPasswordField
  def self.included(base)
    base.send :include, InstanceMethods
    base.extend ClassMethods

    base.class_attribute :spf_password_field
    base.class_attribute :strategy
    base.class_attribute :minimal_strength
    # available security levels are: [:worst, :bad, :weak, :good, :strong]
    base.class_attribute :spf_options

    base.validate :strong_password_validate
  end

  module ClassMethods
    def has_strong_password(field=:password, **options)
      self.spf_password_field = field
      self.spf_options = options
    end

  end

  module InstanceMethods
    def strong_password_validate(strategy_adapter = Strategies::ZxcvbnStrategy.new)
      validate(strategy_adapter, self)
    end

    def validate(strategy_adapter, model_object)
      strategy_adapter.validate(model_object)
    end
  end
end
