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
	loadPage('s_dash_page');
};

// load the home page
$(document).ready(function() {
	loadHomePage();
});

// load the sign in page when the signin button is clicked
/*$(document).on('click', '#login-btn', function(evt) {
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
});*/