var cheerio = require('cheerio');
var Promise = require('bluebird');
var pReq    = Promise.promisify(require('request'));
var request = require('request');
var _       = require('underscore');
var db      = require('../database/db');
var alchemy = require('./getRelatedWords');


var getLinks = function(err, resp, html, url) {
  var $ = cheerio.load(html);
  var title = $('title').text();

  title = title.replace(/ - Wikipedia, the free encyclopedia/, "");
  // url = url.replace(/http:\/\/en.wikipedia.org\/wiki/, "");

  var links = [];
  $('#mw-content-text a').each(function(i, link) {
    var internal = /#/gi.test( $(link).attr('href') );
    if (!internal) {
      var linkTitle = $(link).attr('title');
      var href = $(link).attr('href');
      links.push({
        title: linkTitle,
        url: 'http://wikipedia.com'+ href
      });
    }
  });

  // var linksObj = {
  //   url: url,
  //   title: title,
  //   incoming: null,
  //   outgoing: links.length
  // }
  //insertDb(linkObj);

  var linksObj2 = {
    url: url,
    title: title,
    links: links,
    incoming: null,
    outgoing: links.length
  }

  // console.log("Above myKeywords invocation");
  // alchemy.myKeywords("url", linksObj2.url)
  //   .then(function(data){
  //     console.log("In .then, data: " + JSON.stringify(data['keywords']));

  //   })
  //   .error(function(error){ 
  //     console.log(error)
  //   });



  Promise.all([alchemy.myKeywords("url", linksObj2.url), alchemy.myKeywords("url", linksObj2.links[0].url)])
    .then(function(dataArr){
     console.log("In .then Data0 :" + JSON.stringify(dataArr[0]));
     console.log("In .then Data1 :" + JSON.stringify(dataArr[1]));
    })
    .error(function(error){
     console.log("In .error Data0 :" + error)
     console.log("In .error Data1 :" + error);
    });

  //do comparision

  //console.log("In scrape, keywordkeywords);

  // db.insertInputUrl(linksObj2, function(){  //SAVE ME FOR HEROKU
  //   console.log('added to database!');
  // });

  return linksObj2;
};

var urlLinksContains = function(url) {
  return db.contains(url);
  //return false;
}

var scrape = function(url, res) {

  //if (!urlLinksContains(url)) {
    request(url, function(err, resp, html) {
      var linksObj = getLinks(err, resp, html, url);
      res.end(JSON.stringify(linksObj));
    });
  //}
};

exports.scrape = scrape;
