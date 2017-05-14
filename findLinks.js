(() => {
  'use strict';
  const request = require('request');
  const requestPromise = require('request-promise');
  const cheerio = require('cheerio');
  
  const url1 = "http://stiri.rol.ro";
  const url2 = "http://ponturifierbinti.com"
  const urls = [];
 
  const getLinks = (url) => {

    const options = {
      uri: url,
      transform: (body) => {
        return cheerio.load(body);
      }
    };

    return requestPromise(options).then(($) => {

    	$('a').each(function(i, element){
      		let url = $(this).attr('href'); 
			if (urls.indexOf(url) === -1 && url.includes(options.uri)){
      			urls.push(url);
			}
      	});
      	return urls;

    }).catch((e) => {
      return null;
    });
  };

  getLinks(url1).then((results) => {
    console.log(results);
  });

})();


