const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const combine  =  JSON.stringify([process.env.USER_NAME,process.env.USER_PASS]);

function validate(hash) {
	return new Promise((resolve,reject)=>{
		bcrypt.compare(combine,hash,(err,hash)=>{
			resolve(hash);
		})
	})
}
/* GET home page. */
router.get('/', async function (req, res, next) {
	let stat  =  await validate(req.cookies.auth);
	if (req.cookies && stat) {
		//return res.send(stat)
		db.query("SELECT schedule.time,schedule.id,schedule.action,client.name FROM  schedule INNER JOIN client ON client.id=schedule.client_id ",async function (err, results, fields) {
			if (err) throw err;
			return await res.render('schedule', {
				env: process.env,
				data: JSON.parse(JSON.stringify(results)),
				req:req
			});
		})
	} else {
		return res.redirect('/login');
	}
});

/* add */
router.post('/store',async(req,res,next)=>{
	let action  =  req.param('action')
	let time  =  req.param('time')
	let target  =  req.param('client')
	console.log(target)
	db.query(`INSERT INTO schedule (client_id , action , time) VALUES ("${target}" ,"${action}" , "${time}")`,(err,results,fields)=>{
		if (err) throw err;
		return res.send(results);
	})
})

// viee

router.post('/view',async(req,res,next)=>{
	let id  =  req.param('id')
	db.query(`SELECT schedule.time,schedule.id,schedule.action,client.name,client.id as client_id  FROM  schedule INNER JOIN client ON client.id = schedule.client_id  WHERE schedule.id = ${id}`,(err,results,fields)=>{
		if (err) throw err;
		db.query('SELECT * from client',(err,result,field)=>{
			if (err) throw err;
			return res.send({client:result,data:results});
		})
	})
})
// update

router.post('/update',async(req,res,next)=>{
	let id  = req.param('id'); 
	let action  =  req.param('action')
	let time  =  req.param('time')
	let target  =  req.param('client')

	db.query(`UPDATE schedule SET action="${action}" , client_id="${target}" , time="${time}" WHERE id=${id}`,(err,results,fields)=>{
		if (err) throw  err;
		return res.send(results); 
	})
})
router.get('/all',(req,res,next)=>{
	db.query(`SELECT schedule.time,schedule.id,schedule.action,client.name as target FROM  schedule INNER JOIN client ON client.id=schedule.client_id`,(err,results,fields)=>{
		if (err) throw err;
		db.query('SELECT * from status',(err,result,field)=>{
			if (err) throw err;
			return res.send({status:result,data:results});
		})
	})
})


// delete
router.post('/delete',async(req,res,next)=>{
	let id = req.param('id');
	db.query(`DELETE FROM schedule WHERE id=${id}`,(err,results,fields)=>{
		if (err)  throw  err;
		return res.send(results);
	})
})



module.exports = router;