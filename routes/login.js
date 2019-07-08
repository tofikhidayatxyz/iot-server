'use strict'

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// hash

function hash(data) {
	return new Promise((resolve,reject)=>{
		bcrypt.hash(data, saltRounds, function(err, hash) {
			return resolve(hash);
		});
	})
}
/* GET home page. */
router.get('/',  (req, res, next)=> {
	let stat  =  req.query.stat == 'err' ? 'err' : null;
	return res.render('login',{env:process.env,stat:stat})
});


//login post
router.post('/',async(req,res,next)=> {
	let username   = req.body.username;
	let password  =  req.body.password;
	let combine  =  JSON.stringify([username,password]);
	if (username == process.env.USER_NAME && password == process.env.USER_PASS) {
		res.cookie('auth',await hash(combine));
		return res.redirect('/');
	}
	return res.redirect('/login?stat=err');
})

// logout

router.get('/exit',(req,res,next)=>{
	res.clearCookie('auth');
	return res.redirect('/login');
})


module.exports = router;