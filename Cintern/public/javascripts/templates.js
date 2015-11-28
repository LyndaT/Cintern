(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['application'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "	<div class=\"form-group\">\n"
    + ((stack1 = container.invokePartial(partials.question,depth0,{"name":"question","hash":{"isInProgress":(depths[1] != null ? depths[1].isInProgress : depths[1])},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	<p>No Questions!</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<!-- author: Jennifer Wu -->\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.questions : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true,"useDepths":true});
templates['e_applicants'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.applicant,depth0,{"name":"applicant","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        <tr>\n          <td>No applicants have applied yet.</td>\n        </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : {};

  return "<!-- author: Heeyoon Kim -->\n\n<div>\n  <a href=\"/\" id=\"home-link\">Back to Dash</a>\n\n  <h1>Applicants</h1>\n  \n  <p>Currently "
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.applicants : depth0)) != null ? stack1.length : stack1), depth0))
    + " students have applied to this listing.</p>\n\n  <table class=\"table table-hover table-condensed\">\n    \n    <thead>\n      <th>Name</th>\n      <th>Email</th>\n      <th>School</th>\n      <th>Date submitted</th>\n    </thead>\n    \n    <tbody>\n"
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.applicants : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </tbody>\n\n  </table>\n\n  <button id=\"delete-listing-btn\" class=\"btn btn-primary\" data-listing-id="
    + alias1(((helper = (helper = helpers.listingId || (depth0 != null ? depth0.listingId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias2,{"name":"listingId","hash":{},"data":data}) : helper)))
    + ">Delete Listing</button>\n</div>\n";
},"usePartial":true,"useData":true});
templates['e_applicants_row'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "<!-- author: Heeyoon Kim -->\n\n<div class=\"e-applicant-row\">\n    <tr class=\"clickable applicant-row\" data-applicant-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1._id : stack1), depth0))
    + " data-listing-id="
    + alias2(((helper = (helper = helpers.listing || (depth0 != null ? depth0.listing : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"listing","hash":{},"data":data}) : helper)))
    + ">\n      <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1.email : stack1), depth0))
    + "</td>\n    </tr>\n</div>\n";
},"useData":true});
templates['e_create_listing'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- author: Lynda Tang -->\n<a href=\"/\" id=\"home-link\">Back to Dash</a>\n  \n<form id=\"create-listing\">\n	Create a listing here!\n	\n	<br>\n\n	Position Title: <input type=\"text\" name=\"title\">\n	\n	<div>\n		Description\n		<br>\n		<textarea \n			rows=\"8\" \n			cols=\"50\" \n			name=\"description\" \n			form=\"create-listing\" \n			placeholder=\"Enter description here...\"></textarea>\n	</div>\n\n	<br>\n\n	<div>\n		Requirements\n		<br>\n		<textarea \n			rows=\"8\" \n			cols=\"50\" \n			name=\"requirements\" \n			form=\"create-listing\"\n			placeholder=\"Enter requirements here...\"></textarea>\n	</div>\n\n	<br>\n\n	<div>\n		Questions:\n		<div id=\"question-list\"></div>\n		<button class=\"btn btn-primary\" id=\"add-question\">Add Question</button>\n	</div>\n\n	<br>\n\n	<div>\n		Deadline:\n		<br>\n		\n	</div>\n\n	<br>\n	<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n</form>\n";
},"useData":true});
templates['e_dash_page'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.e_dash_page_listing,depth0,{"name":"e_dash_page_listing","hash":{"listing":blockParams[0][0]},"data":data,"blockParams":blockParams,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        <tr>\n        	<td>No listings yet!</td>\n        </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<!-- author: Maddie Dawson -->\n\n<div>\n\n  <h1>Welcome!</h1>\n\n  <button class=\"btn btn-primary right-align\" id=\"new-listing-btn\">Create New Listing</button>\n  \n  Here are your listings:\n\n  <br>\n  <br>\n\n  <table class=\"table table-hover table-condensed\">\n\n    <thead>\n  	  <th>Title</th>\n  	</thead>\n\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.listings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.program(3, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </tbody>\n  \n  </table>\n</div>";
},"usePartial":true,"useData":true,"useBlockParams":true});
templates['e_dash_page_listing'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<!-- author: Maddie Dawson -->\n\n<div class=\"employer-dash-listing\">\n    <tr class=\"clickable listing-row\" data-listing-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n  	  <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.title : stack1), depth0))
    + "</td>\n    </tr>\n</div>";
},"useData":true});
templates['e_full_app'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "		<button id=\"unstar-custom-btn\" class=\"btn btn-primary btn-lg\" data-custom-id=\""
    + alias1(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"customId","hash":{},"data":data}) : helper)))
    + "\" data-listing-id=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" data-user-id=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n			<span class='glyphicon glyphicon-star center' style=\"color:yellow\"></span>\n		</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "		<button id=\"star-custom-btn\" class=\"btn btn-primary btn-lg\" data-custom-id=\""
    + alias1(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"customId","hash":{},"data":data}) : helper)))
    + "\" data-listing-id=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" data-user-id=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n			<span class='glyphicon glyphicon-star center'></span>\n		</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=container.escapeExpression, alias3=container.lambda;

  return "<!--poor solution to get out of page-->\n<a href=\"/\" id=\"home-link\">Back to Dash</a>\n<div class=\"full-app\">\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isStar : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n	<button id=\"reject-custom-btn\" class=\"btn btn-primary\" data-custom-id=\""
    + alias2(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"customId","hash":{},"data":data}) : helper)))
    + "\" data-listing-id=\""
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" data-user-id=\""
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n		Reject\n	</button>\n\n	<h3>Common Application</h3>\n"
    + ((stack1 = container.invokePartial(partials.application,(depth0 != null ? depth0.common : depth0),{"name":"application","hash":{"isCommon":true,"isSubmitted":(depth0 != null ? depth0.isSubmitted : depth0)},"data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "	<h3>Custom Application</h3>\n"
    + ((stack1 = container.invokePartial(partials.application,(depth0 != null ? depth0.custom : depth0),{"name":"application","hash":{"isCommon":false,"isSubmitted":(depth0 != null ? depth0.isSubmitted : depth0)},"data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});
templates['e_signup'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "      <br>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"e-signup\">\n\n  <div class=\"error\" id = \"e-signup-error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  </div>\n\n  <form id=\"e-signup-form\" class=\"form-horizontal\">\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-xs-2\">Email:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"text\" name=\"email\" required placeholder=\"Email\"/>\n      </div>\n    </div>\n\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Company:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"text\" name=\"company\" required placeholder=\"Company\"/>\n      </div>\n    </div>\n    \n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"password\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n    \n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Confirm Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"confirm\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n    \n    <div class=\"form-group\">\n      <div class=\"col-xs-offset-2 col-xs-6\">\n        <input class=\"btn btn-primary\" type=\"submit\" />\n      </div>\n    </div> \n  \n  </form>\n</div>\n";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\n\n  <h1>Cintern!</h1>\n  <p>You must be signed in to continue.</p>\n  \n  <br>\n  \n  <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#studentSignupModal\">\n    Sign Up as Student\n  </button>\n  \n  <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#employerSignupModal\">\n    Sign Up as Employer\n  </button>\n  \n  <!-- Button trigger modal -->\n  <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#loginModal\">\n    Login\n  </button>\n\n  <!-- Login Modal -->\n  <div class=\"modal fade\" id=\"loginModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n          <h4 class=\"modal-title\">Login</h4>\n        </div>\n        <div class=\"modal-body\" id=\"login-modal\"></div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Employer SignUp -->\n  <div class=\"modal fade\" id=\"employerSignupModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n          <h4 class=\"modal-title\">Employer Sign Up</h4>\n        </div>\n        <div class=\"modal-body\" id=\"employer-signup-modal\"></div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Student SignUp -->\n  <div class=\"modal fade\" id=\"studentSignupModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n          <h4 class=\"modal-title\">Student Sign Up</h4>\n        </div>\n        <div class=\"modal-body\" id=\"student-signup-modal\"></div>\n      </div>\n    </div>\n  </div>\n\n</div>\n";
},"useData":true});
templates['login'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"signin\">\n\n  <div class=\"error\" id=\"login-error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <br>\n  \n  <form id=\"login-form\" class=\"form-horizontal\">\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-xs-2\">Email:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"text\" name=\"email\" required placeholder=\"Email\"/>\n      </div>\n    </div>\n\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"password\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <div class=\"col-xs-offset-2 col-xs-6\">\n        <input class=\"btn btn-primary\" type=\"submit\" />\n      </div>\n    </div> \n\n  </form>\n\n</div>\n";
},"useData":true});
templates['question'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<label class=\"control-label\">"
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</label>\n		\n		<textarea \n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInProgress : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "			\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(2, data, 0),"data":data})) != null ? stack1 : "")
    + "			\n			class=\"form-control\" name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.answer || (depth0 != null ? depth0.answer : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer","hash":{},"data":data}) : helper)))
    + "</textarea>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "";
},"4":function(container,depth0,helpers,partials,data) {
    return "				disabled\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "				required\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " "
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "\n		<select name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\"\n			class=\"form-control\"\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.program(2, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInProgress : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(9, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + ">\n			\n			<option\n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.answer : depth0),"",{"name":"equal","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			>\n				\n			</option>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.program(2, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n		</select>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "				disabled\n			";
},"11":function(container,depth0,helpers,partials,data) {
    return "					selected\n";
},"13":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "				<option value=\""
    + alias2(alias1(depth0, depth0))
    + "\" \n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depths[1] != null ? depths[1].answer : depths[1]),depth0,{"name":"equal","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				>\n					"
    + alias2(alias1(depth0, depth0))
    + "\n				</option>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "						selected\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n		<input \n			type=\"checkbox\" \n			class=\"form-control\" \n			name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" \n			value=\"yes\"\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInProgress : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.answer : depth0),"yes",{"name":"equal","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n		<input \n			type='hidden' \n			class=\"form-control\"\n			name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\"\n			value=\"no\">\n		<label>"
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</label>\n	";
},"17":function(container,depth0,helpers,partials,data) {
    return "				checked\n			";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- author: Jennifer Wu -->\n\n<div class=\"question\" id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-type=\""
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"> \n"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"text",{"name":"equal","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"dropdown",{"name":"equal","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	<!-- "
    + ((stack1 = (helpers.equal || (depth0 && depth0.equal) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"check",{"name":"equal","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " -->\n</div>";
},"useData":true,"useDepths":true});
templates['s_common'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- author: Jennifer Wu -->\n\n<div>\n\n	<h3>Common Application</h3>\n\n	<form id=\"submit-common-form\">\n"
    + ((stack1 = container.invokePartial(partials.application,depth0,{"name":"application","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		<input type=\"submit\" class=\"btn btn-primary\"/>\n	</form>\n	\n</div>";
},"usePartial":true,"useData":true});
templates['s_custom'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<button id=\"delete-custom-btn\" class=\"btn btn-primary\" data-custom-id=\""
    + container.escapeExpression(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"customId","hash":{},"data":data}) : helper)))
    + "\">Delete</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<button id=\"withdraw-custom-btn\" class=\"btn btn-primary\" data-custom-id=\""
    + container.escapeExpression(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"customId","hash":{},"data":data}) : helper)))
    + "\">Withdraw</button>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "			<button id=\"save-custom-btn\" class=\"btn btn-primary\" >Save</button>\n			<input type=\"submit\" class=\"btn btn-primary\"/>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!-- author: Jennifer Wu -->\n\n<div>\n\n	<a href=\"/\" id=\"home-link\">Back to Dash</a>\n\n	<h1>Custom Application</h1>\n\n	<br>\n\n	<label>Position Title: </label> "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n\n	<br>\n	<br>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInProgress : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isSubmitted : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n	<h3>Application</h3>\n\n	<form id=\"submit-custom-form\" data-custom-id=\""
    + alias4(((helper = (helper = helpers.customId || (depth0 != null ? depth0.customId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"customId","hash":{},"data":data}) : helper)))
    + "\" data-user-id=\""
    + alias4(((helper = (helper = helpers.owner || (depth0 != null ? depth0.owner : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner","hash":{},"data":data}) : helper)))
    + "\" data-listing-id=\""
    + alias4(((helper = (helper = helpers.listing || (depth0 != null ? depth0.listing : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"listing","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = container.invokePartial(partials.application,depth0,{"name":"application","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInProgress : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "	</form>\n	\n</div>";
},"usePartial":true,"useData":true});
templates['s_dash_page'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.s_dash_page_app,depth0,{"name":"s_dash_page_app","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        <tr>\n        	<td>No applications yet!</td>\n        </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- author: Maddie Dawson -->\n\n<div>\n  <button class=\"btn btn-primary\" id=\"s-view-listings\">View Listings</button>\n  \n  <h1>Welcome!</h1>\n  Here are your applications:\n\n  <br>\n  <br>\n  \n  <table class=\"table table-hover table-condensed\">\n  	\n    <thead>\n  	  <th>Company</th>\n  	  <th>Title</th>\n  	  <th>Status</th>\n  	</thead>\n\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.apps : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  \n  </table>\n</div>";
},"usePartial":true,"useData":true});
templates['s_dash_page_app'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "  	<tr class=\"clickable student-custom\" data-listing-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" data-user-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1._id : stack1), depth0))
    + "\">\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "  	<tr class=\"clickable student-custom\" data-listing-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" data-user-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.owner : depth0)) != null ? stack1._id : stack1), depth0))
    + "\" style=\"color:red\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return "<!-- author: Maddie Dawson -->\n\n<div class=\"student-dash-app\">\n"
    + ((stack1 = (helpers.deadlineNotPassed || (depth0 && depth0.deadlineNotPassed) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.deadline : stack1),{"name":"deadlineNotPassed","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  \n  	<td>"
    + alias4(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.employer : stack1)) != null ? stack1.company : stack1), depth0))
    + "</td>\n  	<td>"
    + alias4(alias3(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.title : stack1), depth0))
    + "</td>\n  	<td>"
    + alias4((helpers.interpretState || (depth0 && depth0.interpretState) || alias2).call(alias1,(depth0 != null ? depth0.state : depth0),{"name":"interpretState","hash":{},"data":data}))
    + "</td>\n  </tr>\n</div>";
},"useData":true});
templates['s_listing'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div>\n	<a href=\"/\" id=\"home-link\">Back to Dash</a>\n</div>\n\n<div class=\"listing\">\n	<label>Company: </label> "
    + alias4(((helper = (helper = helpers.company || (depth0 != null ? depth0.company : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"company","hash":{},"data":data}) : helper)))
    + "\n	<br>\n	<label>Position Title: </label> "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n	\n	<br>\n	<br>\n\n	<label>Description:</label>\n	<p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n\n	<br>\n	<br>\n\n	<label>Requirements:</label>\n	<p>"
    + alias4(((helper = (helper = helpers.requirements || (depth0 != null ? depth0.requirements : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"requirements","hash":{},"data":data}) : helper)))
    + "</p>\n\n	<br>\n	<br>\n\n	<button class=\"btn btn-primary\" id=\"add-custom\" data-listing-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + ">Add to my list</button>	\n</div>";
},"useData":true});
templates['s_listing_row'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<!-- author: Heeyoon Kim -->\n\n<div>\n    <tr class=\"clickable s-listing\" data-listing-id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + " data-listing-company="
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.employer : depth0)) != null ? stack1.company : stack1), depth0))
    + ">\n      <td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.employer : depth0)) != null ? stack1.company : stack1), depth0))
    + "</td>\n      <td>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\n      <td>"
    + alias4(((helper = (helper = helpers.deadline || (depth0 != null ? depth0.deadline : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"deadline","hash":{},"data":data}) : helper)))
    + "</td>\n    </tr>\n</div>\n";
},"useData":true});
templates['s_listings'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.listing,depth0,{"name":"listing","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "        <tr>\n          <td>No listings available</td>\n        </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- author: Heeyoon Kim -->\n\n<div>\n  <a href=\"/\" id=\"home-link\">Back to Dash</a>\n\n  <h1>Current available listings</h1>\n  <p>Click on a listing for more detailed information.</p>\n  <br>\n\n  <table class=\"table table-hover table-condensed row-clickable\">\n\n    <thead>\n      <th>Company</th>\n      <th>Position</th>\n      <th>Deadline</th>\n    </thead>\n\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.listings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    </tbody>\n\n  </table>\n</div>\n";
},"usePartial":true,"useData":true});
templates['s_signup'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "      <br>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"s-signup\">\n\n  <div class=\"error\" id = \"s-signup-error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  </div>\n\n  <form id=\"s-signup-form\" class=\"form-horizontal\">\n\n    <div class=\"form-group\">\n      <label class=\"control-label col-xs-2\">Email:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"text\" name=\"email\" required placeholder=\"Email\"/>\n      </div>\n    </div>\n\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"password\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Confirm Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"confirm\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <div class=\"col-xs-offset-2 col-xs-6\">\n        <input class=\"btn btn-primary\" type=\"submit\" />\n      </div>\n    </div> \n\n  </form>\n\n</div>\n";
},"useData":true});
})();