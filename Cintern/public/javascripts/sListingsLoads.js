/**
 * This function loads the Handlebar template called template initialized
 * with data.  Specifically for Student view Listings page.
 *
 * @param{String} template
 * @param{Object} data
 */
Handlebars.registerPartial('listing', Handlebars.templates['s_listing_row']);

var loadPage = function(template, data) {
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
};

/** Renders the student view listings template
 */
var loadStudentViewListingsPage = function() {
	$.get('/students/listings', function(response) {
		console.log(response.content.listings[0]);
		loadPage('s_listings', {listings: response.content.listings});
	});
};

// load the listings page
$(document).ready(function() {
	loadStudentViewListingsPage();
});

// load the sign in page when the signin button is clicked
$(document).on('click', '#login-btn', function(evt) {
	loadPage('login');
});

$(document).on('click', '#e-signup-btn', function(evt) {
	loadPage('e_signup');
});

$(document).on('click', '#s-signup-btn', function(evt) {
	loadPage('s_signup');
});

// load the home page when the home link is clicked
$(document).on('click', '#home-link', function(evt) {
	evt.preventDefault();
	loadHomePage();
});
