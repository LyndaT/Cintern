/**
 * @author Jennifer Wu
 */
Handlebars.registerPartial('question', Handlebars.templates['question']);

// Submit an application
$(document).on('submit', '#submit-app-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData('#submit-app-form');
    var appId = $('#submit-app-form').data('app-id');
    var isCommon = $('#submit-app-form').data('is-common');

    var content = {
      "answers" : formData
    };

    var postUrl;
    if (isCommon) postUrl = '/students/applications/common';
    else postUrl = '/students/applications/custom/' + appId;
    
    $.ajax({
        type: 'POST', 
        url: postUrl,
        contentType: 'application/json',
        data: JSON.stringify(content)
    }).done(function(response) {
        location.reload();
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
        $('.error').text(response.err);
    });
});

// TODO: after MVP
/*$(document).on('submit', '#save-app-btn', function(evt) {
  console.log("saved application");
  var formData = helpers.getFormData('#submit-app-form');
  var appId = $('#submit-app-form').data('app-id');
});*/
