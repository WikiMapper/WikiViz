var cheerio = require('cheerio');
var request = require('request');
var db      = require('database/db');


var scrape = function(url) {

  var getLinks = function(err, resp, html) {
    var $ = cheerio.load(html);

    // filter out for regex???
    $('#mw-content-text a').each(function(i, link) {
      var internal = /#/gi.test( $(link).attr('href') );

      if (!internal) {
        
      }
    });
  };

  request(url, getLinks);
};


/* 

  setup tables
  
  urlLinks:  ID, URL, Title, Incoming, Outgoing
  urlMap:    ID, link

get input url
check database if exists... if not
scrape that input url for links
filter out links for wikipedia links
store that collection with that url in urlLinks table

iterator over collection and scrape each page
  in iteration save original URL and the link in urlMap table




*/







exports.scrape = scrape;
