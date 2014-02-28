var cheerio = require('cheerio');
var Promise = require('bluebird');
var pReq    = Promise.promisify(require('request'));
var request = require('request');
var _       = require('underscore');
var db      = require('../database/db');


var getLinks = function(err, resp, html, url) {
  var $ = cheerio.load(html);
  var title = $('title').text();

  title = title.replace(/ - Wikipedia, the free encyclopedia/, "");
  // url = url.replace(/http:\/\/en.wikipedia.org\/wiki/, "");

  var links = [];

  $('#mw-content-text #toc').prevAll()
    .filter('p').children('a').each(function(i, link) {

    var linkTitle = $(link).attr('title');
    var href      = $(link).attr('href');

    links.push({
      title: linkTitle,
      url: 'http://wikipedia.com'+ href
    });
  });


  $('#mw-content-text #toc').prevAll().filter('p')
  .children('a').filter( function() {
    var href = $(this).attr('href');
    var internal = !(/[#]/g).test(href);
    if (!internal) {
      var linkTitle = $(this).attr('title');
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
  db.insertInputUrl(linksObj2, function(){
    console.log('added to database!');
  });

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
