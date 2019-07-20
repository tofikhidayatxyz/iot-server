'use strict'
import Swal from 'sweetalert2'
import util from './utils';
let last_append = '';

const swalWithBootstrapButtons = Swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
})

function failAlert(data) {
    data = JSON.stringify(data);
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
    document.querySelectorAll(".swal2-confirm ,  .swal2-cancel").forEach((i) => {
        i.removeAttribute('disabled');
    });
}

// scope
document.querySelectorAll('.block-scope').forEach((item) => {
    item.addEventListener('click', function(e) {
        document.querySelectorAll('.block-scope').forEach((items) => {
            if (items != item) {
                items.classList.remove('expand');
            }
        })
        item.classList.toggle('expand')
    })
})

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

// filtrator
function filtrator(dom, db) {
    var checker = 0;
    if (dom.length > db.length) {
        checker = util.checker(dom, db)
        for (var i = 0; i < dom.length; i++) {
            for (var j = 0; j < checker.length; j++) {
                if (dom[i]['id'].toString() == checker[j].toString()) {
                    var target = dom[i].id;
                    var elv = document.querySelector('.schedule-' + target)
                    elv.parentNode.removeChild(elv);
                }
            }
        }
    } else if (db.length > dom.length) {
        checker = util.checker(db, dom)
        for (var i = 0; i < db.length; i++) {
            for (var j = 0; j < checker.length; j++) {
                if (db[i]['id'].toString() == checker[j].toString()) {
                    appendElement(db[i]);
                }
            }
        }
    }
}

// action

const editEvent = function() {
    let item = this;
    loading()
    util.postData('/schedule/view', {
        id: item.getAttribute('data-id')
    }).then((result) => {
        loadingStop()
        let client = '';
        result['client'].forEach((item) => {
            client += "<option " + (result['data'][0]['client_id'] == item.id ? 'selected' : '') + " value='" + item.id + '|' + item.name + "'>" + item.name + "</option>\n"
        });
        Swal.close();
        Swal.fire({
            title: 'Controller Data',
            html: `<form  id='form-new-item' enctype='multipart/form-data'>
					    <div class='form-group'>
					        <label for='' class='font-weight-bold mb-0 float-left text-left'>Action</label>
					        <select class='swal2-input mt-1 mb-2' id='action'>
								<option value='on' ${result['data'][0]['action'] == 'on' ? 'selected' : ''}>Turn on</option>
								<option value='off' ${result['data'][0]['action'] == 'off' ? 'selected' : ''}>Turn off</option>
					        </select>
					     </div>
					     <div class='form-group'>
					        <label for='' class='font-weight-bold mb-0 float-left text-left'>Target</label>
					        <select class='swal2-input mt-1 mb-2' id='target'>
								${client}
					        </select>
					     </div>
					    <div class='form-group'>
					        <label for='' class='font-weight-bold mb-0 float-left text-left'>TIme</label>
					        <input type='time' id='time' class='swal2-input mt-1 mb-2' placeholder='' value='${result['data'][0]['time']}'> </div>
					    </div>
					</form>
				 	`,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'var(--danger)',
            preConfirm: function() {

                updateSchedule(item.getAttribute('data-id'))
                return false
            }

        })
    }).catch((err) => {
        loadingStop()
        Swal.close();
        failAlert(err.toString());
    })

}

const deleteEvent = function() {
    let item = this;
    Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to delete this?',
        confirmButtonText: 'Ok',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        cancelButtonColor: 'var(--danger)',
        confirmButtonColor: 'var(--info)',
    }).then((result) => {
        if (result['dismiss'] == 'cancel') return false;
        loading()
        util.postData('/schedule/delete', {
                id: item.getAttribute('data-id')
            })
            .then((result) => {
                document.querySelector('.list-parent').removeChild(item.closest('.list-schedule'));
                loadingStop()
                successAlert();
            }).catch((err) => {
                loadingStop()
                failAlert(err.toString());
            })

    });

}

// append element
function appendElement(data) {

    let parent = document.createElement('div');
    parent.classList.add('w-100', 'bg-white', 'shadow', 'rounded', 'list-schedule', 'px-2', 'mt-2', 'schedule-' + data.id);
    parent.setAttribute('id', data.id);
    parent.innerHTML = `
				<div class="time">
					<p class="text-left mb-0 time text-primary __time mr-auto">${data.time}</p>
				</div>
				<div class="command px-2">
					<p class="mb-0 text-truncate w-100 text-grey __command">Turn <span class="action-name">${data.action}</span> <span class="item-name">${data.target}</span></p>
				</div>
				<div class="action"></div>
			</div>
			`;
    let btnEdit = document.createElement('div');
    btnEdit.classList.add('btn', 'p-0', 'ml-1', 'text-warning', 'btn-edit', 'float-right');
    btnEdit.setAttribute('data-id', data.id);
    btnEdit.innerHTML = '<i class="fa fa-edit"></i>';
    btnEdit.addEventListener('click', editEvent)
    parent.querySelector('.action').appendChild(btnEdit)

    let btnRemove = document.createElement('div');
    btnRemove.classList.add('btn', 'p-0', 'ml-1', 'text-danger', 'btn-delete', 'float-right');
    btnRemove.setAttribute('data-id', data.id);
    btnRemove.innerHTML = '<i class="fa fa-trash"></i>';
    btnRemove.addEventListener('click', deleteEvent)
    parent.querySelector('.action').appendChild(btnRemove)

    if (last_append == parent.getAttribute('id')) return false;
    last_append = parent.getAttribute('id');
    document.querySelector('.list-parent').appendChild(parent);
    return findGetParameter('key') ? searchData(findGetParameter('key')) : true;
}

document.querySelector('#plus').addEventListener('click', function(event) {
    ///loadingAlert()
    loading();
    util.getData('/view/all', {}).then((result) => {
        loadingStop();
        result = result['client'];
        Swal.close();
        let client = '';
        result.forEach((item) => {
            client += "<option value='" + item.id + "'>" + item.name + "</option>\n"
        });
        Swal.fire({
            title: 'Add new schedule',
            html: `
				<form  id='form-new-item' enctype='multipart/form-data'>
			    <div class='form-group'>
			        <label for='' class='font-weight-bold mb-0 float-left text-left'>Action</label>
			        <select class='swal2-input mt-1 mb-2' id='action'>
						<option value='on'>Turn on</option>
						<option value='off'>Turn off</option>
			        </select>
			     </div>
			     <div class='form-group'>
			        <label for='' class='font-weight-bold mb-0 float-left text-left'>Target</label>
			        <select class='swal2-input mt-1 mb-2' id='target'>
						${client}
			        </select>
			     </div>
			    <div class='form-group'>
			        <label for='' class='font-weight-bold mb-0 float-left text-left'>TIme</label>
			        <input type='time' id='time' value='00:00' class='swal2-input mt-1 mb-2' placeholder=''> </div>
			    </div>
			</form>
		 	`,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'var(--danger)',
            preConfirm: function() {
                //return false;
                //loading();
                submitSchedule()
                return false
            }
        })
    }).catch((e) => {
        failAlert(JSON.stringify(e));
    })
});

//validator 
function validator() {
    let stat = 0;
    let client = document.getElementById('target')
    let action = document.getElementById('action')
    let time = document.getElementById('time')
    client.classList.remove('swal2-inputerror');
    action.classList.remove('swal2-inputerror');
    time.classList.remove('swal2-inputerror');

    if (client.value.length < 1) {
        stat += 1;
        client.classList.add('swal2-inputerror');
    }
    if (action.value.length < 1) {
        stat += 1;
        action.classList.add('swal2-inputerror');
    }
    if (time.value.length < 1) {
        stat += 1;
        time.classList.add('swal2-inputerror');
    }
    return stat == 0 ? true : false;
}

///all

function submitSchedule() {

    let client = document.getElementById('target')
    let action = document.getElementById('action')
    let time = document.getElementById('time')
    //console.log(validator())
    if (validator() == false) return false;
    loading()
    util.postData('/schedule/store', {
        client: client.value,
        action: action.value,
        time: time.value
    }).then(() => {
        loadingStop()
        successAlert();
    }).catch((e) => {
        failAlert(JSON.stringify(e))
    })

}

// update 

function updateSchedule(id) {
    let client = document.getElementById('target').value
    let action = document.getElementById('action').value
    let time = document.getElementById('time').value
    //console.log(validator())
    if (validator() == false) return false;
    loading()
    util.postData('/schedule/update', {
        client: client.split('|')[0],
        action: action,
        time: time,
        id: id
    }).then((data) => {
        document.querySelector(`.schedule-${id} .action-name`).textContent = action
        document.querySelector(`.schedule-${id} .__time`).textContent = time
        document.querySelector(`.schedule-${id} .item-name`).textContent = client.split('|')[1]

        loadingStop();
        successAlert();
    }).catch((e) => {
        failAlert(JSON.stringify(e))
    })
}

// runner

let isWait = false;
const runner = () => {
    // check is is offline
    if (window.navigator.onLine) {
        document.querySelector("#internet").classList.add("connect")
    } else {
        document.querySelector("#internet").classList.remove("connect")
    }
    var arr = [];
    document.querySelectorAll('.list-schedule').forEach((item) => {
        var inobj = {
            'id': item.getAttribute('id'),
            'action': item.querySelector('.action-name').textContent,
            'time': item.querySelector('.__time').textContent,
            'target': item.querySelector('.item-name').textContent,

        }
        arr.push(inobj);
    });
    if (isWait == false) {
        isWait = true;
        util.getData('/schedule/all', {})
            .then((result) => {
                document.querySelector("#server").classList.add("connect")
                if (result['status'][0]['client'] == 'disconnect') {
                    document.querySelector("#client").classList.remove("connect");
                } else {
                    document.querySelector("#client").classList.add("connect");
                }
                var client = result['data'];
                for (var i = 0; i < client.length; i++) {
                    for (var j = 0; j < arr.length; j++) {
                        if (client[i]['id'] == arr[j]['id']) {
                            if (client[i]['time'].toString().toLowerCase() != arr[j]['time'].toString().toLowerCase()) {
                                document.querySelector('.schedule-' + arr[j].id + ' .__time').textContent = client[i]['time'];
                            }
                            if (client[i]['action'].toString().toLowerCase() != arr[j]['action'].toString().toLowerCase()) {
                                document.querySelector('.schedule-' + arr[j].id + ' .action-name').textContent = client[i]['action'];
                            }
                            if (client[i]['target'].toString().toLowerCase() != arr[j]['target'].toString().toLowerCase()) {
                                document.querySelector('.schedule-' + arr[j].id + ' .item-name').textContent = client[i]['target'];
                            }
                        } else {
                            //console.log(arr)
                        }
                    }
                }

                filtrator(arr, client);
                isWait = false;
            }).catch((err) => {
                document.querySelector("#server").classList.remove("connect")
                console.log(err);
                isWait = false;
            })
    }
    let setPost = arr;

    setPost.sort(function(a, b) {
        let dateA = new Date();
        let dateABase = a.time.split(":");
        dateA.setHours(parseInt(dateABase[0]))
        dateA.setMinutes(parseInt(dateABase[1]));
        let dateB = new Date();
        let dateBBase = b.time.split(":");
        dateB.setHours(parseInt(dateBBase[0]))
        dateB.setMinutes(parseInt(dateBBase[1]));
        return dateA.getTime() - dateB.getTime();
    })

    setPost.map((item, key) => {
        document.getElementById(item.id).style.order = key + 1;
    })
}

setInterval(() => {
    runner();
}, 1000);

//* this realtime search 
document.querySelector('.form-search-object input').addEventListener('keyup', (el) => {
    searchData(document.querySelector('.form-search-object input').value);
})
// search method
function searchData(data) {
    var stateObj = {
        foo: 'bar'
    };
    let stat = 0;
    history.pushState(stateObj, 'data', '?key=' + data);
    var obj = document.querySelectorAll('.list-schedule');
    var arr = [];
    for (var i = 0; i < obj.length; i++) {
        var inobj = {
            'id': obj[i].getAttribute('id'),
            'action': obj[i].querySelector('.action-name').textContent.toLowerCase().split(' ').join(''),
            'target': obj[i].querySelector('.item-name').textContent.toLowerCase().split(' ').join(''),
            'time': obj[i].querySelector('.__time').textContent.toLowerCase().split(' ').join(''),
        }
        arr.push(inobj);
    }
    if (data.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]['action'].indexOf(data.toLowerCase().split(' ').join('')) >= 0) {
                document.querySelectorAll('.list-schedule')[i].classList.remove('d-none');
            } else if (arr[i]['target'].indexOf(data.toLowerCase().split(' ').join('')) >= 0) {
                document.querySelectorAll('.list-schedule')[i].classList.remove('d-none');
            } else if (arr[i]['time'].indexOf(data.toLowerCase().split(' ').join('')) >= 0) {
                document.querySelectorAll('.list-schedule')[i].classList.remove('d-none');
            } else {
                document.querySelectorAll('.list-schedule')[i].classList.add('d-none');
            }
        }
    } else {
        for (var i = 0; i < arr.length; i++) {
            document.querySelectorAll('.list-schedule')[i].classList.remove('d-none');
        }
    }

}

// autorun

runner();