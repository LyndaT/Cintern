/**
 * @author: Jennifer Wu & Maddie Dawson
 */
 
var mainContainer = '#s-main-container';

// load the dash page
$(document).ready(function() {
	loadDashPage();
});

$(document).on('click', '#dash-nav', function(evt) {
	loadDashPage();
});

$(document).on('click', '#listing-nav', function(evt) {
	loadAllListingsPage();
});

$(document).on('click', '#common-nav', function(evt) {
	loadCommonPage();
})

$(document).on('click', '.s-listing', function(evt) {
	var listingId = $(this).data('listing-id');
	var company = $(this).data('listing-company');
	loadListingModal(listingId, company);
});

// $(document).on('click', '.unclickable', function(evt) {
// 	$('#error').text("You have already applied to this listing.");
// });

$(document).on('click', '.student-custom', function(evt) {
	var item = $(this);
	var listingId = item.data('listing-id');
	loadCustomModal(listingId);
});

// save listing's custom template to user's list
$(document).on('click', '#add-custom', function(evt) {
	var listingId = $(this).data('listing-id');
	$.ajax({
		type: 'POST', 
		url: '/students/applications/custom/added/' + listingId,
	}).done(function(response) {
		$('#listingModal').modal('hide');
	}).fail(function(response) {
		// example of how we might want to display error message
		console.log(JSON.parse(response.responseText).err);
	});
});

$(document).on('click', '#withdraw-custom-btn', function(evt) {
	var customId = $(this).data('custom-id');
	$.ajax({
		type: 'PUT', 
		url: '/students/applications/withdrawal/' + customId,
	}).done(function(response) {
		$('#customModal').modal('hide');
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
		$('#customModal').modal('hide');
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
    	$('#customModal').modal('hide');
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
        console.log(JSON.parse(responseObject.responseText).err);
    });
});

// Update a custom
$(document).on('click', '#save-custom-btn', function(evt) {
    evt.preventDefault();
    var formData = helpers.getFormData('#submit-custom-form');
    var customId = $('#submit-custom-form').data('custom-id');
    var listingId = $('#submit-custom-form').data('listing-id');

    $.ajax({
        type: 'PUT', 
        url: '/students/applications/saved/' + customId,
        contentType: 'application/json',
        data: JSON.stringify({ "answers" : formData})
    }).done(function(response) {
        loadCustomModal(listingId);
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

// change the active status of the navigarion tabs when a new one is clicked on
$(document).on('click', 'ul.nav-tabs li', function(e){
  $('ul.nav-tabs li.active').removeClass('active');
    $(this).addClass('active');
});

// Loads the dash page
var loadDashPage = function() {
	$.get('/students/applications', function(response) {
		loadPage(mainContainer, 's_dash_page', { apps: response.content.applications });
		$("#s-dash-table").tablesorter();
	});
};

// Loads all listings
var loadAllListingsPage = function() {
	$.get('/students/listings', function(response) {
		console.log(response.content);
		loadPage(mainContainer, 's_listings', {
			listings: response.content.listings, 
			userListings: response.content.userListings
		});
		$("#s-listing-table").tablesorter();
	});
}

// Loads the common app that the user has already submitted
var loadCommonPage = function() {
	$.get('/students/applications/common', function(response) {
      	loadPage(mainContainer, 's_common', {
			questions : response.content.application.questions, 
            isInProgress : false
		});
	});
}

// Loads an individual listing page corresponding to the listingId
var loadListingModal = function(listingId, company) {
	$.get('/students/listings/' + listingId, function(response) {
		var data = response.content.listing;
		data.company = company;
		
		loadModal('#listing-modal-content', 's_listing', data);

		$('#listingModal').modal('show');
	});
}

// Loads the Custom App page corresponding to the userId and listingId
var loadCustomModal = function(listingId) {
	$.ajax({
		type: "GET",
		url: "/students/applications/custom/" + listingId
	}).done(function(response) {

		console.log(response.content);
		var data = {
	      title : response.content.listing.title,
	      listing : listingId, 
	      questions : response.content.application.questions, 
	      customId : response.content._id, 
	      state : response.content.state,
	      isInProgress : response.content.state === "save",
	    };

    	loadModal('#custom-modal-content', 's_custom', data);

        $('#customModal').modal('show'); 

	}).fail(function(response) {
		console.log("ERROR :(");
	});
}

// reload page when applicant modal is closed
$(document).on('hidden.bs.modal', '#customModal', function(evt) {
    loadDashPage();
});

// reload page when applicant modal is closed
$(document).on('hidden.bs.modal', '#listingModal', function(evt) {
    loadAllListingsPage();
});
