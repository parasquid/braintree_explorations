jQuery(document).ready(function() {
  var authorization;
  $.ajax({
    dataType: "json",
    url: "/braintree/client_token",
    success: function(data) {
      authorization = data.client_token;
      braintree.client.create({
        authorization: authorization
      }, braintreeClientCreateHandler);
    }
  })
});
