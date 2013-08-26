var 
  fs = require('fs'), 
  mcss = require('mcss'),
  path = require('path'),
  url = require('url'),
  jsdom = require('jsdom');

console.log(url.resolve('/one/two/three', 'four'))         // '/one/two/four'
console.log(url.resolve('http://example.com/', '/one'))    // 'http://example.com/one'
console.log(url.resolve('f:\\example.com\\one', 'https://two')) // 'http://example.com/two'

var cwd = process.cwd(),
  slice = [].slice;


 var easymail = (function(){
  var basic = fs.readFileSync(path.join(__dirname, '../test/pages/basic.html'), 'utf8');

  return {
    create: function(filename, options){
      var htmlText = fs.readFileSync(filename, 'utf8');
      var basicFilename = filename;
      jsdom.env(htmlText, function (error, window) {
        var document = window.document;
        function $(sl){
          if(typeof sl === 'string') return slice.call(document.querySelectorAll(sl));
          else return sl;
        }
        function setStyle(sl, cssText){
          var node = $(sl);
          if(node){
            node.style.cssText += cssText
          }
        }
        function getCssTextFromFilename(filename, content,callback){
          if(typeof content == 'function'){
            callback = content;
            content = null;
          }
          var cssTexts = [];
          var promise= mcss.promise();
          mcss({filename: filename, importCSS: true})
            .walk('ruleset', function(ast){

              var seletor = mcss.node.toStr(ast.selector);
              var cssText = ast.block.list.map(function(declare){
                return mcss.node.toStr(declare.property) + ':' + mcss.node.toStr(declare.value);
              }).join(';') + ';';
              cssTexts.push({selector: selector, cssText: cssText});
            }).interpret(content).done(function(ast){
              promise.resolve(cssTexts)
            }).fail(function(error){
              promise.reject(error)
            })

          return promise;
        }
        function getRawCssFromHTML(htmlText){
          var promises = [];
          $('link[rel=stylesheet]').forEach(function(node){
            // var filename = path.join(basicFilename, )
            promises.push(getCssTextFromFilename())
          })
        }



        getCssTextFromFilename('E:/code/easymail/test/css/basic.css', function(cssTexts){
          cssTexts.forEach(function(pair){
            setStyle(pair.selector, pair.cssText);
          })
          console.log($('body')[0].innerHTML)
        })
      });
    },
    publish: function(){

    }
  }
 })()

 easymail.create()



/**
 * Options:
 * baseUrl: 静态资源列表
 *
 * mail相关
 *   - username: 
 *   - password:
 *   _ server:
 */