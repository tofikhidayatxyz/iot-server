var express = require('express');
var router = express.Router();
var env  =  require('dotenv').load();
var moment  =  require('moment');
/* GET home page. */
router.get('/:power', function(req, res, next) {
  var power  = req.param("power"); 
  var date  =  moment().format('YYYY-MM-DD hh:mm:ss');
  db.query("UPDATE status SET power='"+power+"' , accessed_at='"+date+"' ",function(err,results,fields){
      if(err) throw err;
      db.query("SELECT * FROM client",function(err,results,fields){
        if(err) throw err;
        res.send(JSON.parse(JSON.stringify(results)));
      });
  });
});

module.exports = router;

