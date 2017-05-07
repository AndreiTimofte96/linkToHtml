(() => {
  'use strict';
  const request = require('request');
  const rp = require('request-promise');
  const cheerio = require('cheerio');

  const url1 = "http://stiri.co/bayern-incerca-sa-transfere-starurile-lui-monaco-aceasta-vara/";
  const url2 = "http://students.info.uaic.ro/~teodor.timofte/GameJs/index.html";


  var options = {
    uri: url2,
    transform: (body) => {
      return cheerio.load(body);
    }
  };

  rp(options)
    .then(($) => {
      console.log($.html());
      console.log($('h1').text());

    })
    .catch((e) => {
      console.log(e);
    });

})();

