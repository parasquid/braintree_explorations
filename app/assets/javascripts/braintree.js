jQuery(document).ready(function() {
  var authorization;
  var form = document.querySelector('#checkout-form');
  var submit = document.querySelector('input[type="submit"]');

  $.ajax({
    async: false,
    dataType: "json",
    url: "/braintree/client_token",
    success: function(data) {
      console.log(data.client_token);
      authorization = data.client_token;
    }
  })

  braintree.client.create({
    authorization: authorization
  }, function (clientErr, clientInstance) {
    if (clientErr) {
      alert(clientErr);
      console.log(clientErr);
      return;
    }

    braintree.hostedFields.create({
      client: clientInstance,
      styles: {
        'input': {
          'font-size': '14pt'
        },
        'input.invalid': {
          'color': 'red'
        },
        'input.valid': {
          'color': 'green'
        }
      },
      fields: {
        number: {
          selector: '#card-number',
          placeholder: '4111 1111 1111 1111'
        },
        cvv: {
          selector: '#cvv',
          placeholder: '123'
        },
        expirationDate: {
          selector: '#expiration-date',
          placeholder: '10 / 2019'
        }
      }
    }, function (hostedFieldsErr, hostedFieldsInstance) {
      if (hostedFieldsErr) {
        // Handle error in Hosted Fields creation
        alert();
        return;
      }

      submit.removeAttribute('disabled');

      form.addEventListener('submit', function (event) {
        event.preventDefault();

        hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
          if (tokenizeErr) {
            // Handle error in Hosted Fields tokenization
            alert();
            return;
          }

          // Put `payload.nonce` into the `payment-method-nonce` input, and then
          // submit the form. Alternatively, you could send the nonce to your server
          // with AJAX.
          document.querySelector('input[name="checkout_form[payment_method_nonce]"]').value = payload.nonce;
          form.submit();
        });
      }, false);
    });
  });
});