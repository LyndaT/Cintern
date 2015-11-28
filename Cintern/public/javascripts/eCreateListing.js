/**
 * @author Lynda Tang
 */

var questionNum = 0;

$(document).on('click', '#add-text-question', function(evt) {
	evt.preventDefault();
	var textQuestion = document.createElement("div");
	var newId = "newq" + questionNum;
	questionNum += 1;
	textQuestion.setAttribute("id", newId);
	textQuestion.setAttribute("data-type", "text");
	$("<span>Text Question</span>").appendTo(textQuestion);
	$('<button class="delete-question btn btn-primary" data-question=' + newId + '>Delete</buttton>').appendTo(textQuestion);
	$('<br>').appendTo(textQuestion);
	$('<textarea/>').attr({ form: 'create-listing', cols: '50', name: newId, required : true}).appendTo(textQuestion);
	$('<br>').appendTo(textQuestion);
	$('<br>').appendTo(textQuestion);
	$('#question-list').append(textQuestion);
});

$(document).ready(function(){
	$("#timepicker").kendoTimePicker();
	});

/*$(document).on('click', '#add-dropdown-question', function(evt) {
	evt.preventDefault();
	var dropdownQuestion = document.createElement("div");
	var newId = "newq" + questionNum;
	questionNum += 1;
	dropdownQuestion.setAttribute("id", newId);
	dropdownQuestion.setAttribute("data-type", "dropdown");
	$("<span>Dropdown Question</span>").appendTo(dropdownQuestion);
	$('<button class="delete-question btn btn-primary" data-question=' + newId + '>Delete</buttton>').appendTo(dropdownQuestion);
	$('<br>').appendTo(dropdownQuestion);
	$('<textarea/>').attr({ form: 'create-listing', cols: '50', name: newId, required : true}).appendTo(dropdownQuestion);
	$('<br>').appendTo(dropdownQuestion);
	$('<br>').appendTo(dropdownQuestion);
	$('#question-list').append(dropdownQuestion);
});*/

$(document).on('click', '#add-check-question', function(evt) {
	evt.preventDefault();
	var checkQuestion = document.createElement("div");
	var newId = "newq" + questionNum;
	questionNum += 1;
	checkQuestion.setAttribute("id", newId);
	checkQuestion.setAttribute("data-type", "check");
	$("<span>Checkbox Question</span>").appendTo(checkQuestion);
	$('<button class="delete-question btn btn-primary" data-question=' + newId + '>Delete</buttton>').appendTo(checkQuestion);
	$('<br>').appendTo(checkQuestion);
	$('<textarea/>').attr({ form: 'create-listing', cols: '50', name: newId, required : true}).appendTo(checkQuestion);
	$('<br>').appendTo(checkQuestion);
	$('<br>').appendTo(checkQuestion);
	$('#question-list').append(checkQuestion);
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
	console.log(data);
	
	var questionList = [];
	Object.keys(data).forEach(function(id) {
		if (id.indexOf("newq") === 0){
			questionList.push({
	        	"question" : data[id],
	        	"type" : $('#' + id).data('type'),
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