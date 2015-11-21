/**
 * This function loads the Handlebar template called template initialized
 * with data.  Specifically for Student view Listings page.
 *
 * @param{String} template
 * @param{Object} data
 *
 * @author Heeyoon
 */
Handlebars.registerPartial('listing', Handlebars.templates['s_listing_row']);

var loadPage = function(template, data) {
	data = data || {};
	$('#s-listings-main-container').html(Handlebars.templates[template](data));
};

/** Renders the student view listings template
 */
var loadStudentViewListingsPage = function() {
	$.get('/students/listings', function(response) {
		loadPage('s_listings', {listings: response.content.listings});
	});
};

// load the listings page
$(document).ready(function() {
	loadStudentViewListingsPage();
});
