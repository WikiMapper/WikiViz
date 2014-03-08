var cheerio = require('cheerio');
var Promise = require('bluebird');
var pReq    = Promise.promisify(require('request'));
var request = require('request');
var _       = require('underscore');
var db      = require('../database/db');
var alchemy = require('./getRelatedWords');


var getLinks = function(err, resp, html, url, res) {
  var $ = cheerio.load(html);
  var title = $('title').text();

  title = title.replace(/ - Wikipedia, the free encyclopedia/, "");

  var links = [];

  $('#mw-content-text #toc, .toclimit-3').prevAll()
    .filter('p').children('a').each(function(i, link) {

    var linkTitle = $(link).attr('title');
    var href      = $(link).attr('href');

    links.push({
      title: linkTitle,
      url: 'http://wikipedia.com'+ href,
      distance: Math.random() * 9 + 1
    });
  });

  var linksObj2 = {
    url: url,
    title: title,
    links: links,
    incoming: null,
    outgoing: links.length
  }


  res.end(JSON.stringify(linksObj2));
};

var distBtwUrlVectors = function(v0, v1){
  var diff = {};
  var distSum = 0;
  for(var key in v0){
    diff[key] = v0[key];
  }
  for(var key in v1){
    if(key in diff)
      diff[key] = diff[key] - v1[key];
    else
      diff[key] = v1[key];
  }
  for(var key in diff){
    distSum = distSum + Math.pow(diff[key], 2);
  }
  //return Math.sqrt(distSum);
  return distSum;
}

var getRandomUrl = function(cb, res){
  request("http://en.wikipedia.org/wiki/Special:Random", function(err, resp, html){
    if (err) { console.log(err)
    } else {
      cb(resp.request.href, res);
    }
  })
}

var scrape = function(url, res) {
  if (url === '' || url === undefined){
    url = getRandomUrl(scrapePage, res);
  }
  else {
    scrapePage(url, res);
  }
};

var scrapePage = function(url, res){
  request(url, function(err, resp, html) {
    getLinks(err, resp, html, url, res);
  });
}

exports.scrape = scrape;
