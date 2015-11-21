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

var loadStudentViewListingsPage = function() {
	$.get('/students/listings', function(response) {
		console.log(response.content.listings[0]);
		loadPage('s_listings', {listings: response.content.listings});
	});
};


// load the home page
$(document).ready(function() {
	loadHomePage();

	$(document).on('click', '#s_view_listings', function(evt) {
		loadStudentViewListingsPage();
		//res.redirect('/listings');
  });
});