/**
 * @author Lynda Tang
 */

var questionNum = 0;

$(document).on('click', '#add-question', function(evt) {
	evt.preventDefault();
	$('<textarea/>').attr({ form: 'create-listing', cols: '50', name:"newq" + questionNum}).appendTo('#question-list');
	$('<br>').appendTo('#question-list');
	$('<br>').appendTo('#question-list');
	questionNum = questionNum + 1;
});

// Create a new Listing
$(document).on('click', '#submit-listing-btn', function(evt) {
	evt.preventDefault();
	var data = helpers.getFormData("#create-listing");
	
	var questionList = [];
	Object.keys(data).forEach(function(id) {
			if (id.indexOf("newq")==0){
		        questionList.push(data[id]);
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
          console.log("listing posted");
          location.reload();
      }).fail(function(responseObject) {
          var response = $.parseJSON(responseObject.responseText);
          $('.error').text(response.err);
      });;
});