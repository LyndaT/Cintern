(function() {
  Handlebars.registerPartial('question', Handlebars.templates['question']);
  Handlebars.registerPartial('application', Handlebars.templates['application']);

  $(document).on('submit', '#submit-app-form', function(evt) {
      console.log("submitted application");
      evt.preventDefault();
      var formData = helpers.getFormData(this);
      var appId = $(this).data('app-id');
      console.log(appId);
      $.post(
          '/students/applications/common/' + appId,
          formData
      ).done(function(response) {
          location.reload();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });
  });
})();