var express = require('express');
var router = express.Router();
var env = require('dotenv').load();
/* GET home page. */
router.get('/', function (req, res, next) {
	db.query("SELECT * FROM status", function (err, result, fields) {
		if (err) {
			res.send(err)
			console.log(err)
		} else {
			res.send(JSON.parse(JSON.stringify(result)) )
		}
	})
})
module.exports = router;