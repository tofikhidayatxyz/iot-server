var express = require('express');
var router = express.Router();
var moment  =  require('moment');
var jsonminify = require("jsonminify");
/* GET home page. */
router.get('/api/:power', function(req, res, next) {
  var power  = req.param("power"); 
  var date  =  moment().format('YYYY-MM-DD hh:mm:ss');
  db.query("UPDATE status SET power='"+power+"' , accessed_at='"+date+"' ",function(err,results,fields){
      if(err) throw err;
      db.query("SELECT * FROM client",function(err,results,fields){
        if(err) throw err;
        var rest = {"data":JSON.parse(JSON.stringify(results))};
        var data  =  JSON.parse(JSON.stringify(results));
        var arr  = [];
        for (var i = 0; i < data.length; i++) {
            arr.push({"name": data[i].name})
        }
        //res.send("$arr");
        res.send(arr);
      });
  });
});

module.exports = router;

