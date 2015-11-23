/**
 * @author: Maddie dawson
 */

(function() {  
  Handlebars.registerPartial('application', Handlebars.templates['application']);
  /**
   * When a student clicks on an application on their dash, load the custom app
   */	
  $(document).on('click', '.student-app', function(evt) {
  	var item = $(this);
  	var listingId = item.data('listing-id');
  	var userId = item.data('user-id');

  	$.ajax({
  		type: "GET",
  		url: "/users/applications/custom/" + userId + "/" + listingId
  	}).done(function(response) {
      loadPage('s_custom', {
        title : response.content.listing.title,
        questions : response.content.application.questions, 
        appId : response.content._id, 
        isCommon : false,
        isSubmitted : response.content.state !== "save",
      });
  	}).fail(function(response) {
  		console.log("ERROR :(");
  	});
  });
})();