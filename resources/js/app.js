'use strict'

import Swal from 'sweetalert2'
import util from './utils';
let innerContentHeight  = 0;
let last_append = '';



(()=>{
	callEntry()
	setTimeout(function(){
		innerContentHeight =  document.querySelector('.list-data .card').offsetWdth;
		document.querySelectorAll('.list-data .card').forEach((item)=>{
			item.style.height = innerContentHeight
		})
	},100);

	setTimeout(function(){
		if(findGetParameter('key') ) {
			searchData(findGetParameter('key'))	
		}
	},100);
})()

 
const swalWithBootstrapButtons = Swal.mixin({
  confirmButtonClass: 'btn btn-success',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
})

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

function loading() {
	document.getElementById('loading').classList.add('active');
}
function loadingStop() {
	document.getElementById('loading').classList.remove('active');
}

function clear() {
	document.querySelectorAll(".swal2-confirm ,  .swal2-cancel").forEach( (i)=> {
		i.removeAttribute('disabled');
	});
}

document.querySelector('#plus').addEventListener('click',async function(event) {
	Swal.fire({
		title:'Add New Controller',
	 	html:`
			<form  id='form-new-item' enctype='multipart/form-data'>
		    <div class='form-group'>
		        <label for='' class='font-weight-bold mb-0 float-left text-left'>Controller label</label>
		        <input type='text' id='new-label' class='swal2-input mt-1 mb-2' placeholder='Controller Label '> </div>
		    <div class='form-group'>
		        <label for='' class='font-weight-bold mb-0 float-left text-left'>Controller Access</label>
		        <input type='text' id='new-access' class='swal2-input mt-1 mb-2' placeholder='Controller Access '> </div>
		    <div class='form-group'>
		        <label for='' class='font-weight-bold mb-0 float-left text-left'>Controller Description</label>
		        <textarea id='new-desc' class='swal2-textarea mt-1 mb-0' placeholder='Controller Description '></textarea>
		    </div>
		</form>
	 	`,
	 	showCancelButton: true,
	 	confirmButtonText: 'Save',
	  	cancelButtonText: 'Cancel',
	  	confirmButtonColor: 'var(--primary)',
		cancelButtonColor: 'var(--danger)',
		closeOnConfirm: false,	
		preConfirm: async function() {
		  loading()
		  submitNewData()
		  return false;
		}
	})
});

// scope
document.querySelectorAll('.block-scope').forEach((item)=>{
	item.addEventListener('click',function(e){
		document.querySelectorAll('.block-scope').forEach((items)=>{ 
			if (items != item ) {
				items.classList.remove('expand');
			}
		})
		item.classList.toggle('expand')
	})
})



// validating
function newValidate(title,desc,access) {
	var errornum  = 0;
	if(title.length == 0 ) {
		errornum += 1;
		document.querySelector('#new-label , #upd-label').classList.add('swal2-inputerror');
		document.querySelector('#new-label , #upd-label').focus();
	} else {
		document.querySelector('#new-label , #upd-label').classList.remove('swal2-inputerror');
	}
	if(access.length == 0 ) {
		errornum += 1;
		document.querySelector('#new-access , #upd-access').classList.add('swal2-inputerror');
		document.querySelector('#new-access , #upd-access').focus();
	} else {
		document.querySelector('#new-access , #upd-access').classList.remove('swal2-inputerror');
	}
	if(desc.length == 0 ) {
		errornum += 1;
		document.querySelector('#new-desc , #upd-desc').classList.add('swal2-inputerror');
		document.querySelector('#new-desc , #upd-desc').focus();
	} else {
		document.querySelector('#new-desc , #upd-desc').classList.remove('swal2-inputerror');
	}
	return errornum;
}

// append element
function appendElement(data) {
	var obj  = `<div class='col-6 list-data px-2 py-2' id='data-ist-entry-${data['id']}'>
			    <div class='card border-0 bg-white border-grey border shadow' style='height:' ${innerContentHeight}px;'>
			        <div class='card-header bg-white pt-2 pb-2 px-3  clearfix'>
			            <div class='clearfix text-truncate	'><small class='font-weight-bold text-grey  initial '>${data['name']}</small></div>
			        </div>
			        <div class='card-content h-100 d-flex justify-content-center align-items-center'>
			            <button class='button-entry bg-transparent border-0 shadow-none btn  p-0 ${data[ 'status']}'  data-id='${data[ 'id'] }'><small class='on'>On</small><small class='off'>Off</small></button>
			        </div>
			        <div class='card-footer py-1 text-dark bg-white'>
			            <div class='row'>
			                <div class='col-4'>
			                    <button class='btn p-0 btn-block text-primary btn-view' data-id='${data[ 'id']} '><i class='fa fa-eye'></i></button>
			                </div>
			                <div class='col-4'>
			                    <button class='btn p-0 btn-block text-warning btn-edit' data-id='${data[ 'id']}' ><i class='fa fa-edit'></i></button>
			                </div>
			                <div class='col-4'>
			                    <button class='btn p-0 btn-block text-danger btn-delete' data-id='${data[ 'id']}' ><i class='fa fa-trash'></i></button>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>`;
	if (last_append == obj) return false;
		last_append =  obj;
	document.querySelector('.list-parent').insertAdjacentHTML('beforeend',obj);
	callEntry();
}



// submiting new data
function submitNewData() {
	var new_title  =  document.querySelector('#new-label').value;
	var new_desc   =  document.querySelector('#new-desc').value;
	var new_access =  document.querySelector('#new-access').value;
		if(newValidate(new_title,new_desc,new_access) == 0 ) {
			Swal.close();
			Swal.fire({
			  title: 'Wait a Minute... ',
			  onBeforeOpen: () => {
			    Swal.showLoading()
			  },
			 allowOutsideClick: false ,
			});
			// post data 
			util.postData('/create/save',{ 
				name:new_title,
				access:new_access,
				description:new_desc })
			.then((result)=>{
				Swal.fire({
					  title: 'Succesed Adding new Protocol',
					  type: 'success',
					  confirmButtonColor: 'var(--success)'
				})
			})
			.catch((err)=>{
				Swal.close();
				Swal.fire({
					  title: 'Error Adding new Protocol',
					  type: 'error',
					  text:err,
					  confirmButtonColor: 'var(--success)'
				})
			})
		}
		loadingStop();
}



function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split('&');
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split('=');
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}



function callEntry() {
	// switch
	document.querySelectorAll('.button-entry').forEach((item)=>{
		item.addEventListener('click',()=>{
			//loading();
			document.querySelector('.loader-line').style.width = '50%';

			util.postData('/edit/switch',{
				id:item.getAttribute('data-id'),
				status:item.classList.contains('on') == true ? 'off' : 'on'
			}).then((result)=>{
				if(result[0]['status'] == 'off') {
					item.classList.remove('on')
					item.classList.add('off')
				} else {
					item.classList.remove('off')
					item.classList.add('on')
				}
				document.querySelector('.loader-line').style.width = '100%';
				setTimeout(()=>{
					document.querySelector('.loader-line').style.width = '0%';
				},200)
			}).catch((err)=>{
				document.querySelector('.loader-line').style.width = '100%';
				setTimeout(()=>{
					document.querySelector('.loader-line').style.width = '0%';
				},200)
				failAlert(err.toString());
			})
		})
	})
	// view
	document.querySelectorAll('.btn-view').forEach((item)=>{
		item.addEventListener('click',()=>{
			loading()
			util.postData('/view',{
				id:item.getAttribute('data-id')
			}).then((data)=>{
				loadingStop()
				Swal.close();
					Swal.fire({
					title:'Controller Data',
				 	html:`<form action='demo' enctype='multipart/form-data'>
							    <div class='form-group'>
							        <label for='' class='font-weight-bold mb-0 float-left text-left'>Controller label</label>
							        <input type='text' value='${data[0]['name']}' class='swal2-input mt-1 mb-2 disabled bg-white border-0 px-0 ' disabled placeholder='Controller Label '>
							    </div>
							    <div class='form-group'>
							        <label for='' class='font-weight-bold mb-0 float-left text-left'>Controller Access</label>
							        <input type='text' value='${data[0]['access']}' class='swal2-input mt-1 mb-2 disabled bg-white border-0 px-0' disabled placeholder='Controller Access '>
							    </div>
							    <div class='form-group'>
							        <label for='' class='font-weight-bold mb-0 float-left text-left'>Controller Description</label>
							        <textarea class='swal2-input mt-1 mb-2 disabled bg-white border-0 px-0' disabled placeholder='Controller Description '>${data[0]['description']}</textarea>
							    </div>
							    <div class='form-group'>
							        <label for='' class='font-weight-bold mb-0 float-left text-left'>Controller Status</label>
							        <input type='text' value='${data[0]['status']}' class='swal2-input mt-1 mb-2 disabled bg-white border-0 px-0' disabled placeholder='Controller Access '>
							    </div>
							</form>
				 	`,
				 	confirmButtonText: 'Ok',
				  	confirmButtonColor: 'var(--info)',
				})
			}).catch((err)=>{
				loadingStop()
				Swal.close();
				failAlert(err.toString());
			})
		})
	})
	//edit
	document.querySelectorAll('.btn-edit').forEach((item)=>{
		item.addEventListener('click',()=>{
			loading()
			util.postData('/view',{
				id:item.getAttribute('data-id')
			}).then((data)=>{
				loadingStop()
				Swal.close();
					Swal.fire({
					title:'Edit Controller',
				 	html:`
							<form action='demo' id='form-edit-item' enctype='multipart/form-data'>
							    <div class='form-group'>
							        <label for='' class='font-weight-bold mb-0 float-left text-left'>Controller label</label>
							        <input type='text' id='upd-label' class='swal2-input mt-1 mb-2' value='${data[0]['name']}' placeholder='Controller Label '>
							    </div>
							    <div class='form-group'>
							        <label for='' class='font-weight-bold mb-0 float-left text-left'>Controller Access</label>
							        <input type='text' id='upd-access' class='swal2-input mt-1 mb-2' value='${data[0]['access']}' placeholder='Controller Access '>
							    </div>
							    <div class='form-group'>
							        <label for='' class='font-weight-bold mb-0 float-left text-left'>Controller Description</label>
							        <textarea id='upd-desc' class='swal2-textarea mt-1 mb-0' placeholder='Controller Description '>${data[0]['description']}</textarea>
							    </div>
							</form>
				 		`,
				 	showCancelButton: true,
				 	confirmButtonText: 'Save',
				  	cancelButtonText: 'Cancel',
				  	confirmButtonColor: 'var(--primary)',
					cancelButtonColor: 'var(--danger)',
					preConfirm: function() {
					  loading()
					  update(item.getAttribute('data-id'));
					  return  false;
					}
				})
			}).catch((err)=>{
				loadingStop()
				Swal.close();
				console.log(err)
				failAlert(err.toString());	
			})
		})
	})
	// delete
	document.querySelectorAll('.btn-delete').forEach((item)=>{
		item.addEventListener('click',()=>{
			//loadingAlert();
			Swal.fire({
				title:'Confirmation',
				text:'Are you sure you want to delete this?',
				confirmButtonText: 'Ok',
				showCancelButton: true,
				ancelButtonText: 'Cancel',
			    cancelButtonColor: 'var(--danger)',
				confirmButtonColor: 'var(--info)',
				}).then((result) => {
					if (result['dismiss'] == 'cancel') return false; 
					loading()
					util.postData('/delete',{id:item.getAttribute('data-id')})
						.then((result)=>{
 							document.querySelector('.list-parent').removeChild(item.closest('.col-6'));
 							loadingStop()
						}).catch((err)=>{
							loadingStop()
							failAlert(err.toString());
						})
						
				});
		})
	})


}


// update data 
function update(id) {
	let title  =  document.querySelector('#upd-label').value;
	let desc   =  document.querySelector('#upd-desc').value;
	let access =  document.querySelector('#upd-access').value;
	if(newValidate(title,desc,access) == 0 ) {
		Swal.close();
		Swal.fire({
		  title: 'Wait a Minute... ',
		  onBeforeOpen: () => {
		    Swal.showLoading()
		  },
		 allowOutsideClick: false
		});
		// post update 
		util.postData('/edit/update',{
			id : id,
			name: title,
			access: access,
			description: desc
		}).then((result)=>{
			var subject = document.querySelector('#data-ist-entry-'+id);
			subject.querySelector('.initial').textContent = title;
			successAlert('Success Update Protocol');
		}).catch((err)=>{
			console.log(err);	
			failAlert(err.toString());
		});
	}
	loadingStop();
}


// filtrator
function filtrator(dom,db) {
	var checker = 0; 
	if (dom.length > db.length) {
		checker =  util.checker(dom,db)
		for (var i = 0; i < dom.length; i++) {
		   for (var j = 0; j < checker.length; j++) {
		   		if (dom[i]['id'].toString() == checker[j].toString()) {
		   			var target = dom[i].crono;
		   			let env = document.querySelector('#'+target); 
		   			env.parentNode.removeChild(env);
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

// autoloading
setInterval(function(e){
	var obj  =  document.querySelectorAll('.list-data');
	var arr  =  [];
	for (var i = 0; i < obj.length; i++) {
		var inobj  =  {
			'crono':obj[i].getAttribute('id'),
			'id' : obj[i].querySelector('.button-entry').getAttribute('data-id'),
			'name' : obj[i].querySelector('.initial').textContent,
			'status' : (obj[i].querySelector('.button-entry').classList.contains('on') ? 'on'  : 'off'),
		}
		arr.push(inobj);
	}
	// check is is offline
	if (window.navigator.onLine) {
		document.querySelector("#internet").classList.add("connect")
	} else {
		document.querySelector("#internet").classList.remove("connect")
	}

	util.getData('/view/all',{})
		.then((result)=>{
		    document.querySelector("#server").classList.add("connect")
			if (result['status'][0]['client'] == 'disconnect') {
				document.querySelector("#client").classList.remove("connect");
			} else {
				document.querySelector("#client").classList.add("connect");
			}
			var client  =  result['client'];
			for (var i = 0; i < client.length; i++) {
				for (var j = 0; j < arr.length; j++) {
					if(client[i]['id'] == arr[j]['id']) {
						if (client[i]['name'].toString().toLowerCase() != arr[j]['name'].toString().toLowerCase()) {
							document.querySelector('#'+arr[j].crono + ' .initial').innerHTML = client[i]['name'];
						}
						if(client[i]['status'].toString().toLowerCase() != arr[j]['status'].toString().toLowerCase()) {
							if(client[i]['status'].toString().toLowerCase() == 'on') {
								document.querySelector('#'+arr[j].crono + ' .button-entry').classList.remove('off');
								document.querySelector('#'+arr[j].crono + ' .button-entry').classList.add('on');
							} else {
								document.querySelector('#'+arr[j].crono + ' .button-entry').classList.remove('on');
								document.querySelector('#'+arr[j].crono + ' .button-entry').classList.add('off');
							}
						}
					} else {
						//console.log(arr)
					}
				}
			}
			filtrator(arr,client);
		}).catch((err)=>{
			document.querySelector("#server").classList.remove("connect")
			console.log(err);
		})
},1000)

//* this realtime search 
document.querySelector('.form-search-object input').addEventListener('keyup',(el)=>{
	searchData(document.querySelector('.form-search-object input').value);
})
// search method
function searchData(data) {
	var stateObj = { foo: 'bar' };
	let stat  = 0;
    history.pushState(stateObj, 'data', '?key='+data);
	var obj  =  document.querySelectorAll('.list-data');
	var arr  =  [];
	for (var i = 0; i < obj.length; i++) {
		var inobj  =  {
			'id' : obj[i].getAttribute('id'),
			'label' : obj[i].querySelector('.initial').textContent.toLowerCase().split(' ').join(''),
		}
		arr.push(inobj);
	}
	if(data.length > 0) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]['label'].indexOf(data.toLowerCase().split(' ').join('')) >= 0) {
			   document.querySelectorAll('.list-data')[i].classList.remove('d-none');
			} else {
				document.querySelectorAll('.list-data')[i].classList.add('d-none');
			}
		}
	} else {
		for (var i = 0; i < arr.length; i++) {
			document.querySelectorAll('.list-data')[i].classList.remove('d-none');
		}
	}

}