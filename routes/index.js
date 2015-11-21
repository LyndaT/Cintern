var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.user) {
		if (req.session.user.studentInfo) {
			res.redirect('/students');
		} else {
			res.redirect('/employers');
		}
	}
	else {
		res.render('index', { title: 'Cintern' });
	}
});

module.exports = router;
