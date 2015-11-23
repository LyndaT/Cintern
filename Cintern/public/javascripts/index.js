/***
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
      $('#login-error').text(response.err);
    });
});

$(document).on('submit', '#s-signup-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);

    // check that passwords match
    if (formData.password !== formData.confirm) {
        $('#s-signup-error').text('Password and confirmation do not match!');
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
      $('#s-signup-error').text(response.err);
    });
});

$(document).on('submit', '#e-signup-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);
    
    // check that passwords match
    if (formData.password !== formData.confirm) {
        $('#e-signup-error').text('Password and confirmation do not match!');
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
      $('#e-signup-error').text(response.err);
    });
});

// Loads the home page
var loadHomePage = function() {
  loadPage(mainContainer, 'index');
  loadModal('#login-modal', 'login');
  loadModal('#employer-signup-modal', 'e_signup');
  loadModal('#student-signup-modal', 's_signup');
};

var loadModal = function(container, template, data){
  data = data || {};
  $(container).html(Handlebars.templates[template](data));
};