/**
 * @author Lynda Tang and Jennifer Wu
 */

var questionNum = 0;

$(document).on('click', '#add-text-question', function(evt) {
	evt.preventDefault();
	var question = createNewQuestion(questionNum, true);
	questionNum += 1;
	$('#question-list').append(question);
});

$(document).on('click', '#add-radio-question', function(evt) {
	evt.preventDefault();
	var question = createNewQuestion(questionNum, false);
	questionNum += 1;
	$('#question-list').append(question);
});

$(document).on('click', '.delete-question', function(evt) {
	evt.preventDefault();
	var question = $(this).data('question');
	$('#' + question).remove();
})

// Create a new Listing
$(document).on('submit', '#create-listing', function(evt) {
	evt.preventDefault();
	var data = helpers.getFormData(this);
	
	var questionList = [];
	Object.keys(data).forEach(function(id) {
		if (id.indexOf("newq") === 0){
			questionList.push({
	        	"question" : data[id],
	        	"type" : $('#' + id).data('type'),
	        	"required" : data['optional-' + id] !== "yes"
	        });
        }
	});
	
	var content = {
		title : data.title,
		description : data.description,
		requirements : data.requirements,
		questions : questionList,
		deadline : data.deadline
	};

   $.ajax({
   		type:'POST',
   		url: '/employers/listings',
   		contentType: 'application/json',
   		data: JSON.stringify(content)
   	}).done(function(response) {
        $('#new-listing-modal').modal('hide');
        // TODO : may need timeout
        //setTimeout(function() { loadDashPage(); }, 1000);
        //loadDashPage();
 	}).fail(function(responseObject) {
 		console.log(responseObject);
    	var response = $.parseJSON(responseObject.responseText);
  	});
});

$(document).on('hidden.bs.modal', '#new-listing-modal', function(evt) {
  loadDashPage();
});

/**
 * Creates the HTML div for the appropriate type of question
 *
 * @param{Integer} qNum
 * @param{isTextQuestion} true if a text question, false if a radio question
 * @return HTML div element for the appropriate type of question
 */
var createNewQuestion = function(qNum, isTextQuestion) {
	var question = document.createElement("div");
	var newId = "newq" + qNum;
	var optId = "optional-newq" + qNum;
	question.setAttribute("id", newId);
	if (isTextQuestion) {
		question.setAttribute("data-type", "text");
		$("<span>Text Question </span>").appendTo(question);
	} else {
		question.setAttribute("data-type", "radio");
		$("<span>Yes or No Question </span>").appendTo(question);
	} 

	// space for question
	$('<textarea/>').attr({"class": "form-control", "cols": '50', "name": newId, "required" : true}).appendTo(question);
	
		// creating checkbox if question is optional
	$('<input/>').attr({"type": 'hidden', "name": optId, "value": 'no'}).appendTo(question);
	if (isTextQuestion) {
		$('<input/>').attr({"type": 'checkbox', "name": optId, "value":'yes'}).appendTo(question);
		$("<span> Optional</span>").appendTo(question);
	} else {
		// TODO: add a class??
		$("<span><em>Yes or No questions cannnot be optional</em></span>").appendTo(question);
	}
	$('<br>').appendTo(question);
	
	// delete button for user to remove question
	var deleteBtn = $('<button/>').attr({"class":"btn btn-danger btn-xs delete-question", "data-question": newId});
	$("<span class='glyphicon glyphicon-trash center'></span>").appendTo(deleteBtn);
	deleteBtn.append(" Delete Question");
	deleteBtn.appendTo(question);
	
	$('<br>').appendTo(question);
	$('<br>').appendTo(question);

	return question;
};