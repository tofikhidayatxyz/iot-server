'use strict'
const moment =  require('moment');
let interval  = 0;
let status;

setInterval(function(data){
	var date  =   moment().subtract(process.env.INTERVAL,'seconds').format('YYYY-MM-DD hh:mm:ss');
	db.query("SELECT  * from status LIMIT 1",function(err,results,fields){
		if(err) throw err;
		var results =  JSON.parse(JSON.stringify(results))[0].accessed_at;
		if(results > date == false) {
			status  =  "disconnect";
		} else {
			status =  "connected";
		}
		console.log(status)
		db.query(`UPDATE status SET client="${status}"`,function(err,results,fields){
			if(err) throw err;
			///console.log("succesed ...");
		})
	})
	interval  += 1;
},1000)