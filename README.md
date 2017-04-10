Stripe.api_key = "sk_test_n2C0wUVHy5nvvNNXyMD3wwB6"
token = "tok_1A5spwJn8d1iXQJmjGX5w1WG"
charge = Stripe::Charge.create(
  :amount => 1000,
  :currency => "usd",
  :description => "Example charge",
  :source => token,
)
