'use strict'
/// validate
try {
  let cookie  = document.cookie.split('=');
   if (cookie[0] != 'auth' && !cookie[1]) {
     window.location.href = '/login';
   }
} catch(e) {
  console.log(e);
}

// update worker

document.getElementById('update-worker').addEventListener('click',()=>{
    try {
      caches.delete('static-cache-v1');
    } catch(e) {}
    window.location.reload() ;
})

document.addEventListener('click',()=>{
   document.querySelector('.dropdown-v').classList.remove('show');
})
document.getElementById('show-drop').addEventListener('click',(event)=>{
  event.preventDefault();
  event.stopPropagation();
  document.querySelector('.dropdown-v').classList.toggle('show');

})

document.querySelector('.dropdown-v').addEventListener('click',(event)=>{
  event.stopPropagation();
})



function checker(val1,val2) {
  var check = [] // from val1
  var data  = [] // from val2
  for (var i = 0; i < val1.length; i++) {
      check.push(val1[i]['id'].toString());
  }
  for (var i = 0; i < val2.length; i++) {
     data.push(val2[i]['id'].toString()); 
  }
  var res  =   check.filter( function(n) { return !this.has(n) }, new Set(data) );
  check  = [];
  data   = [];
  return res;
}

async function postData(url = '', data = {}) {
    return new Promise(function(resolve,reject) {
      fetch(url, {
          method: 'POST',
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrer: 'no-referrer', 
          body: data ? JSON.stringify(data) : false,
      })
      .then(response => resolve(response.json()))
      .catch(err=>reject(err));
    });
}

async function getData(url = '', data = {}) {
    return new Promise(function(resolve,reject) {
      fetch(url, {
          method: 'GET',
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrer: 'no-referrer'
          
      })
      .then(response => resolve(response.json()))
      .catch(err=>reject(err));
    });
}






export default {
  checker ,
  postData ,
  getData
}
