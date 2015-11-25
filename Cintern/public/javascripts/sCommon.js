/**
 * @author Jennifer Wu
 */
 
Handlebars.registerPartial('application', Handlebars.templates['application']);
Handlebars.registerPartial('question', Handlebars.templates['question']);

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
        var flaggedQuestions = [];
        response.content.application.questions.forEach(function(q) {
            q["isText"] = q.type === "text";
            q["isCheck"] = q.type === "check";
            q["isDropdown"] = q.type === "dropdown";
            flaggedQuestions.push(q);
        });

		loadPage(mainContainer, 's_common', {
			questions : flaggedQuestions, 
            isInProgress : true
		});
	});
};

