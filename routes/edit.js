'use strict'

var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/:id', function(req, res, next) {
  var id  =  req.param('id');
  db.query("SELECT * FROM client WHERE id="+id,function(err,results,fields){
  	if(err) {
  		console.log(err);
  		res.send(err);
  	} else {
  		res.send(results);
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
			res.send(results);
		}
	});
})
router.post('/switch',function(req,res,next){
	var id  =  req.param("id");
	var status = req.param("status");
	db.query("UPDATE client SET status='"+status+"' WHERE id="+id,function(err,results,fields){
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			db.query("SELECT * FROM client WHERE id='"+id+"'",function(err,results,fields){
				if(err) {
					res.send(err);
				}
				res.send(results);
			});
		}
	});
})
module.exports = router;
