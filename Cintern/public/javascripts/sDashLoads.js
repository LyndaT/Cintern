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

/**
 * FOR UI TESTING PURPOSES ONLY
 * DELETE THIS LATER
 * FOR UI TESTING PURPOSES ONLY
 * DELETE THIS LATER
 */
var createFakeApps = function() {
	$.get('/students/listings', function(response) {
		listingId = response.content.listings[0]._id;

		$.post(
			'/students/applications/custom/saved/' + listingId
		).done(function(response) {
			$.get('/students/applications', function(response) {
				customId = response.content.applications[0]._id;

				$.post(
					'/students/applications/custom/' + customId,
					{
						answers: []
					}
				).done(function(response) {
					loadApps();
				}).fail(function(response) {
					console.log("ERROR :(");
				});
			});
		}).fail(function(response) {
			console.log("ERROR :(");
		});
	});
};

// load the home page
$(document).ready(function() {
	loadHomePage();
});