'use strict'
const moment =  require('moment-timezone');
let status;
let last_stat = "disconnect";

setInterval(function(data){
	var date  =   moment().subtract(process.env.INTERVAL,'seconds').format('YYYY-MM-DD HH:mm:ss');
	db.query("SELECT  * from status LIMIT 1",function(err,results,fields){
		if(err) throw err;
		var results =  JSON.parse(JSON.stringify(results))[0].accessed_at;
		if(results > date == false) {
			status  =  "disconnect";
		} else {
			status =  "connected";
		}
		// if status  diferent with kast status
		if (last_stat != status) {
			last_stat = status;
		} else {
			return false;
		}
		console.log(status)
		
		db.query(`UPDATE status SET client="${status}"`,function(err,results,fields){
			if(err) throw err;
			///console.log("succesed ...");
		})
	})

	// schedule selector
	let time  = moment().tz(process.env.TIMEZONE).format('HH:mm')
	///console.log(time)
	db.query(`SELECT * FROM client INNER JOIN schedule ON schedule.client_id = client.id   WHERE schedule.time = "${time}"`,(err,results,fields)=>{
		if (err) return console.log(err);
		let qr = JSON.parse(JSON.stringify(results));
		qr.forEach((key)=> {
			if (key['action'] == key['status'] ) return false;
			db.query(`UPDATE client SET status="${key['action']}" WHERE id = ${key['client_id']}`,(err,results,fields)=>{
				if (err) return console.log(err);
				//console.log("Waching ....");
			})
		});
	})	

},1000)