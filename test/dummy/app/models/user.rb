class User < ApplicationRecord
  include StrongPasswordField

  has_strong_password :password
end
