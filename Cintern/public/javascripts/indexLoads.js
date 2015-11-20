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
	console.log(Handlebars.templates[template]);
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
		console.log("applicants: " + response.content.applicants[0].own er.email)
		loadPage('e_applicants', {applicants: response.content.applicants});
	});
};


// load the home page
$(document).ready(function() {
	loadHomePage();
	loadStudentViewListingsPage();
	//loadEmployerViewApplicantsPage();
});

// load the home page when the home link is clicked
/*$(document).on('click', '#home-link', function(evt) {
	evt.preventDefault();
	loadHomePage();
});

// load the sign in page when the signin button is clicked
$(document).on('click', '#signin-btn', function(evt) {
	loadPage('signin');
});

// load the registration page when the register button is clicked
$(document).on('click', '#register-btn', function(evt) {
	loadPage('register');
});*/

