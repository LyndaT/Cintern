/**
 * This function loads the Handlebar template called template initialized
 * with data
 *
 * @param{String} template
 * @param{Object} data
 */
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

// load the home page
$(document).ready(function() {
	loadHomePage();
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

