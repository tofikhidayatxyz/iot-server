'use strict'

var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/all', function(req, res, next) {
  db.query('SELECT * FROM client ',function(err,resultsa,fields){
  	if(err) {
  		console.log(err);
  		res.send(err);
  	} else {
      db.query('SELECT * FROM status ',function(err,results,fields){ 
        res.send(
          {
            client:resultsa,
            status:results
          }
          );
       })
  	}
  })
  
});

router.post('/', function(req, res, next) {
  let id  =  req.param('id');
  db.query('SELECT * FROM client WHERE id='+id,function(err,results,fields){
  	if(err)  throw err;
  	return res.send(results);
  })
  
});

module.exports = router;
