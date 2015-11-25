/**
 * @author Lynda Tang
 */

var questionNum = 0;

$(document).on('click', '#add-text-question', function(evt) {
	evt.preventDefault();
	$('<textarea/>').attr({ form: 'create-listing', cols: '50', name:"newq" + questionNum}).appendTo('#question-list');
	$('<br>').appendTo('#question-list');
	$('<br>').appendTo('#question-list');
	questionNum += 1;
});

$(document).on('click', '#add-dropdown-question', function(evt) {
	evt.preventDefault();
	$('<textarea/>').attr({ form: 'create-listing', cols: '50', name:"newq" + questionNum}).appendTo('#question-list');
	$('<br>').appendTo('#question-list');
	$('<br>').appendTo('#question-list');
	questionNum += 1;
});

// Create a new Listing
$(document).on('submit', '#create-listing', function(evt) {
	evt.preventDefault();
	var data = helpers.getFormData(this);
	
	var questionList = [];
	Object.keys(data).forEach(function(id) {
		if (id.indexOf("newq") === 0){
	        questionList.push({
	        	"question" : data[id],
	        	"type" : "text",
	        	"required" : true
	        });
        }
	});
	
	var content = {
		title : data.title,
		description : data.description,
		requirements : data.requirements,
		questions: questionList,
	};

   $.ajax({
   		type:'POST',
   		url: '/employers/listings',
   		contentType: 'application/json',
   		data: JSON.stringify(content)
   	}).done(function(response) {
        loadDashPage();
 	}).fail(function(responseObject) {
    	var response = $.parseJSON(responseObject.responseText);
      	$('.error').text(response.err);
  	});;
});