var express = require('express');
var router = express.Router();
var env  =  require('dotenv').load();
/* GET home page. */
router.get('/all', function(req, res, next) {
  db.query("SELECT * FROM client ",function(err,resultsa,fields){
  	if(err) {
  		console.log(err);
  		res.send(err);
  	} else {
      db.query("SELECT * FROM status ",function(err,results,fields){ 
        res.send(
          {
            "client":resultsa,
            "status":results
          });
       })
  	}
  })
  
});

router.post('/', function(req, res, next) {
  id  =  req.param('id');
  db.query("SELECT * FROM client WHERE id="+id,function(err,results,fields){
  	if(err) {
  		console.log(err);
  		res.send(err);
  	} else {
  		res.send(results);
  	}
  })
  
});

module.exports = router;
