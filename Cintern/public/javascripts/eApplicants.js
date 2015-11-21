/** @author Heeyoon 
 */

// Wrapped in an immediately invoked function expression.
(function() {
	Handlebars.registerPartial('question', Handlebars.templates['question']);
	Handlebars.registerPartial('application', Handlebars.templates['application']);

	$(document).on('click', '.applicant_row', function(evt) {
		alert("hello")
		var item = $(this);
	    var userId = item.data('applicant-id');
	    var listingId = item.data('listing-id');
	    $.get('/users/applications/fullapp/' + userId + '/' + listingId, function(response) {
	    	console.log(response);
		});
	});
})();