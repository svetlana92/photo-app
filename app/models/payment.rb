class Payment < ApplicationRecord

  belongs_to :user

  # def process_payment
  #   token = params[:stripeToken]
  #   customer = Stripe::Customer.create email: email, source: token
  # end

end
