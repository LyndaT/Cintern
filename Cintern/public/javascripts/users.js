(function() {
	
	var helpers = (function() {
		var _helpers = {};
		_helpers.getFormData = function(form) {
			var inputs = {};
			$(form).serializeArray().forEach(function(item) {
				inputs[item.name] = item.value;
			});
			return inputs;
		};
		Object.freeze(_helpers);
		return _helpers;
	})();
	

  /**
   * Signs up as a Student
   */
  $(document).on('submit', '#student-signup-form', function(evt) {
      evt.preventDefault();
      var formData = helpers.getFormData(this);
      console.log("student");
      console.log(formData);
     
      $.post('/users/student',
        formData,
        function(){
        }).done(function(response){
        	if (response.msg) {
        		console.log(response.msg);
        	} else {
        		console.log(response.curruser);
        	}
        });
  	});
  	
  /**
   * Signs up as an Employer
   */
  $(document).on('submit', '#employer-signup-form', function(evt) {
      evt.preventDefault();
      var formData = helpers.getFormData(this);
      console.log("employer");
      console.log(formData);
     
      $.post('/users/employer',
        formData,
        function(){
        }).done(function(response){
        	if (response.msg) {
        		console.log(response.msg);
        	} else {
        		console.log(response.curruser);
        	}
        });
  	});	
  
  /**
   * Logs in to users
   */
  $(document).on('submit', '#login-form', function(evt) {
      evt.preventDefault();
      var formData = helpers.getFormData(this);
      console.log(formData);
     
      // $.post('/users/login',
        // formData,
        // function(){
        // }).done(function(response){
        	// if (response.msg) {
        		// loadPage('index', {loginerror: response.msg});
        	// } else {
        		// currentUser = response.curruser;
        		// loadHomePage();
        	// }
        // });
  	});
  	
})();