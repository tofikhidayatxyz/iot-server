var express = require('express');
var router = express.Router();
var env  =  require('dotenv').load();
/* GET home page. */
router.get('/:id', function(req, res, next) {
  var id  = req.param('id'); 
  db.query("DELETE FROM client WHERE id="+id, function(err, results , fields){
  	if(err) {
  		console.log(err);
  		res.send(err);
  	} else {
  		res.redirect("/start");
  	} 
  })
});

module.exports = router;
