/**
 * This function loads the Handlebar template called template initialized
 * with data
 *
 * @param{String} template
 * @param{Object} data
 */
var loadPage = function(template, data) {
	data = data || {};
	$('#common-main-container').html(Handlebars.templates[template](data));
};

/**
 * This function loads the home page Handlebar template
 */
var loadHomePage = function() {
	var userId = $('#user-id').data('user');
	$.get('/users/applications/common/' + userId, function(response) {
		console.log(response);
		loadPage('application', {
			questions : response.content.application.questions, 
			appId : response.content._id, 
			isCommon : true,
			isSubmitted : false,
		});
	});
};

// load the home page
$(document).ready(function() {
	console.log("loading common page");
	loadHomePage();
});