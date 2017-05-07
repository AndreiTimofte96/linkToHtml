var request = require('request');
var htmlparser = require("htmlparser2");

var url1 = "http://stiri.co/bayern-incerca-sa-transfere-starurile-lui-monaco-aceasta-vara/";
var url2 = "http://students.info.uaic.ro/~teodor.timofte/GameJs/index.html";


var selectText = function (html){

	/*var ps = html.getElementsByTagName('h3')[0];
	console.log(ps);*/
	var parser = new htmlparser.Parser({
    	
    	onopentagname	: function(tagname){
      		if (tagname === "h3"){
           		console.log("<h3>");
        	 }
    	},
    	ontext: function(text){
        
        		console.log(text);
        	
    	},
    	onclosetag: function(tagname){
        	if (tagname === "h3"){
            console.log("</h3>");
        	}
    	}
	},  {decodeEntities: false});

	parser.write(html);
	parser.end();
}

var urlToHtml = function(url){

	request(url, function (error, response, html){

  		console.log('error:', error); // Print the error if one occurred 
  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  		if (!error){
  			console.log("html:"); 
  			selectText(html);
  		}
	});
}

urlToHtml(url2);