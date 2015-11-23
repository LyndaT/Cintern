/**
 * @author Jennifer Wu
 */
 
 var mainContainer = '#common-main-container';

/**
 * This function loads the home page Handlebar template
 */
var loadHomePage = function() {
	var userId = $('#common-main-container').data('user-id');
	$.get('/students/applications/common', function(response) {
		loadPage(mainContainer, 'application', {
			questions : response.content.application.questions, 
			appId : response.content._id, 
			isCommon : true,
			isSubmitted : false,
		});
	});
};

// load the home page
$(document).ready(function() {
	loadHomePage();
});