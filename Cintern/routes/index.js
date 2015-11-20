var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.user) {
		if (req.session.user.studentInfo) {
			console.log("redirecting");
			res.redirect('/students')
		}
	}
	else {
		res.render('index', { title: 'Cintern' });
	}
});

module.exports = router;
