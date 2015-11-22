Handlebars.registerPartial('e_dash_page_listing', Handlebars.templates['e_dash_page_listing']);

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
	$('#e-dash-main-container').html(Handlebars.templates[template](data));
};

/**
 * This function loads the home page Handlebar template
 */
var loadHomePage = function() {
	//createFakeListings();
	loadListings();
};

/**
 * Load the employer's listings to show on their dash
 */
var loadListings = function() {
	$.get('/employers/listings', function(response) {
		loadPage('e_dash_page', { listings: response.content.listings });
	});
};

// load the home page
$(document).ready(function() {
	loadHomePage();
});

$(document).on('click', '#new-listing-btn', function(evt) {
	loadPage('create_listing');
});

