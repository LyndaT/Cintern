Handlebars.registerPartial('s_dash_page_app', Handlebars.templates['s_dash_page_app']);
Handlebars.registerPartial('listing', Handlebars.templates['s_listing_row']);

/**
 * @author: Maddie Dawson
 */

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
 * Loads all the listings
 */
var loadAllListings = function() {
	$.get('/students/listings', function(response) {
		loadPage('s_listings', {listings: response.content.listings});
	});
}

$(document).on('click', '#s_view_listings', function(evt) {
	loadAllListings();
});

// loads an individual listing's description
$(document).on('click', '.s-listing', function(evt) {
	var listingId = $(this).data('listing-id');
	var company = $(this).data('listing-company');
	$.get('/students/listings/' + listingId, function(response) {
		var data = response.content.listing;
		data.company = company;
		loadPage('s_listing', data)
	});
});

// save listing
$(document).on('click', '#add-app', function(evt) {
	var listingId = $(this).data('listing-id');
	$.ajax({
		type: 'POST', 
		url: '/students/applications/custom/saved/' + listingId,
	}).done(function(response) {
		loadAllListings();
	}).fail(function(response) {
		console.log('Error');
	})
});

// load the home page
$(document).ready(function() {
	loadHomePage();
});