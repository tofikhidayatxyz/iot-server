var express = require('express');
var router = express.Router();
var env  =  require('dotenv').load();
/* GET home page. */
router.get('/:id', function(req, res, next) {
  id  =  req.param('id');
  db.query("SELECT * FROM client WHERE id="+id,function(err,results,fields){
  	if(err) {
  		console.log(err);
  		res.send(err);
  	} else {
  		res.render('view', { env:  process.env , data:JSON.parse(JSON.stringify(results))[0]});
  	}
  })
  
});

module.exports = router;
