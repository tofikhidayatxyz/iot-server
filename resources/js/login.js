'use strict'
import util from './utils';

document.getElementById('login').addEventListener('click',(event)=>{
	let name  =  document.getElementById('name');
	let password  =  document.getElementById('password');
	let fails = 0;
	// validate
	if (name.value == '') {
		fails += 1;
		name.parentNode.classList.add('fail');
		name.parentNode.querySelector('.fail').textContent = 'This field can not be empty';
	} else {
		name.parentNode.classList.remove('fail');
	}

	if (password.value == '') {
		fails += 1;
		password.parentNode.classList.add('fail');
		password.parentNode.querySelector('.fail').textContent = 'This field can not be empty';
	} else {
		password.parentNode.classList.remove('fail');
	}

	if (fails > 0 ) return false;
	util.showLoading();
	util.postData('/login',{
		username:name.value,
		password:password.value
	}).then((result)=> {
		util.hideLoading();
		if (result.status == 'success') {
			window.location.href = '/';
		}
		if (result.status=='fail') {
			if (result.fail.username) {
				name.parentNode.classList.add('fail');
				name.parentNode.querySelector('.fail').textContent = result.fail.username;
			} else {
				name.parentNode.classList.remove('fail');
			}
			if (result.fail.password) {
				password.parentNode.classList.add('fail');
				password.parentNode.querySelector('.fail').textContent = result.fail.password;
			} else {
				password.parentNode.classList.remove('fail');
			}

		}
	}).catch((e)=> {
		document.querySelector('.floating-alert').classList.add('show')
		util.hideLoading();
		setTimeout(()=>{
			document.querySelector('.floating-alert').classList.remove('show')
		},3000)
	   
	})

})
