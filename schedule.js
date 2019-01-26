var moment =  require('moment');
var interval  = 0;
var env  =  require("dotenv").load();
setInterval(function(data){
	var date  =   moment().subtract(process.env.SCHEDULE,'seconds').format('YYYY-MM-DD hh:mm:ss');
	db.query("SELECT  * from status LIMIT 1",function(err,results,fields){
		if(err) throw err;
		var results =  JSON.parse(JSON.stringify(results))[0].accessed_at;
		if(results > date == false) {
			var status  =  "disconnect";
		} else {
			var status =  "connected";
		}
		db.query("UPDATE status SET client='"+status+"'",function(err,results,fields){
			if(err) throw err;
			console.log("succesed ...");
		})
	})
	interval  += 1;
},1000)