var 
  fs = require('fs'), 
  mcss = require('mcss'),
  path = require('path'),
  jsdom = require('jsdom');

 var easymail = (function(){
  var basic = fs.readFileSync(path.join(__dirname, '../test/pages/basic.html'), 'utf8');
  jsdom.env(basic, function (error, window) {
    console.log(window.document.querySelector('.m-home').);
  });


  var setStyle = (sl, cssText, window){
    if()
  }


  return {
    create: function(filename, options){

    },
    publish: function(){

    }
  }
 })()


