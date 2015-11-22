/** 
 * @author Jennifer Wu
 */

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