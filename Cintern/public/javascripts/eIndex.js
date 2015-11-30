/** 
 * @author Jennifer Wu
 */
 
var mainContainer = '#e-main-container';


$(document).ready(function() {
	loadDashPage();
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
    getFullAppModal(userId, listingId);
});

$(document).on('click', '.star-custom-btn', function(evt) {
    evt.preventDefault();
    var customId = $(this).data('custom-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');

    $.ajax({
        type: 'PUT', 
        url: '/employers/applications/starred/' + customId,
        data : { "listingId" : listingId }
    }).done(function(response) {
        getFullAppModal(userId, listingId);
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

$(document).on('click', '.unstar-custom-btn', function(evt) {
    evt.preventDefault();
    var customId = $(this).data('custom-id');
    var listingId = $(this).data('listing-id');
    var userId = $(this).data('user-id');
    
    $.ajax({
        type: 'PUT', 
        url: '/employers/applications/unstarred/' + customId,
        data : { "listingId" : listingId }
    }).done(function(response) {
        getFullAppModal(userId, listingId);
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
        $('#applicantModal').modal('hide');
    }).fail(function(responseObject) {
        var response = $.parseJSON(responseObject.responseText);
    });
});

// Loads the Employer Dash
var loadDashPage = function() {
	$.get('/employers/listings', function(response) {
		loadPage(mainContainer, 'e_dash_page', 
            { listings: response.content.listings, numApplicantsMap: response.content.numApplicantsMap });
        loadModal('#new-listing-modal-content', 'e_create_listing');
        $("#e-dash-table").tablesorter();
	});
};


// Loads the applicant page corresponding to the listingId
var loadApplicantsPage = function(listingId) {
	$.get('/employers/applications/listings/' + listingId, function(response) {
        console.log(response.content.applicants);
		loadPage(mainContainer, 'e_applicants', {
            applicants: response.content.applicants,
            headers: response.content.headers, listingId: listingId
        });
        $("#e-applicants-table").tablesorter();
	});
};

// Loads the Full Application page corresponding to the userId and listingId
var getFullAppModal = function(userId, listingId) {
	$.get('/employers/applications/fullapp/' + userId + '/' + listingId, function(response) {

        var data = {
            common : response.content.commonApp,
            custom : response.content.customApp,
            customId : response.content.customId,
            listing : response.content.listing,
            owner : response.content.owner,
            isStar : response.content.state === "star",
            isSubmitted : true
        };

    	loadModal('#applicant-modal-content', 'e_full_app', data);

        $('#applicantModal').modal('show'); 
	});
};

// reload page when applicant modal is closed
$(document).on('hidden.bs.modal', '#applicantModal', function(evt) {
    loadApplicantsPage($('#applicantModal').data('listing-id'));
});
