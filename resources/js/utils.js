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