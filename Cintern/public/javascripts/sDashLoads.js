Handlebars.registerPartial('s_dash_page_app', Handlebars.templates['s_dash_page_app']);


/**
 * This function loads the Handlebar template called template initialized
 * with data
 *
 * @param{String} template
 * @param{Object} data
 */
var loadPage = function(template, data) {
	data = data || {};
	console.log(Handlebars.templates[template](data));
	$('#s-dash-main-container').html(Handlebars.templates[template](data));
};

/**
 * This function loads the home page Handlebar template
 */
var loadHomePage = function() {
	loadApps();
};

/**
 * Load the user's apps to show on their dash
 */
var loadApps = function() {
	$.get('/students/applications', function(response) {
		loadPage('s_dash_page', { apps: response.content.applications });
	});
};

// load the home page
$(document).ready(function() {
	loadHomePage();
});