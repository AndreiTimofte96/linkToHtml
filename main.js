(() => {
  'use strict';
  const request = require('request');
  const requestPromise = require('request-promise');
  const cheerio = require('cheerio');
  const Boilerpipe = require('boilerpipe');

  const url1 = "http://stiri.co/bayern-incerca-sa-transfere-starurile-lui-monaco-aceasta-vara/";
  const url2 = "http://gandul.md/monica-bellucci-surprinde-sexul-frecvent-si-legumele-proaspete-cheia-unei-vieti-sanatoase/"
  const url3 = "http://ortodoxia.rol.ro/cutremurtor-vezi-aici-ce-se-intampla-cu-sufletele-pruncilor-avortati--969637.html";
  const url4 = "http://sanatatea.ro/7-semne-care-va-arata-ca-nu-sunteti-pentru-prima-data-pe-pamant/";
  const url5 = "http://stirionline19.pw/daniela-crudu-tot-mai-desfigurata-de-operatiile-estetice/";
  const url6 = "http://www.livebiz.ro/video/aude-pentru-prima-data-vocea-mamei-sale/";
  const url7 = "https://www.cocoon.ro/soc-carne-de-om-descoperita-la-mcdonalds/";


  const getTitle = (url) => {
    const options = {
      uri: url,
      transform: (body) => {
        return cheerio.load(body);
      }
    };

    return requestPromise(options).then(($) => {
      return $("title").text();
    }).catch((e) => {
      return null;
    });
  };

  const getParagraph = (url) => new Promise((resolve, reject) => {
    const boilerpipe = new Boilerpipe({
      extractor: Boilerpipe.Extractor.ArticleSentences,
    }).setUrl(url);

    boilerpipe.getText((err, text) => {
      if (!err){
        resolve(text);
      }
      else{
        reject(err);
      }
    });
  });

  const getData = (url) => Promise.all([
    getTitle(url),
    getParagraph(url)
  ]).then((results) => results);


  getData(url7).then((results) => {
    console.log(results);
  });


})();
