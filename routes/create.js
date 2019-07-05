var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create', { env:  process.env });
});
/* save data */
router.post('/save',function(req,res,next){
	var name = req.param("name").toString();
	var access = req.param("access").toString();
	var description = req.param("description").toString();
	db.query("INSERT INTO client (name,access,description) VALUES ('" + name + "','" + access + "','" + description + "')", function (err, results, fields) {
		if (err) {
			res.send(err);
		}
		console.log("succesed ....");
		db.query("SELECT * FROM client WHERE id='"+results['insertId']+"'",function(err,results,fields){
			if(err) {
				res.send(err);
			}
			res.send(results);
		});
		
	});
})
module.exports = router;