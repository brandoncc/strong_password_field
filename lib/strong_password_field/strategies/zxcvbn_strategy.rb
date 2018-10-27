require 'zxcvbn'

module StrongPasswordField
  module Strategies
    class ZxcvbnStrategy
      def initialize
        @strength_lookup = {
            0 => :worst,
            1 => :bad,
            2 => :weak,
            3 => :good,
            4 => :strong
        }

        @tester ||= Zxcvbn::Tester.new
      end

      def validate(model_object)
        @options = model_object.spf_options
        @password = model_object.send(model_object.spf_password_field)

        result = @tester.test(@password)
        @score = result.score
        add_errors(model_object) if @score < security_score
      end

      private

      def security_level
        @security_level ||= @options.fetch(:security_level, :good)
        unless valid_security_level.include?(@security_level)
          raise StandardError, "security_level: #{@security_level} is not valid,
                                use one of #{valid_security_level.join(', ')}"
        end
        @security_level
      end

      def security_score
        @security_score ||= @strength_lookup.key(security_level)
      end

      def valid_security_level
        %i[worst bad weak good strong]
      end

      def add_errors(model_object)
        model_object.errors.add(:weak_password_error, 'password is not strong enough')
      end
    end
  end
end
