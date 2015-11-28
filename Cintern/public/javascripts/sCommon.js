/**
 * @author Jennifer Wu
 */
 
Handlebars.registerPartial('application', Handlebars.templates['application']);
Handlebars.registerPartial('question', Handlebars.templates['question']);
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});
// load the home page
$(document).ready(function() {
	loadHomePage();
});

$(document).on('submit', '#submit-common-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);

    $.ajax({
        type: 'PUT', 
        url: '/students/applications/common',
        contentType: 'application/json',
        data: JSON.stringify({ "answers" : formData})
    }).done(function(response) {
        location.reload();
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

var mainContainer = '#common-main-container';

/**
 * This function loads the home page Handlebar template
 */
var loadHomePage = function() {
	$.get('/students/applications/common', function(response) {
      	loadPage(mainContainer, 's_common', {
			questions : response.content.application.questions, 
            isInProgress : true
		});
	});
};

