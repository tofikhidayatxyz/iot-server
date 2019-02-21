try{
	require('./base');
} catch(e){
	console.log(e)
}
require('./swipe.js');
import Swal from 'sweetalert2'
import util from './utils';
 
const swalWithBootstrapButtons = Swal.mixin({
  confirmButtonClass: 'btn btn-success',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
})


$("#expander").click(function(event) {
	$(".sider").toggleClass('expand');
	$(this).toggleClass('expand');
});

function failAlert(data) {
	data  =  JSON.stringify(data);
	Swal.close();
	Swal.fire({
		 title: 'Failed',
		  type: 'error',
		  text: data,
		  confirmButtonColor: 'var(--danger)'
	})
}
function successAlert(data) {
	Swal.close();
	Swal.fire({
		 title: 'Success',
		  type: 'success',
		  text: data,
		  confirmButtonColor: 'var(--info)'
	})
}

function loadingAlert() {
	Swal.close();
	Swal.fire({
	  title: 'Wait a Minute... ',
	  onBeforeOpen: () => {
	    Swal.showLoading()
	  },
	 allowOutsideClick: false
	});
}


$('.side-flow').click(function(event) {
	$(this).closest('.sider').removeClass('expand');
	$(".expander").removeClass('expand');
});

$("#sider").click(function(event) {
	event.stopPropagation();	
});


$("#plus").click(function(event) {
	$(this).addClass('expand');
	Swal.fire({
		title:"Add New Controller",
	 	html:'<form action="demo" id="form-new-item" enctype="multipart/form-data" > <div class="form-group"> <label for="" class="font-weight-bold mb-0 float-left text-left">Controller label</label> <input type="text" id="new-label" class="swal2-input mt-1 mb-2" placeholder="Controller Label "> </div> <div class="form-group"> <label for="" class="font-weight-bold mb-0 float-left text-left">Controller Access</label> <input type="text" id="new-access" class="swal2-input mt-1 mb-2" placeholder="Controller Access "> </div> <div class="form-group"> <label for="" class="font-weight-bold mb-0 float-left text-left">Controller Description</label> <textarea id="new-desc" class="swal2-textarea mt-1 mb-0" placeholder="Controller Description "></textarea> </div> </form>',
	 	showCancelButton: true,
	 	confirmButtonText: 'Save',
	  	cancelButtonText: 'Cancel',
	  	confirmButtonColor: 'var(--primary)',
		cancelButtonColor: 'var(--danger)',
		preConfirm: function() {
		  $(document).find("#form-new-item").submit();
		  return false;
		}
	})
	setTimeout(function(args) {
		$("#plus").removeClass('expand');
	}, 1000)
});

function newValidate(title,desc,access) {
	var errornum  = 0;
	if(title.length == 0 ) {
		errornum += 1;
		$(document).find('#new-label , #upd-label').addClass('swal2-inputerror').focus();
	} else {
		$(document).find('#new-label , #upd-label').removeClass('swal2-inputerror');
	}
	if(access.length == 0 ) {
		errornum += 1;
		$(document).find('#new-access , #upd-access').addClass('swal2-inputerror').focus();
	} else {
		$(document).find('#new-access , #upd-access').removeClass('swal2-inputerror');
	}
	if(desc.length == 0 ) {
		errornum += 1;
		$(document).find('#new-desc , #upd-desc').addClass('swal2-inputerror').focus();
	} else {
		$(document).find('#new-desc , #upd-desc').removeClass('swal2-inputerror');
	}
	return errornum;
}

$(document).on('submit', '#form-new-item', function(event) {
	event.preventDefault();
	var new_title  =  $(document).find('#new-label').val();
	var new_desc   =  $(document).find('#new-desc').val();
	var new_access =  $(document).find('#new-access').val();
	if(newValidate(new_title,new_desc,new_access) == 0 ) {
		Swal.close();
		Swal.fire({
		  title: 'Wait a Minute... ',
		  onBeforeOpen: () => {
		    Swal.showLoading()
		  },
		 allowOutsideClick: false
		});
		$.ajax({
			url: '/create/save',
			type: 'POST',
			dataType: 'JSON',
			data: {
				name: new_title,
				access: new_access,
				description: new_desc
			},
		})
		.done(function(result) {
			Swal.close();
			Swal.fire({
				  title: 'Succesed Adding new Protocol',
				  type: 'success',
				  confirmButtonColor: 'var(--success)'
			})
			appendElement(result[0]);
		})
		.fail(function(err) {
			Swal.close();
			Swal.fire({
				  title: 'Succesed Adding new Protocol',
				  type: 'error',
				  confirmButtonColor: 'var(--success)'
			})
		})
		.always(function(data) {
			//console.log( JSON.stringify(data));
		});
	}
});

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}


function appendElement(data) {
	var obj  = '<div class="col-6 list-data px-2 py-2" id="data-ist-entry-'+data['id']+'" ><div class="card border-0 bg-white border-grey border shadow" style="height:'+innerContentHeight+'px;"><div class="card-header bg-white pt-2 pb-2 px-3  clearfix"><div class="clearfix text-truncate	"><small class="font-weight-bold text-grey  initial ">'+data['name']+'</small></div></div><div class="card-content h-100 d-flex justify-content-center align-items-center"><button class="button-entry bg-transparent border-0 shadow-none btn  p-0 '+data['status']+' " data-id="'+data['id']+'"><small class="on">On</small><small class="off">Off</small></button></div><div class="card-footer py-1 text-dark bg-white"><div class="row"><div class="col-4"><button class="btn p-0 btn-block text-primary btn-view" data-id="'+data['id']+'"><i class="fa fa-eye"></i></button></div><div class="col-4"><button class="btn p-0 btn-block text-warning btn-edit" data-id="'+data['id']+'"><i class="fa fa-edit"></i></button></div><div class="col-4"><button class="btn p-0 btn-block text-danger btn-delete" data-id="'+data['id']+'"><i class="fa fa-trash"></i></button></div></div></div></div></div>';
	$(".list-parent").append(obj);
}


let innerContentHeight  = 0;
jQuery(document).ready(function($) {
	setTimeout(function(){
		innerContentHeight =  $(".list-data .card").eq(0).width();
		$(".list-data .card").height(innerContentHeight);
	},100);
	setTimeout(function(){
		if(findGetParameter('key') ) {
			searchData(findGetParameter('key'))	
		}
	},1200);
	
});

let idConcept;
$(document).on('click', '.button-entry', function(event) {
	event.preventDefault();
	var el  =  $(this);
	idConcept =  $(this).data('id');
	var status = ($(this).hasClass('on') == true ? "off" : "on");
	if(idConcept) {
		$.ajax({
			url: '/edit/switch',
			type: 'POST',
			dataType: 'JSON',
			data: {
				id: idConcept,
				status:status
			},
		})
		.done(function(data) {
			data  =  data[0];
			if(data['status'] == "off") {
				$(el).removeClass('on').addClass('off')
			} else {
				$(el).removeClass('off').addClass('on')
			}
		})
		.fail(function(data) {
			failAlert(JSON.stringify(data));
		})
		.always(function(data) {
			//console.log(data);
		});
	}
});




$(document).on('click', '.btn-view', function(event) {
	event.preventDefault();
	idConcept =  $(this).data('id');
	loadingAlert()
	$.ajax({
		url: '/view',
		type: 'POST',
		dataType: 'JSON',
		data: {id: idConcept},
	})
	.done(function(data) {
		Swal.close();
		data  =  data[0];
		Swal.fire({
		title:"Controller Data",
	 	html:'<form action="demo"  enctype="multipart/form-data" ><div class="form-group"><label for="" class="font-weight-bold mb-0 float-left text-left">Controller label</label><input type="text"  value="'+data['name']+'" class="swal2-input mt-1 mb-2 disabled bg-white border-0 px-0 " disabled placeholder="Controller Label "></div><div class="form-group"><label for="" class="font-weight-bold mb-0 float-left text-left">Controller Access</label><input type="text" value="'+data['access']+'" class="swal2-input mt-1 mb-2 disabled bg-white border-0 px-0" disabled placeholder="Controller Access "></div><div class="form-group"><label for="" class="font-weight-bold mb-0 float-left text-left">Controller Description</label><textarea  class="swal2-input mt-1 mb-2 disabled bg-white border-0 px-0" disabled placeholder="Controller Description ">'+data['description']+'</textarea></div><div class="form-group"><label for="" class="font-weight-bold mb-0 float-left text-left">Controller Status</label><input type="text" value="'+data['status']+'" class="swal2-input mt-1 mb-2 disabled bg-white border-0 px-0" disabled placeholder="Controller Access "></div></form>',
	 	confirmButtonText: 'Ok',
	  	confirmButtonColor: 'var(--info)',
	})
	})
	.fail(function(data) {
		Swal.close();
		failAlert(data);
	})
	.always(function() {
		//console.log("complete");
	});
});

$(document).on('click', '.btn-edit', function(event) {
	event.preventDefault();
	idConcept =  $(this).data('id');
	loadingAlert()
	$.ajax({
		url: '/view',
		type: 'POST',
		dataType: 'JSON',
		data: {id: idConcept},
	})
	.done(function(data) {
		Swal.close();
		data  =  data[0];
		Swal.fire({
		title:"Edit Controller",
	 	html:'<form action="demo" id="form-edit-item" enctype="multipart/form-data" ><div class="form-group"><label for="" class="font-weight-bold mb-0 float-left text-left">Controller label</label><input type="text" id="upd-label" class="swal2-input mt-1 mb-2" value="'+data['name']+'" placeholder="Controller Label "></div><div class="form-group"><label for="" class="font-weight-bold mb-0 float-left text-left">Controller Access</label><input type="text" id="upd-access" class="swal2-input mt-1 mb-2" value="'+data['access']+'" placeholder="Controller Access "></div><div class="form-group"><label for="" class="font-weight-bold mb-0 float-left text-left">Controller Description</label><textarea id="upd-desc" class="swal2-textarea mt-1 mb-0" placeholder="Controller Description ">'+data['description']+'</textarea></div></form>',
	 	showCancelButton: true,
	 	confirmButtonText: 'Save',
	  	cancelButtonText: 'Cancel',
	  	confirmButtonColor: 'var(--primary)',
		cancelButtonColor: 'var(--danger)',
		preConfirm: function() {
		  $(document).find("#form-edit-item").submit();
		  return false;
		}
	})
	})
	.fail(function(data) {
		Swal.close();
		failAlert(data);
	})
	.always(function() {
		//console.log("complete");
	});
	
});




$(document).on('submit', '#form-edit-item', function(event) {
	event.preventDefault();
	var title  =  $(document).find('#upd-label').val();
	var desc   =  $(document).find('#upd-desc').val();
	var access =  $(document).find('#upd-access').val();
	if(newValidate(title,desc,access) == 0 ) {
		Swal.close();
		Swal.fire({
		  title: 'Wait a Minute... ',
		  onBeforeOpen: () => {
		    Swal.showLoading()
		  },
		 allowOutsideClick: false
		});
		$.ajax({
			url: '/edit/update',
			type: 'POST',
			dataType: 'JSON',
			data: {
 				id : idConcept,
				name: title,
				access: access,
				description: desc
			},
		})
		.done(function(result) {
			var subject = $("#data-ist-entry-"+idConcept);
			subject.find('.initial').text(title);
			successAlert("Success Update Protocol");
		})
		.fail(function(err) {
			failAlertAlert(err);
		})
		.always(function(data) {
			//console.log( JSON.stringify(data));
		});
	}
});


$(document).on('click', '.btn-delete', function(event) {
	event.preventDefault();
	idConcept =  $(this).data('id');
	var el  =  $(this).closest('.list-data ');
	loadingAlert()

	Swal.fire({
	title:"Confirmation",
	text:"Are you sure you want to delete this?",
	confirmButtonText: 'Ok',
	showCancelButton: true,
	ancelButtonText: 'Cancel',
    cancelButtonColor: 'var(--danger)',
	confirmButtonColor: 'var(--info)',
	}).then((result) => {
		if (result.value) { 
			$.ajax({
				url: '/delete',
				type: 'POST',
				dataType: 'JSON',
				data: {
	 				id : idConcept
				},
			})
			.done(function(result) {
				successAlert("Success Delete Protocol");
				$(el).slideUp('fast',function(e){
					$(el).remove();
				})
			})
			.fail(function(err) {
				failAlert(err);
			})
			.always(function(data) {
				//console.log( JSON.stringify(data));
			});
		}
	});
});


/* filtrtor */
function filtrator(dom,db) {
	var checker = 0;
	//console.log(dom.length)
	//console.log(db.length) 
	if (dom.length > db.length) {
		checker =  util.checker(dom,db)
		for (var i = 0; i < dom.length; i++) {
		   for (var j = 0; j < checker.length; j++) {
		   		if (dom[i]['id'].toString() == checker[j].toString()) {
		   			var target = dom[i].crono;
		   			$("#"+target).slideUp('fast',function(){
		   				$("#"+target).remove();
		   			})
		   		}
		   }
		}
	} else if(db.length > dom.length) {
		checker =  util.checker(db,dom)
		for (var i = 0; i < db.length; i++) {
		   for (var j = 0; j < checker.length; j++) {
		   		if (db[i]['id'].toString() == checker[j].toString()) {
		   			appendElement(db[i]);
		   		}
		   }
		}
	}
}

/* this autolooading */

setInterval(function(e){
	var obj  =  document.querySelectorAll('.list-data');
	var arr  =  [];
	for (var i = 0; i < obj.length; i++) {
		var inobj  =  {
			"crono":obj[i].getAttribute('id'),
			"id" : obj[i].querySelector('.button-entry').getAttribute('data-id'),
			"name" : obj[i].querySelector('.initial').textContent,
			"status" : (obj[i].querySelector('.button-entry').classList.contains('on') ? "on"  : "off"),
		}
		arr.push(inobj);
	}
	$.ajax({
		url: '/view/all',
		type: 'GET',
		dataType: 'JSON',
	})
	.done(function(result) {
		var client  =  result['client'];
		for (var i = 0; i < client.length; i++) {
			for (var j = 0; j < arr.length; j++) {
				if(client[i]['id'] == arr[j]['id']) {
					if (client[i]['name'].toString().toLowerCase() != arr[j]['name'].toString().toLowerCase()) {
						document.querySelector("#"+arr[j].crono + " .initial").innerHTML = client[i]['name'];
					}
					if(client[i]['status'].toString().toLowerCase() != arr[j]['status'].toString().toLowerCase()) {
						if(client[i]['status'].toString().toLowerCase() == "on") {
							//console.log("assw");
							document.querySelector("#"+arr[j].crono + " .button-entry").classList.remove('off');
							document.querySelector("#"+arr[j].crono + " .button-entry").classList.add('on');
						} else {
							//console.log("demo");
							document.querySelector("#"+arr[j].crono + " .button-entry").classList.remove('on');
							document.querySelector("#"+arr[j].crono + " .button-entry").classList.add('off');
						}
					}
				} else {
					//console.log(arr)
				}
			}
		}
		filtrator(arr,client);
	})
	.fail(function(data) {
			//failAlert(JSON.stringify(data));
	})
	.always(function() {
	});
	
},1000)



/* this realtime search */
$(document).find('.form-search-object input').keyup(function(event) {
	 searchData($(this).val());
});

$(document).on('submit', '.form-search-object', function(event) {
	event.preventDefault();
	var send = $(this).serializeArray()[0]['value'];
	searchData(send);
});

function searchData(data) {
	var stateObj = { foo: "bar" };
    history.pushState(stateObj, "data", "?key="+data);
	var obj  =  document.querySelectorAll('.list-data');
	var arr  =  [];
	for (var i = 0; i < obj.length; i++) {
		var inobj  =  {
			"id" : obj[i].getAttribute('id'),
			"label" : obj[i].querySelector('.initial').textContent.toLowerCase().split(" ").join(""),
		}
		arr.push(inobj);
	}
	if(data.length > 0) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]['label'].indexOf(data.toLowerCase().split(" ").join("")) >= 0) {
			   document.querySelectorAll('.list-data')[i].classList.remove("d-none");
			} else {
				document.querySelectorAll('.list-data')[i].classList.add("d-none");
			}
		}
	} else {
		for (var i = 0; i < arr.length; i++) {
			document.querySelectorAll('.list-data')[i].classList.remove("d-none");
		}
	}

}



/* protoype */


