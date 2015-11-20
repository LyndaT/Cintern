(function() {
  Handlebars.registerPartial('question', Handlebars.templates['question']);
  Handlebars.registerPartial('application', Handlebars.templates['application']);

  $(document).on('click', '#submit-app-btn', function(evt) {
      console.log("submitted application");
      evt.preventDefault();
      var formData = helpers.getFormData('#submit-app-form');
      var appId = $('#submit-app-form').data('app-id');
      var isCommon = $('#submit-app-form').data('is-common');

      var postUrl;
      if (isCommon) postUrl = '/students/applications/common';
      else postUrl = '/students/applications/custom/' + appId;
      
      $.ajax({
          type: 'POST', 
          url: postUrl,
          data: formData
      }).done(function(response) {
          location.reload();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();