'use strict'

const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', async function(req, res, next) {
   return await res.render('remote', {
     env: process.env,
   	 req: req
   });
});
module.exports = router;