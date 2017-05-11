(() => {
	'use strict';
	const request = require('request');
	const promise_title = require('request-promise');
  //const promise_paragraph = require('request-promise');
	const cheerio = require('cheerio');
	const Boilerpipe = require('boilerpipe');

	const url1 = "http://stiri.co/bayern-incerca-sa-transfere-starurile-lui-monaco-aceasta-vara/";
	const url2 = "http://gandul.md/monica-bellucci-surprinde-sexul-frecvent-si-legumele-proaspete-cheia-unei-vieti-sanatoase/"
	const url3 = "http://ortodoxia.rol.ro/cutremurtor-vezi-aici-ce-se-intampla-cu-sufletele-pruncilor-avortati--969637.html";
	const url4 = "http://sanatatea.ro/7-semne-care-va-arata-ca-nu-sunteti-pentru-prima-data-pe-pamant/";
	const url5 = "http://stirionline19.pw/daniela-crudu-tot-mai-desfigurata-de-operatiile-estetice/";
	const url6 = "http://www.livebiz.ro/video/aude-pentru-prima-data-vocea-mamei-sale/";
	const url7 = "https://www.cocoon.ro/soc-carne-de-om-descoperita-la-mcdonalds/";

	var options_title = {

		uri: url7,
		transform: (body) => {
			return cheerio.load(body);
		}
	};

	var boilerpipe = new Boilerpipe({
    
		extractor: Boilerpipe.Extractor.ArticleSentences,
	}).setUrl(options_title.uri);


	console.log("<!DOCTYPE html>");
	console.log("<html>");
	console.log("<div>");

	promise_title(options_title).then(($) => {

		console.log("<h1>");
		console.log($("title").text());
		console.log("</h1>");

	}).catch((error) => {
		  console.log(error);
		});


  var promise_paragraph = new Promise( () => { 

    boilerpipe.getText(function(err, text){
    
      if (!err) {
        console.log("<p>");
        console.log(text);
        console.log("</p>");      
      }
      else{
        console.log(err);
      }
    });
  }).then(() => {  
    console.log("</div>");
    console.log("</html>");
    });
})();