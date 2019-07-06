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
		db.query("SELECT * FROM client",async function (err, results, fields) {
			if (err) throw err;
			return await res.render('remote', {
				env: process.env,
				data: JSON.parse(JSON.stringify(results)),
				req:req
			});
		})
	} else {
		return res.redirect('/login');
	}
});
module.exports = router;