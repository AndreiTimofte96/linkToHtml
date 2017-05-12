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
      extractor: Boilerpipe.Extractor.LargestContent,
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

  const selectImage = (results) => new Promise((resolve, reject) => {

    /*for (let img in results){
      console.log(results[img]);
    };*/

    for (let img in results){
      if (results[img].width != null ){//&& results[img].alt != null){// && results[img].height != null){
        //console.log(results[img].src);
        resolve(results[img].src);
      }
      else{
        reject(null);
      }
    }
  }).then((results) => results);


  getData(url.url6).then((results) => {
    
    console.log("<!DOCTYPE html>");
    console.log("<html>");
    console.log("<div>");
    console.log("<h1>");
    console.log(results[0]);
    console.log("</h1>");
    console.log("<img src = ");

    //console.log(results[2]);
    if (results[2].length > 1){
      selectImage(results[2]).then( (results) => {console.log(results)});
    }
    else{
      console.log(results[2][0].src);
    }
    console.log("/>");
    console.log("<p>");
    console.log(results[1]);
    console.log("</p>");

    console.log("</div>");
    console.log("</html>");

  });
})();
