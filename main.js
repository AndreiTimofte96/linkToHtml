(() => {
  'use strict';
  const request = require('request');
  const requestPromise = require('request-promise');
  const cheerio = require('cheerio');
  const Boilerpipe = require('boilerpipe');
  const url = require('./urlParagraphs.js');

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


const getJSON = (url) => getData(url) 
  .then((results) => {

      let srcs = [];
      for (let img in results[2]){
             srcs = srcs.concat(results[2][img].src)
      }

      const obj = {
        title: results[0],
        link: url,
        text: results[1],
        images: srcs
      };

      return obj;
  });


getJSON(url.url1).then( (obj) => console.log(obj)).catch( (e) => console.log(e) );

})();
