(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['application'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "		<div class=\"form-group\">\n"
    + ((stack1 = container.invokePartial(partials.question,depth0,{"name":"question","hash":{"isCommon":(depths[1] != null ? depths[1].isCommon : depths[1]),"isSubmitted":(depths[1] != null ? depths[1].isSubmitted : depths[1])},"data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		<p>No Questions!</p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"form-group\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.isCommon : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "	        <input type=\"submit\" id=\"submit-app-btn\" class=\"btn btn-primary\" id=\"submitButton\"/>\n	    </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "	        	<button type=\"submit\" id=\"save-app-btn\" class=\"btn btn-primary\" id=\"saveButton\">Save</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<form id=\"submit-app-form\" data-app-id=\""
    + alias4(((helper = (helper = helpers.appId || (depth0 != null ? depth0.appId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"appId","hash":{},"data":data}) : helper)))
    + "\" data-is-common=\""
    + alias4(((helper = (helper = helpers.isCommon || (depth0 != null ? depth0.isCommon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"isCommon","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.questions : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isSubmitted : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</form>";
},"usePartial":true,"useData":true,"useDepths":true});
templates['createlisting'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form id=\"create-listing\">\n	Create a listing here!\n	\n	<br>\n	Position Title: <input type=\"text\" name=\"title\">\n	\n	<div id = \"add-description\">\n		Description\n		<br>\n		<textarea \n			rows=\"8\" \n			cols=\"50\" \n			name=\"description\" \n			form=\"create-listing\" \n			placeholder=\"Enter description here...\"></textarea>\n	</div>\n	<br>\n	<div id = \"add-requirements\">\n		Requirements\n		<br>\n		<textarea \n			rows=\"8\" \n			cols=\"50\" \n			name=\"requirements\" \n			form=\"create-listing\"\n			placeholder=\"Enter requirements here...\"></textarea>\n	</div>\n	<br>\n	<div id=\"questions\">\n		Questions:\n		<div id=\"question-list\"></div>\n		<button class=\"btn btn-primary\" id=\"add-question\">Add Question</button>\n	</div>\n	<br>\n	<button type=\"submit\" id=\"submit-listing-btn\" class=\"btn btn-primary\" id=\"submitButton\">Submit</button>\n</form>\n";
},"useData":true});
templates['e_dash_page'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.e_dash_page_listing,depth0,{"name":"e_dash_page_listing","hash":{"listing":blockParams[0][0]},"data":data,"blockParams":blockParams,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "      <tr>\n      	<td>No listings yet!</td>\n      </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<div id=\"employer-dash\">\n  <h1>Welcome!</h1>\n  <button class=\"btn btn-primary right-align\" id=\"new-listing-btn\">Create New Listing</button>\n  \n  Here are your listings:\n\n  <br>\n  <br>\n\n  <table class=\"table table-hover table-condensed\">\n    <tr>\n  	  <th>Title</th>\n  	</tr>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.listings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.program(3, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "  </table>\n</div>";
},"usePartial":true,"useData":true,"useBlockParams":true});
templates['e_dash_page_listing'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div id=\"employer-dash-listing\" data-listing-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n  <tr>\n  	<td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.listing : depth0)) != null ? stack1.title : stack1), depth0))
    + "</td>\n  </tr>\n</div>";
},"useData":true});
templates['e_signup'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "      <br>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"e-signup\">\n  <a href=\"#\" id=\"home-link\">Back to Home</a>\n  <h1>Employer Sign Up</h1>\n  <br>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form id=\"e-signup-form\" class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label class=\"control-label col-xs-2\">Email:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"text\" name=\"email\" required placeholder=\"Email\"/>\n      </div>\n    </div>\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Company:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"text\" name=\"company\" required placeholder=\"Company\"/>\n      </div>\n    </div>\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"password\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Confirm Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"confirm\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"col-xs-offset-2 col-xs-6\">\n        <input class=\"btn btn-primary\" type=\"submit\" />\n      </div>\n    </div> \n  </form>\n</div>\n";
},"useData":true});
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"homepage\">\n  <h1>Cintern!</h1>\n  <p>You must be signed in to continue.</p>\n  <br>\n  <button class=\"btn btn-primary\" id=\"s-signup-btn\">Sign Up as Student</button>\n  <button class=\"btn btn-primary\" id=\"e-signup-btn\">Sign Up as Employer</button>\n  <!-- Button trigger modal -->\n<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#myModal\">\n  Login\n</button>\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">Login</h4>\n      </div>\n      <div class=\"modal-body\" id = \"login-modal\">\n      </div>\n    </div>\n  </div>\n</div>\n</div>\n";
},"useData":true});
templates['login'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"signin\">\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <br>\n  \n  <form id=\"login-form\" class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label class=\"control-label col-xs-2\">Email:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"text\" name=\"email\" required placeholder=\"Email\"/>\n      </div>\n    </div>\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"password\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"col-xs-offset-2 col-xs-6\">\n        <input class=\"btn btn-primary\" type=\"submit\" />\n      </div>\n    </div> \n  </form>\n</div>\n";
},"useData":true});
templates['question'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "			rows=\"1\"\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "";
},"5":function(container,depth0,helpers,partials,data) {
    return "			disabled \n";
},"7":function(container,depth0,helpers,partials,data) {
    return "			required\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"question\">\n	<label class=\"control-label\">"
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</label>\n	<textarea \n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isCommon : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "		\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isSubmitted : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "		\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "		\n		class=\"form-control\" name=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.answer || (depth0 != null ? depth0.answer : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer","hash":{},"data":data}) : helper)))
    + "</textarea>\n</div>";
},"useData":true});
templates['s_dash_page'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.s_dash_page_app,depth0,{"name":"s_dash_page_app","hash":{"state":((stack1 = blockParams[0][0]) != null ? stack1.state : stack1),"title":((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.listing : stack1)) != null ? stack1.title : stack1),"company":((stack1 = ((stack1 = ((stack1 = blockParams[0][0]) != null ? stack1.listing : stack1)) != null ? stack1.employerId : stack1)) != null ? stack1.company : stack1)},"data":data,"blockParams":blockParams,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "      <tr>\n      	<td>No applications yet!</td>\n      </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "<div id=\"student-dash\">\n  <h1>Welcome!</h1>\n  Here are your applications:\n\n  <br>\n  <br>\n  \n  <table class=\"table table-hover table-condensed\">\n  	<tr>\n  	  <th>Company</th>\n  	  <th>Title</th>\n  	  <th>Status</th>\n  	</tr>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.apps : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.program(3, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "  </table>\n</div>";
},"usePartial":true,"useData":true,"useBlockParams":true});
templates['s_dash_page_app'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : {}, alias3=helpers.helperMissing, alias4="function";

  return "<div class=\"student-dash-app\" data-app-id="
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n  <tr>\n  	<td>"
    + alias1(((helper = (helper = helpers.company || (depth0 != null ? depth0.company : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"company","hash":{},"data":data}) : helper)))
    + "</td>\n  	<td>"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\n  	<td>"
    + alias1(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"state","hash":{},"data":data}) : helper)))
    + "</td>\n  </tr>\n</div>";
},"useData":true});
templates['s_signup'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "      <br>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"s-signup\">\n  <a href=\"#\" id=\"home-link\">Back to Home</a>\n  <h1>Student Sign Up</h1>\n  <br>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "  </div>\n  <form id=\"s-signup-form\" class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label class=\"control-label col-xs-2\">Email:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"text\" name=\"email\" required placeholder=\"Email\"/>\n      </div>\n    </div>\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"password\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Confirm Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"confirm\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"col-xs-offset-2 col-xs-6\">\n        <input class=\"btn btn-primary\" type=\"submit\" />\n      </div>\n    </div> \n  </form>\n</div>\n";
},"useData":true});
})();