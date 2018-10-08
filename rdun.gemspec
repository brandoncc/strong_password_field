$:.push File.expand_path("lib", __dir__)

# Maintain your gem's version:
require "rdun/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "rdun"
  s.version     = Rdun::VERSION
  s.authors     = ["gaotongfei"]
  s.email       = ["gaotongfei1995@gmail.com"]
  s.homepage    = "https://github.com/gaotongfei/rdun"
  s.summary     = "add strong_password_field support for your rails application"
  s.description = "validate password inputs"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md", "vendor"]

  s.add_dependency "rails", "~> 5.2.1"

  s.add_development_dependency "sqlite3"
  s.add_development_dependency "pry-byebug"
end
