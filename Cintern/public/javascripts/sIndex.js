/**
 * @author: Maddie Dawson
 */

Handlebars.registerPartial('listing', Handlebars.templates['s_listing_row']);
Handlebars.registerPartial('s_dash_page_app', Handlebars.templates['s_dash_page_app']);
Handlebars.registerPartial('application', Handlebars.templates['application']);

var mainContainer = '#s-main-container';


// load the app page
$(document).ready(function() {
	loadDashPage();
});

$(document).on('click', '#s_view_listings', function(evt) {
	loadAllListingsPage();
});

$(document).on('click', '.s-listing', function(evt) {
	var listingId = $(this).data('listing-id');
	var company = $(this).data('listing-company');
	loadListingPage(listingId, company);
});

$(document).on('click', '.student-app', function(evt) {
	var item = $(this);
	var listingId = item.data('listing-id');
	var userId = item.data('user-id');
	loadCustomAppPage(userId, listingId);
});

// save listing to user's list
$(document).on('click', '#add-app', function(evt) {
	var listingId = $(this).data('listing-id');
	$.ajax({
		type: 'POST', 
		url: '/students/applications/custom/saved/' + listingId,
	}).done(function(response) {
		loadAllListingsPage();
	}).fail(function(response) {
		console.log('Error');
	});
});

// Loads the dash page
var loadDashPage = function() {
	$.ajax
	$.get('/students/applications', function(response) {
		loadPage(mainContainer, 's_dash_page', { apps: response.content.applications });
	});
};

// Loads all listings
var loadAllListingsPage = function() {
	$.get('/students/listings', function(response) {
		loadPage(mainContainer, 's_listings', {listings: response.content.listings});
	});
}

// Loads an individual listing page corresponding to the listingId
var loadListingPage = function(listingId, company) {
	$.get('/students/listings/' + listingId, function(response) {
		var data = response.content.listing;
		data.company = company;
		loadPage(mainContainer, 's_listing', data)
	});
}

// Loads the Custom App page corresponding to the userId and listingId
var loadCustomAppPage = function(userId, listingId) {
	$.ajax({
		type: "GET",
		url: "/users/applications/custom/" + userId + "/" + listingId
	}).done(function(response) {
		var data = {
	      title : response.content.listing.title,
	      questions : response.content.application.questions, 
	      appId : response.content._id, 
	      isCommon : false,
	      isSubmitted : response.content.state !== "save",
	    };
	    loadPage(mainContainer, 's_custom', data);
	}).fail(function(response) {
		console.log("ERROR :(");
	});
}