/**
 * @author Jennifer Wu
 */

var mainContainer = '#main-container';


// load the home page
$(document).ready(function() {
	loadHomePage();
});

$(document).on('click', '#login-btn', function(evt) {
	loadPage(mainContainer, 'login');
});

$(document).on('click', '#e-signup-btn', function(evt) {
	loadPage(mainContainer, 'e_signup');
});

$(document).on('click', '#s-signup-btn', function(evt) {
	loadPage(mainContainer, 's_signup');
});

// load the home page when the home link is clicked
$(document).on('click', '#home-link', function(evt) {
	evt.preventDefault();
	loadHomePage();
});

$(document).on('submit', '#login-form', function(evt) {
    evt.preventDefault();
    $.ajax({
    	type: 'POST',
    	url: '/users/login',
    	data: helpers.getFormData(this)
    }).done(function(response) {
    	location.reload();
    }).fail(function(responseObject) {
    	var response = $.parseJSON(responseObject.responseText);
    	$('.error').text(response.err);
    });
});

$(document).on('submit', '#s-signup-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);

    // check that passwords match
    if (formData.password !== formData.confirm) {
        $('.error').text('Passwords do not match!');
        return;
    }

    delete formData['confirm'];

    $.ajax({
    	type: 'POST',
    	url: '/users/students',
    	data: formData
    }).done(function(response) {
    	location.reload();
    }).fail(function(responseObject) {
    	var response = $.parseJSON(responseObject.responseText);
    	$('.error').text(response.err);
    });
});

$(document).on('submit', '#e-signup-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);
    
    // check that passwords match
    if (formData.password !== formData.confirm) {
        $('.error').text('Passwords do not match!');
        return;
    }

    delete formData['confirm'];

    $.ajax({
    	type: 'POST',
    	url: '/users/employers',
    	data: formData
    }).done(function(response) {
    	location.reload();
    }).fail(function(responseObject) {
    	var response = $.parseJSON(responseObject.responseText);
    	$('.error').text(response.err);
    });
});

// Loads the home page
var loadHomePage = function() {
	loadPage(mainContainer, 'index');
};
