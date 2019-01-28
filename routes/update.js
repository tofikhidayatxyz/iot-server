var express = require('express');
var router = express.Router();
var env  =  require('dotenv').load();
/* GET home page. */
router.post('/', function(req, res, next) {
  var id     	= req.param('id'); 
  var status  	= req.param('status');
  db.query("UPDATE client SET status='"+status+"'   WHERE id="+id,function(err , results , fields){
  	if (err) {
  		res.send(err);
  		console.log(err);
  	} else {
  		res.send("success");
  	}
  });

});

module.exports = router;

