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
  		res.render('edit', { env:  process.env , data:JSON.parse(JSON.stringify(results))[0]});
  	}
  })
  
});
/* save data */
router.post('/update',function(req,res,next){
	var id  =  req.param("id");
	var name = req.param("name");
	var access = req.param("access");
	var description = req.param("description");
	db.query("UPDATE client SET name='"+name+"',access='"+access+"',description='"+description+"' WHERE id="+id,function(err,results,fields){
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			res.redirect('/start');
		}
	});
})
module.exports = router;
