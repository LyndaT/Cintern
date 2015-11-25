Handlebars.registerPartial('e_dash_page_listing', Handlebars.templates['e_dash_page_listing']);
Handlebars.registerPartial('applicant', Handlebars.templates['e_applicants_row']);
Handlebars.registerPartial('question', Handlebars.templates['question']);
Handlebars.registerPartial('application', Handlebars.templates['application']);

var mainContainer = '#e-main-container';


$(document).ready(function() {
	loadDashPage();
});


$(document).on('click', '#new-listing-btn', function(evt) {
	loadCreateListingPage();
});

$(document).on('click', '.listing-row', function(evt) {
	var item = $(this);
    var listingId = item.data('listing-id');
    loadApplicantsPage(listingId);
});

$(document).on('click', '#delete-listing-btn', function(evt) {
    var listingId = $(this).data('listing-id');
    $.ajax({
        type: 'DELETE',
        url: '/employers/listings/' + listingId,
        contentType: 'application/json'
    }).done(function(response) {
        loadDashPage();
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

$(document).on('click', '.applicant-row', function(evt) {
	var item = $(this);
    var userId = item.data('applicant-id');
    var listingId = item.data('listing-id');
    getFullAppPage(userId, listingId);
});

$(document).on('click', '#star-custom-btn', function(evt) {
    evt.preventDefault();
    var customId = $(this).data('custom-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');

    $.ajax({
        type: 'PUT', 
        url: '/employers/applications/starred/' + customId,
        data : { "listingId" : listingId }
    }).done(function(response) {
        getFullAppPage(userId, listingId);
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

$(document).on('click', '#unstar-custom-btn', function(evt) {
    evt.preventDefault();
    var customId = $(this).data('custom-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');
    
    $.ajax({
        type: 'PUT', 
        url: '/employers/applications/unstarred/' + customId,
        data : { "listingId" : listingId }
    }).done(function(response) {
        getFullAppPage(userId, listingId);
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

$(document).on('click', '#reject-custom-btn', function(evt) {
    evt.preventDefault();
    var customId = $(this).data('custom-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');
    
    $.ajax({
        type: 'PUT', 
        url: '/employers/applications/rejected/' + customId,
        data : { "listingId" : listingId }
    }).done(function(response) {
        loadApplicantsPage(listingId);
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

// Loads the Employer Dash
var loadDashPage = function() {
	$.get('/employers/listings', function(response) {
		loadPage(mainContainer, 'e_dash_page', { listings: response.content.listings });
	});
};

// Loads the page to create a listing
var loadCreateListingPage = function() {
	loadPage(mainContainer, 'e_create_listing');
};

// Loads the applicant page corresponding to the listingId
var loadApplicantsPage = function(listingId) {
	$.get('/employers/applications/listings/' + listingId, function(response) {
		loadPage(mainContainer, 'e_applicants', {applicants: response.content.applicants, listingId: listingId});
	});
};

// Loads the Full Application page corresponding to the userId and listingId
var getFullAppPage = function(userId, listingId) {
	$.get('/employers/applications/fullapp/' + userId + '/' + listingId, function(response) {
    	loadPage(mainContainer, 'e_full_app', {
    		common : response.content.commonApp,
    		custom : response.content.customApp,
    		customId : response.content.customId,
    		listing : response.content.listing,
    		owner : response.content.owner,
    		isStar : response.content.state === "star",
    		isSubmitted : true
    	});
	});
};
