var express = require('express');
var router = express.Router();
var env  =  require('dotenv').load();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create', { env:  process.env });
});
/* save data */
router.post('/save',function(req,res,next){
	var name = req.param("name");
	var access = req.param("access");
	var description = req.param("description");
	db.query("INSERT INTO client (name,access,description) VALUES ('" + name + "','" + access + "','" + description + "')", function (err, results, fields) {
		if (err) {
			res.send(err);
		}
		console.log("succesed ....");
		res.redirect("/start");
	});
})
module.exports = router;
