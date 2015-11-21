(function() {
  /**
   * When a student clicks on an application on their dash, load the custom app
   */	
  $(document).on('click', '#student-app', function(evt) {
  	var item = $(this);
  	var listingId = item.data('listing-id');
  	var userId = item.data('user-id');

  	$.ajax({
  		type: "GET",
  		url: "/users/applications/custom/" + userId + "/" + listingId
  	}).done(function(response) {
  		console.log(response);
  	}).fail(function(response) {
  		console.log("ERROR :(");
  	});
  });
})();