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

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}


  var options = {

    uri: url1,
    transform: (body) => {
      return cheerio.load(body);
    }
  };

  rp(options).then(($) => {
      //console.log($("p").text());
      console.log("<div>");
      console.log("<h1>");
      console.log($("title").text());
      console.log("</h1>");
      
      //let data = $("p").html();
      //console.log(data);

      $('p').each(function(i, element){
        let a = $(this).text();
        if (!isBlank(a)){
        console.log("<p>");
        console.log(a);
        console.log("</p>");
        }
      });

      console.log("</div>");
    }).catch((e) => {
      console.log(e);
    });

})();

var boilerpipe = new Boilerpipe({
  extractor: Boilerpipe.Extractor.ArticleSentences
  });

boilerpipe.setUrl(url3);

boilerpipe.getText(function(err, text){
    if (!err) {
        console.log(text);
    }
});

