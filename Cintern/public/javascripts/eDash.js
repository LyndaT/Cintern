/** @author Heeyoon 
 */

Handlebars.registerPartial('applicant', Handlebars.templates['e_applicants_row']);
// Wrapped in an immediately invoked function expression.
(function() {
	$(document).on('click', '#listing-row', function(evt) {
		var item = $(this);
	    var id = item.data('listing-id');
	    $.get('/employers/applications/listings/'+id, function(response) {
			loadPage('e_applicants', {applicants: response.content.applicants});
			console.log(response.content.applicants);
		});


	});
})();