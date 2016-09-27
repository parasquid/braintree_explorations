class BraintreeController < ApplicationController
  def client_token
    client_token = Braintree::ClientToken.generate
    render json: {client_token: client_token}
  end

  def checkout
    raise
  end
end
