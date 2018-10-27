$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "strong_password_field/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "strong_password_field"
  s.version     = StrongPasswordField::VERSION
  s.authors     = ["gaotongfei"]
  s.email       = ["gaotongfei1995@gmail.com"]
  s.homepage    = "https://github.com/gaotongfei/strong_password_field"
  s.summary     = "Add strong_password_field support for your rails application"
  s.description = "Add strong_password_field support for your rails application"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md", "vendor"]

  s.add_dependency "rails", "~> 5.2.1"
  s.add_dependency "zxcvbn-ruby"

  s.add_development_dependency "sqlite3"
  s.add_development_dependency "pry-byebug"
end
