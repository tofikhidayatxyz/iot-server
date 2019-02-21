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
}export default {
  checker
}