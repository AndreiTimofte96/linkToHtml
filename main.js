(() => {
  'use strict';
  const request = require('request');
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const Boilerpipe = require('boilerpipe');

  const url1 = "http://stiri.co/bayern-incerca-sa-transfere-starurile-lui-monaco-aceasta-vara/";
  const url2 = "http://students.info.uaic.ro/~teodor.timofte/GameJs/index.html";
  const url3 = "http://ortodoxia.rol.ro/cutremurtor-vezi-aici-ce-se-intampla-cu-sufletele-pruncilor-avortati--969637.html";
  const url4 = "http://sanatatea.ro/7-semne-care-va-arata-ca-nu-sunteti-pentru-prima-data-pe-pamant/";
  const url5 = "http://stirionline19.pw/daniela-crudu-tot-mai-desfigurata-de-operatiile-estetice/";
  const url6 = "http://www.livebiz.ro/video/aude-pentru-prima-data-vocea-mamei-sale/";
  
  var options = {

    uri: url6,
    transform: (body) => {
      return cheerio.load(body);
    }
  };
  
  var boilerpipe = new Boilerpipe({
    extractor: Boilerpipe.Extractor.ArticleSentences
  }).setUrl(options.uri);


  rp(options).then(($) => {
      

      console.log("<!DOCTYPE html>");
      console.log("<html>");
      console.log("<div>");
      
      console.log("<h1>");
      console.log($("title").text());
      console.log("</h1>");
      
      boilerpipe.getText(function(err, text){
        if (!err) {
          console.log("<p>");
          console.log(text);
          console.log("</p>");
          console.log("</div>");
          console.log("<html>");
        }
      });

    }).catch((e) => {
      console.log(e);
    });
})();