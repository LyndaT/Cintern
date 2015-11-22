/** 
 * @author Heeyoon 
 */

Handlebars.registerPartial('question', Handlebars.templates['question']);
Handlebars.registerPartial('application', Handlebars.templates['application']);

$(document).on('click', '.applicant-row', function(evt) {
	var item = $(this);
    var userId = item.data('applicant-id');
    var listingId = item.data('listing-id');
    $.get('/users/applications/fullapp/' + userId + '/' + listingId, function(response) {
    	loadPage('full_app', {
    		common : response.content.commonApp,
    		custom : response.content.customApp,
    		isSubmitted : true
    	});
	});
});