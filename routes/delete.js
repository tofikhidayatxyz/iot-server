'use strict'

var express = require('express');
var router = express.Router();
/* GET home page. */
router.post('/', function(req, res, next) {
  var id  = req.param('id'); 
  db.query("DELETE FROM client WHERE id="+id, function(err, results , fields){
  	if(err) {
  		console.log(err);
  		res.send(err);
  	} else {
  		res.send(results);
  	} 
  })
});

module.exports = router;
