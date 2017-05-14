(() => {
  'use strict';
  const request = require('request');
  const requestPromise = require('request-promise');
  const cheerio = require('cheerio');
  const urls = require('./urlMain.js');
  const verifiedLinks = require('./verifiedLinks.json');


  let selectedUrls = [];
  //let allUrls = [];
 
  const getLinks = (url) => {

    const options = {
      uri: url,
      transform: (body) => {
        return cheerio.load(body);
      }
    };

    return requestPromise(options).then(($) => {

      selectedUrls = [];
    	$('a').each(function(i, element){
      		let link = $(this).attr('href'); 
			if (selectedUrls.indexOf(link) === -1 && link.includes(options.uri)){
      		selectedUrls.push(link);
			}
      	});
      	return selectedUrls;

    }).catch((e) => {
      return null;
    });
  };

  const getAllLinks = (urls) => Promise.all(urls.map((url) => getLinks(url)))
  .then((results) => {
      let links = [];
      results.map((v) => {
        links = links.concat(v);
    });
    return links;
  }); 


  //getAllLinks(urls).then((links) => console.log(links));

  getAllLinks(urls).then((links) => {

    //console.log(links);
    let unchecked = [];
    links.map( (l) => {
      if ( !(l in verifiedLinks) ){
        unchecked = unchecked.concat(l);
      }
    });
    console.log(unchecked);
  });

})();


