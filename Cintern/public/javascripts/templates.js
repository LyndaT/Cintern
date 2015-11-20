(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['e_applicants'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.applicant,depth0,{"name":"applicant","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "      <p><em>No applicants have applied yet.</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : {};

  return "<div id=\"e_applicants\">\n  <h1>Applicants</h1>\n    <p>Currently "
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.applicants : depth0)) != null ? stack1.length : stack1), depth0))
    + " students have applied to this listing</p>\n  <br>\n\n\n  <table style=\"width:90%\">\n  "
    + alias1(((helper = (helper = helpers.applicants || (depth0 != null ? depth0.applicants : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias2,{"name":"applicants","hash":{},"data":data}) : helper)))
    + "\n    <tr>\n      <th>Email</th>\n      <th>Status</th>\n    </tr>\n\n"
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.applicants : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  </table>\n</div>\n";
},"usePartial":true,"useData":true});
templates['e_applicants_row'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"e_applicants_row\">\n  <table style=\"width:90%\">\n    <tr>\n      <td>"
    + alias4(((helper = (helper = helpers.owner || (depth0 != null ? depth0.owner : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n</div>\n";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"homepage\">\n  <h1>Cintern!</h1>\n  <p>You must be signed in to continue.</p>\n  <br>\n  <button class=\"btn btn-primary\" id=\"signin-btn\">Sign in</button>\n  <button class=\"btn btn-primary\" id=\"employer-register-btn\">Sign Up as Student</button>\n  <button class=\"btn btn-primary\" id=\"student-register-btn\">Sign Up as Employer</button>\n</div>\n";
},"useData":true});
templates['s_listing_row'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : {}, alias3=helpers.helperMissing, alias4="function";

  return "<div id=\"s_listing_row\">\n  <table style=\"width:90%\">\n    <tr>\n      <td>"
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.employerId : depth0)) != null ? stack1.company : stack1), depth0))
    + "</td>\n      <td>"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias1(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"description","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n  </table>\n</div>\n";
},"useData":true});
templates['s_listings'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.listing,depth0,{"name":"listing","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "      <p><em>No listings available</em></p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"s_listings\">\n\n\n  <h1>Current available listings</h1>\n  <p>Click on a listing for more detailed information.</p>\n  <br>\n\n  <table style=\"width:90%\">\n\n    <tr>\n      <th>Company</th>\n      <th>Position</th>\n      <th>Description</th>\n    </tr>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.listings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  </table>\n</div>\n";
},"usePartial":true,"useData":true});
})();