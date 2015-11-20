(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['e_dash_page'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.e_dash_page_listing,depth0,{"name":"e_dash_page_listing","hash":{"listing":blockParams[0][0]},"data":data,"blockParams":blockParams,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "      <tr>\n      	<td>No listings yet!</td>\n      </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"employer-dash\">\n  <h1>Welcome "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "!</h1>\n  Here are your listings:\n\n  <table>\n    <tr>\n  	  <td><b>Title</b></td>\n  	</tr>\n  	\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.listings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.program(3, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
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
    return "<div id=\"homepage\">\n  <h1>Cintern!</h1>\n  <p>You must be signed in to continue.</p>\n  <br>\n  <button class=\"btn btn-primary\" id=\"login-btn\">Login</button>\n  <button class=\"btn btn-primary\" id=\"s-signup-btn\">Sign Up as Student</button>\n  <button class=\"btn btn-primary\" id=\"e-signup-btn\">Sign Up as Employer</button>\n</div>\n";
},"useData":true});
templates['login'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"signin\">\n  <a href=\"#\" id=\"home-link\">Back to Home</a>\n  <h1>Login</h1>\n  <div class=\"error\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n  <ul class=\"nav nav-tabs\" id=\"login-menu\">\n    <li role=\"presentation\" class=\"active\" data-toggle=\"tab\" id=\"s-login-nav\"><a>Student</a></li>\n    <li role=\"presentation\" data-toggle=\"tab\" id=\"e-login-nav\"><a>Employer</a></li>\n  </ul>\n\n  <br>\n  \n  <form id=\"login-form\" class=\"form-horizontal\">\n    <div class=\"form-group\">\n      <label class=\"control-label col-xs-2\">Email:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"text\" name=\"email\" required placeholder=\"Email\"/>\n      </div>\n    </div>\n    <div class = \"form-group\">\n      <label class=\"control-label col-xs-2\">Password:</label>\n      <div class=\"col-xs-6\">\n        <input class=\"form-control\" type=\"password\" name=\"password\" required placeholder=\"Password\"/>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"col-xs-offset-2 col-xs-6\">\n        <input class=\"btn btn-primary\" type=\"submit\" />\n      </div>\n    </div> \n  </form>\n</div>\n";
},"useData":true});
templates['s_dash_page'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.s_dash_page_app,depth0,{"name":"s_dash_page_app","hash":{"app":blockParams[0][0]},"data":data,"blockParams":blockParams,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "      <tr>\n      	<td>No applications yet!</td>\n      </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"student-dash\">\n  <h1>Welcome "
    + container.escapeExpression(((helper = (helper = helpers.currentUser || (depth0 != null ? depth0.currentUser : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentUser","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "!</h1>\n  Here are your applications:\n  \n  <table>\n  	<tr>\n  	  <td><b>Company</b></td>\n  	  <td><b>Title</b></td>\n  	  <td><b>Status</b></td>\n  	</tr>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.apps : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.program(3, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "  </table>\n</div>";
},"usePartial":true,"useData":true,"useBlockParams":true});
templates['s_dash_page_app'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"student-dash-app\" data-app-id="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n  <tr>\n  	<td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1.companyName : stack1), depth0))
    + "</td>\n  	<td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1.title : stack1), depth0))
    + "</td>\n  	<td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.app : depth0)) != null ? stack1.status : stack1), depth0))
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