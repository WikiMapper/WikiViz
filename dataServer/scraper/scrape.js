var cheerio = require('cheerio');
var request = require('request');
var db      = require('database/db');


var insertDb = function(data) {
  db.insertInputUrl(data, function() {
    console.log('inserted to database');
  });  
};


var getLinks = function(err, resp, html, url) {
  var $ = cheerio.load(html);
  var title = $('title').text();

  title = title.replace(/ - Wikipedia, the free encyclopedia/, "");
  url = url.replace(/http:\/\/en.wikipedia.org\/wiki/, "");

  var links = [];
  $('#mw-content-text a').each(function(i, link) {
    var internal = /#/gi.test( $(link).attr('href') );
    if (!internal) {
      var href = $(link).attr('href');
      links.push(href);
    }
  });

  insertDb({
    url: url,
    title: title,
    incoming: null,
    outgoing: links.length
  });
};

var scrape = function(url) {
  request(url, function(err, resp, html) {
    getLinks(err, resp, html, url);
  });
};


exports.scrape = scrape;
