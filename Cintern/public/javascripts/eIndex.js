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

$(document).on('click', '.applicant-row', function(evt) {
	var item = $(this);
    var userId = item.data('applicant-id');
    var listingId = item.data('listing-id');
    getFullAppPage(userId, listingId);
});

$(document).on('click', '#star-app-btn', function(evt) {
    evt.preventDefault();
    var appId = $(this).data('app-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');

    $.ajax({
        type: 'PUT', 
        url: '/employers/applications/starred/' + appId,
        data : { "listingId" : listingId }
    }).done(function(response) {
        getFullAppPage(userId, listingId);
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

$(document).on('click', '#unstar-app-btn', function(evt) {
    evt.preventDefault();
    var appId = $(this).data('app-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');
    
    $.ajax({
        type: 'PUT', 
        url: '/employers/applications/unstarred/' + appId,
        data : { "listingId" : listingId }
    }).done(function(response) {
        getFullAppPage(userId, listingId);
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

$(document).on('click', '#reject-app-btn', function(evt) {
    evt.preventDefault();
    var appId = $(this).data('app-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');
    
    $.ajax({
        type: 'PUT', 
        url: '/employers/applications/rejected/' + appId,
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
	loadPage(mainContainer, 'create_listing');
};

// Loads the applicant page corresponding to the listingId
var loadApplicantsPage = function(listingId) {
	$.get('/employers/applications/listings/' + listingId, function(response) {
		loadPage(mainContainer, 'e_applicants', {applicants: response.content.applicants});
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
