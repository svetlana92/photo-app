$( window ).on( "load", function() {

  var stripe = Stripe('pk_test_Il3h48zA1Yv4luElxMcNzzs8');
  var elements = stripe.elements();

  var card = elements.create('card', {classes: { base: 'form-control' }});

  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
      document.getElementById('submit-button').removeAttribute("disabled");
    }
  });

  card.mount('#card-element');

  var form = document.getElementById('payment-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server
        stripeTokenHandler(result.token);
      }

    });
  });

  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    // Submit the form
    form.submit();
  }



  // var show_error, stripeResponseHandler, submitHandler;
  //
  // submitHandler = function (event) {
  //   var $form = $(event.target);
  //   $form.find("input[type=submit]").prop("disabled", true);
  //   if(Stripe){
  //     Stripe.card.createToken($form, stripeResponseHandler);
  //   } else {
  //     show_error("Failed to load credit card processing functionality. Please reload this page in your browser.")
  //   }
  //   return false;
  // };
  //
  // $(".cc_form").on('submit', submitHandler);
  //
  // stripeResponseHandler = function (status, response) {
  //   var token, $form;
  //
  //   $form = $('.cc_form');
  //
  //   if (response.error) {
  //     console.log(response.error.message);
  //     show_error(response.error.message);
  //     $form.find("input[type=submit]").prop("disabled", false);
  //   } else {
  //     token = response.id;
  //     $form.append($("<input type=\"hidden\" name=\"payment[token]\" />").val(token));
  //     $("[data-stripe=number]").remove();
  //     $("[data-stripe=cvv]").remove();
  //     $("[data-stripe=exp-year]").remove();
  //     $("[data-stripe=exp-month]").remove();
  //     $("[data-stripe=label]").remove();
  //     $form.get(0).submit();
  //   }
  //
  //   return false;
  // };
  //
  // show_error = function (message) {
  // if($("#flash-messages").size() < 1){
  //   $('div.container.main div:first').prepend("<div id='flash-messages'></div>")
  // }
  // $("#flash-messages").html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">×</a><div id="flash_alert">' + message + '</div></div>');
  // $('.alert').delay(5000).fadeOut(3000);
  // return false;
  // };

});
