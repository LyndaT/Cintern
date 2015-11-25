/**
 * @author: Maddie Dawson
 */

Handlebars.registerPartial('listing', Handlebars.templates['s_listing_row']);
Handlebars.registerPartial('s_dash_page_app', Handlebars.templates['s_dash_page_app']);
Handlebars.registerPartial('application', Handlebars.templates['application']);
Handlebars.registerPartial('question', Handlebars.templates['question']);
Handlebars.registerHelper("interpretState", function(state) {
    if (state === "subm") return "Submitted";
    if (state === "save") return "Saved";
    if (state === "with") return "Withdrawn";
    if (state === "rej") return "Rejected";
});

Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
	if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

var mainContainer = '#s-main-container';


// load the dash page
$(document).ready(function() {
	loadDashPage();
});

$(document).on('click', '#s-view-listings', function(evt) {
	loadAllListingsPage();
});

$(document).on('click', '.s-listing', function(evt) {
	var listingId = $(this).data('listing-id');
	var company = $(this).data('listing-company');
	loadListingPage(listingId, company);
});

$(document).on('click', '.student-custom', function(evt) {
	var item = $(this);
	var listingId = item.data('listing-id');
	var userId = item.data('user-id');
	loadCustomAppPage(userId, listingId);
});

// save listing's custom template to user's list
$(document).on('click', '#add-custom', function(evt) {
	var listingId = $(this).data('listing-id');
	$.ajax({
		type: 'POST', 
		url: '/students/applications/custom/added/' + listingId,
	}).done(function(response) {
		loadAllListingsPage();
	}).fail(function(response) {
		console.log('Error');
	});
});

$(document).on('click', '#withdraw-custom-btn', function(evt) {
	var customId = $(this).data('custom-id');
	$.ajax({
		type: 'PUT', 
		url: '/students/applications/withdrawal/' + customId,
	}).done(function(response) {
		loadDashPage();
	}).fail(function(response) {
		console.log('Error');
	});
});

$(document).on('click', '#delete-custom-btn', function(evt) {
	var customId = $(this).data('custom-id');
	$.ajax({
		type: 'DELETE', 
		url: '/students/applications/' + customId,
	}).done(function(response) {
		loadDashPage();
	}).fail(function(response) {
		console.log('Error');
	});
});

// Submit a custom
$(document).on('submit', '#submit-custom-form', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData(this);
    var customId = $(this).data('custom-id');

    $.ajax({
        type: 'PUT', 
        url: '/students/applications/custom/' + customId,
        contentType: 'application/json',
        data: JSON.stringify({ "answers" : formData})
    }).done(function(response) {
        loadDashPage();
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

// Update a custom
$(document).on('click', '#save-custom-btn', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData('#submit-custom-form');
    var customId = $('#submit-custom-form').data('custom-id');
    var listingId = $('#submit-custom-form').data('listing-id');
    var userId = $('#submit-custom-form').data('user-id');

    var content = {
      "answers" : formData
    };

    $.ajax({
        type: 'PUT', 
        url: '/students/applications/saved/' + customId,
        contentType: 'application/json',
        data: JSON.stringify({ "answers" : formData})
    }).done(function(response) {
        loadCustomAppPage(userId, listingId);
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

// Loads the dash page
var loadDashPage = function() {
	$.get('/students/applications', function(response) {
		console.log(response);
		loadPage(mainContainer, 's_dash_page', { apps: response.content.applications });
	});
};

// Loads all listings
var loadAllListingsPage = function() {
	$.get('/students/listings', function(response) {
		loadPage(mainContainer, 's_listings', {listings: response.content.listings});
	});
}

// Loads an individual listing page corresponding to the listingId
var loadListingPage = function(listingId, company) {
	$.get('/students/listings/' + listingId, function(response) {
		var data = response.content.listing;
		data.company = company;
		loadPage(mainContainer, 's_listing', data)
	});
}

// Loads the Custom App page corresponding to the userId and listingId
var loadCustomAppPage = function(userId, listingId) {
	$.ajax({
		type: "GET",
		url: "/students/applications/custom/" + listingId
	}).done(function(response) {
		var data = {
	      title : response.content.listing.title,
	      listing : listingId, 
	      owner : userId,
	      questions : response.content.application.questions, 
	      customId : response.content._id, 
	      isCommon : false,
	      isInProgress : response.content.state === "save",
	      isSubmitted : response.content.state === "subm",
	    };
	    loadPage(mainContainer, 's_custom', data);
	}).fail(function(response) {
		console.log("ERROR :(");
	});
}