/**
 * This function loads the Handlebar template called template initialized
 * with data into the container
 *
 * @param{String} container
 * @param{String} template
 * @param{Object} data
 */
var loadPage = function(container, template, data) {
	data = data || {};
	$(container).html(Handlebars.templates[template](data));
};

// When the logout button has been clicked, logout the user
$(document).on('click', '#logout-btn', function(evt){
	console.log("logout clickedd");
  $.ajax({
    type: "POST", 
    url: '/users/logout'
  }).done(function(){
    $(location).attr('href', '/');
  })
});