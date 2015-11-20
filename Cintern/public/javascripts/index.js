(function() {
  $(document).on('submit', '#login-form', function(evt) {
      evt.preventDefault();
      $.post(
          '/users/login',
          helpers.getFormData(this)
      ).done(function(response) {
          console.log("logged in");
          // REDIRECT
          //location.reload();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

  $(document).on('submit', '#s-signup-form', function(evt) {
      evt.preventDefault();
      var formData = helpers.getFormData(this);
      if (formData.password !== formData.confirm) {
          $('.error').text('Password and confirmation do not match!');
          return;
      }
      delete formData['confirm'];
      $.post(
          '/users/students',
          formData
      ).done(function(response) {
          console.log("signed up");
          // REDIRECT
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });

   $(document).on('submit', '#e-signup-form', function(evt) {
      evt.preventDefault();
      var formData = helpers.getFormData(this);
      if (formData.password !== formData.confirm) {
          $('.error').text('Password and confirmation do not match!');
          return;
      }
      delete formData['confirm'];
      $.post(
          '/users/employers',
          formData
      ).done(function(response) {
          console.log("signed up");
          // REDIRECT
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
   
 // change the active status of the navigarion tabs when a new one is clicked on
  $(document).on('click', 'ul.nav-tabs li', function(e){
    $('ul.nav-tabs li.active').removeClass('active');
      $(this).addClass('active');
  });
})();