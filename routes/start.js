var express = require('express');
var router = express.Router();
var env = require('dotenv').load();
/* GET home page. */
router.get('/', function (req, res, next) {
	db.query("SELECT * FROM client", function (err, results, fields) {
		if (err) throw err;
		var client = results;
		db.query("SELECT * FROM status", function (err, result, fields) {
			if (err) throw err;
			data = {
				"client": client,
				"status": result,
			}
			res.render('remote', {
				env: process.env,
				data: data
			});
		})
	})
});
module.exports = router;