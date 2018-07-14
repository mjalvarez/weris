require 'dynamoid'
Dynamoid.configure do |config|
  config.access_key = Rails.application.secrets.dynamodb_access_key_id
  config.secret_key = Rails.application.secrets.dynamodb_secret_access_key
  config.region = Rails.application.secrets.dynamodb_region
end