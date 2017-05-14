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

  const getImages = (url) => new Promise((resolve, reject) => {
    
    const boilerpipe = new Boilerpipe({
      extractor: Boilerpipe.Extractor.KeepEverything
    }).setUrl(url);

    boilerpipe.getImages((err, images) => {
      if (!err){
        resolve(images);
      }
      else{
        reject(err);
      }
    });
  });

  const getData = (url) => Promise.all([ 
    getTitle(url),
    getParagraph(url),
    getImages(url)
  ]).then((results) => results);

  getData(url.url5).then((results) => {
  
    console.log(results[0]);
    
    //console.log(results[2]);
    for (let img in results[2]){

      console.log(`${parseInt(img)+1}: ` + results[2][img].src);
    };

    console.log(results[1]);
  });
})();
