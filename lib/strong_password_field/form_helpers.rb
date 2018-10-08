module StrongPasswordField
  module FormHelper
    def strong_password_field(object_name, method, options = {})
      options.merge!(data: { strong_password: true })
      password_field(object_name, method, options)
    end
  end

  module FormBuilder
    def strong_password_field(method, options = {})
      @template.strong_password_field(@object_name, method, options)
    end
  end
end