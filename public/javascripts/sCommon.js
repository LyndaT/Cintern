/**
 * @author Jennifer Wu
 */
// load the home page
var mainContainer = '#common-main-container';

$(document).ready(function() {
	loadHomePage();
});

$(document).on('submit', '#submit-common-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);

    $.ajax({
        type: 'PUT', 
        url: '/students/applications/common',
        contentType: 'application/json',
        data: JSON.stringify({ "answers" : formData})
    }).done(function(response) {
        location.reload();
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

/**
 * This function loads the home page Handlebar template
 */
var loadHomePage = function() {
	$.get('/students/applications/common', function(response) {
      	loadPage(mainContainer, 's_common', {
			questions : response.content.application.questions, 
            isInProgress : true
		});
	});
};

