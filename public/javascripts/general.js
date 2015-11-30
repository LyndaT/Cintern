Handlebars.registerPartial('listing', Handlebars.templates['s_listing_row']);
Handlebars.registerPartial('s_dash_page_app', Handlebars.templates['s_dash_page_app']);
Handlebars.registerPartial('application', Handlebars.templates['application']);
Handlebars.registerPartial('question', Handlebars.templates['question']);
Handlebars.registerPartial('e_dash_page_listing', Handlebars.templates['e_dash_page_listing']);
Handlebars.registerPartial('applicant', Handlebars.templates['e_applicants_row']);

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

// TODO: attach some universal way to check that deadline is not passed
Handlebars.registerHelper('deadlineNotPassed', function(date, options) {
  if (arguments.length < 2)
        throw new Error("Handlebars Helper deadlineNotPassed need 1 parameter");
    // TODO: possibly remove second statement
    if( new Date(date) < Date.now() || date === undefined ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

// Nicely formats ISO date to MM/dd/YYYY
Handlebars.registerHelper('formatDate', function(ISODate, format) {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper formatDate needs 1 paramater");
  else {
    var date = new Date(ISODate);
    var day = ("0" + date.getDate()).slice(-2);  
    var month = ("0" + (date.getMonth()+1)).slice(-2)
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    return month + '/' + day + '/' + year + ' ' + formattedTime(hour, minutes);
  }
});

Handlebars.registerHelper('in', function(list, item, options) {
  if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if ($.inArray(item, list) >= 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
});

Handlebars.registerHelper('getValue', function(obj, key) {
    return (obj[key]);
});

//Makes hours, minutes, day, or month two digits
var twoDigitDate = function(date) {
  if (date < 10) {
    return "0" + date;
  }
  return date;
};

//nicely formats time
var formattedTime = function(hours, minutes) {
  if (hours < 13) {
    return twoDigitDate(hours) + ":" + twoDigitDate(minutes) + "AM";
  } else {
    return (hours-12) + ":" + minutes + "PM";
  }
};

/**
 * This function loads the Handlebar template called template initialized
 * with data into the container
 *
 * @param{String} container
 * @param{String} template
 * @param{Object} data
 */
var loadPage = function(container, template, data) {
	data = data || {};
	$(container).html(Handlebars.templates[template](data));
};

var loadModal = function(container, template, data){
  data = data || {};
  $(container).html(Handlebars.templates[template](data));
};

// When the logout button has been clicked, logout the user
$(document).on('click', '#logout-btn', function(evt){
	console.log("logout clickedd");
  $.ajax({
    type: "POST", 
    url: '/users/logout'
  }).done(function(){
    $(location).attr('href', '/');
  })
});