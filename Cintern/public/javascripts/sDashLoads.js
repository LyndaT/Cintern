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
	$('#s-dash-main-container').html(Handlebars.templates[template](data));
};

/**
 * This function loads the home page Handlebar template
 */
var loadHomePage = function() {
	//createFakeApps();
	loadApps();
};

/**
 * Load the user's apps to show on their dash
 */
var loadApps = function() {
	$.get('/students/applications', function(response) {
		console.log(response);
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
		listingId = response.content.listings[response.content.listings.length-1]._id;

		$.ajax({
			type: 'POST',
			url: '/students/applications/custom/saved/' + listingId,
			contentType: 'application/json'
		}).done(function(response) {
			$.get('/students/applications', function(response) {
				customId = response.content.applications[response.content.applications.length-1]._id;

				$.ajax({
					type: 'POST',
					url: '/students/applications/custom/' + customId,
					contentType: 'application/json',
					data: JSON.stringify({
						answers: []
					})
				}).done(function(response) {
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