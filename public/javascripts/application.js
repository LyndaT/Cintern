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
        type: 'PUT', 
        url: postUrl,
        contentType: 'application/json',
        data: JSON.stringify(content)
    }).done(function(response) {
        if (isCommon) location.reload();
        else loadDashPage();
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
        $('.error').text(response.err);
    });
});

// Update an application
$(document).on('click', '#save-app-btn', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData('#submit-app-form');
    var appId = $('#submit-app-form').data('app-id');
    var isCommon = $('#submit-app-form').data('is-common');
    var listingId = $('#submit-app-form').data('listing-id');
    var userId = $('#submit-app-form').data('user-id');

    var content = {
      "answers" : formData
    };

    var postUrl;
    if (isCommon) return;
    else postUrl = '/students/applications/updates/' + appId;
    
    $.ajax({
        type: 'PUT', 
        url: postUrl,
        contentType: 'application/json',
        data: JSON.stringify(content)
    }).done(function(response) {
        loadCustomAppPage(userId, listingId);
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
        $('.error').text(response.err);
    });
});