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
	let fails = {};
	if (username != process.env.USER_NAME) {
		fails.username = 'Your username is incorrect'
	}
	if (password != process.env.USER_PASS) {
		fails.password = 'Your password is incorrect'
	}

	if (JSON.stringify(fails) == '{}') {
		res.cookie('auth',await hash(combine));
		return res.send({'status':'success'});
	}
	return res.send({'status':'fail','fail':fails});
})

// logout

router.get('/exit',(req,res,next)=>{
	res.clearCookie('auth');
	return res.redirect('/login');
})


module.exports = router;