Rails.application.routes.draw do
  get 'braintree/client_token'

  post 'braintree/checkout'

  root to: "home#index"
end
