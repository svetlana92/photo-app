class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :payment
  has_many :images

  accepts_nested_attributes_for :payment

  protected

  def after_confirmation
    Stripe::Charge.create customer: self.stripe_customer_id,
                          amount: 1000,
                          description: 'Premium',
                          currency: 'USD'
  end

end
