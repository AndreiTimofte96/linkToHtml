(() => {
  'use strict';
  const request = require('request');
  const requestPromise = require('request-promise');
  const cheerio = require('cheerio');
  const Boilerpipe = require('boilerpipe');
  const url = require('./url.js');

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
  ]).then((results) => results)



  getData(url.url10).then((results) => {
    
    console.log("<!DOCTYPE html>");
    console.log("<html>");
    console.log("<div>");

    console.log("<h1>");
    console.log(results[0]);
    console.log("</h1>");

    console.log("<p>");
    console.log(results[1]);
    console.log("</p>");

    console.log("</div>");
    console.log("<html>");

  });

})();
