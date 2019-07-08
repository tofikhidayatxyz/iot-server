'use strict'

var express = require('express');
var router = express.Router();
var moment  =  require('moment');
/* GET home page. */
router.get('/', function(req, res, next) { 
  var date  =  moment().format('YYYY-MM-DD HH:mm:ss');

  db.query("UPDATE status SET accessed_at='"+date+"' ",function(err,results,fields){
      if(err) throw err;
      db.query("SELECT * FROM client",function(err,results,fields){
        if(err) throw err;
        var rest = JSON.stringify(results);
        res.send(rest);
      });
  });
});

module.exports = router;

