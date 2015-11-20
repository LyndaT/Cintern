/**
 * This function loads the Handlebar template called template initialized
 * with data
 *
 * @param{String} template
 * @param{Object} data
 */
Handlebars.registerPartial('listing', Handlebars.templates['s_listing_row']);
Handlebars.registerPartial('applicant', Handlebars.templates['e_applicants_row']);

var loadPage = function(template, data) {
	data = data || {};
	$('#main-container').html(Handlebars.templates[template](data));
};

/**
 * This function loads the home page Handlebar template
 */
var loadHomePage = function() {
	loadPage('index');
};

var loadStudentViewListingsPage = function() {
	$.get('/students/listings', function(response) {
		console.log(response.content.listings[0]);
		loadPage('s_listings', {listings: response.content.listings});
	});
};

var loadEmployerViewApplicantsPage = function() {
	$.get('/employers/applications/listings/564e920d0dc0a354f80f8692', function(response) {
		console.log("applicants: " + response.content.applicants[0].owner.email)
		loadPage('e_applicants', {applicants: response.content.applicants});
	});
};


// load the home page
$(document).ready(function() {
	loadHomePage();
	//loadStudentViewListingsPage();
	loadEmployerViewApplicantsPage();
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
