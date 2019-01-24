var express = require('express');
var router = express.Router();
var env  =  require('dotenv').load();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { env: process.env });
});

module.exports = router;
