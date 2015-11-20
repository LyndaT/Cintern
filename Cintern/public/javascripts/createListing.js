$(document).on('click', '#add-question', function(evt) {
	evt.preventDefault();
	$('<textarea/>').attr({ form: 'listingform', cols: '50'}).appendTo('#question-list');
	$('<br>').appendTo('#question-list');
	$('<br>').appendTo('#question-list');
});

$(document).on('click', '#submit-listing-btn', function(evt) {
	evt.preventDefault();
	console.log("listing submitted");
});