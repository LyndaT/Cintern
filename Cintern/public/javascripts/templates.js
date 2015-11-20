(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"homepage\">\n  <h1>Cintern!</h1>\n  <p>You must be signed in to continue.</p>\n  <br>\n  <button class=\"btn btn-primary\" id=\"signin-btn\">Sign in</button>\n  <button class=\"btn btn-primary\" id=\"employer-register-btn\">Sign Up as Student</button>\n  <button class=\"btn btn-primary\" id=\"student-register-btn\">Sign Up as Employer</button>\n</div>\n";
},"useData":true});
})();