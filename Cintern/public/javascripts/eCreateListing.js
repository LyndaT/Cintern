/**
 * @author Lynda Tang
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

var createNewQuestion = function(qNum, isTextQuestion) {
	var question = document.createElement("div");
	var newId = "newq" + qNum;
	var optId = "optional-newq" + qNum;
	question.setAttribute("id", newId);
	if (isTextQuestion) {
		question.setAttribute("data-type", "text");
		$("<span>Text Question</span>").appendTo(question);
	}
	else {
		question.setAttribute("data-type", "radio");
		$("<span>Yes or No Question</span>").appendTo(question);
	} 
	var deleteBtn = $('<button/>').attr({"class":"delete-question btn btn-primary", "data-question": newId});
	$("<span class='glyphicon glyphicon-trash center'></span>").appendTo(deleteBtn);
	deleteBtn.appendTo(question);
	$('<br>').appendTo(question);
	$('<textarea/>').attr({"form": 'create-listing', "cols": '50', "name": newId, "required" : true}).appendTo(question);
	$('<input/>').attr({"type": 'hidden', "class": 'form-control', "name": optId, "value": 'no'}).appendTo(question);
	if (isTextQuestion) {
		$("<span>Optional</span").appendTo(question);
		$('<input/>').attr({"type": 'checkbox', "class": 'form-control', "name": optId, "value":'yes'}).appendTo(question);
	}
	$('<br>').appendTo(question);
	$('<br>').appendTo(question);
	return question;
}

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