var cheerio = require('cheerio');
var request = require('request');

var getLinks = function(err, resp, html) {
  var $ = cheerio.load(html);

  $('#mw-content-text a').each(function(i, link) {
    var internal = /#/gi.test( $(link).attr('href') );

    if (!internal) {

    }
  });
};

var scrape = function(url) {
  request(url, getLinks);
};











exports.scrape = scrape;