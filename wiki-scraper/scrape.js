var cheerio = require('cheerio');
var request = require('request');
var fs      = require('fs');

var sites = {};
var site  = "http://www.hackreactor.com";

var printInfo = function() {
  fs.writeFile(__dirname + '/sites.txt', JSON.stringify(sites));
};


var scrapeChildren = function(links) {
  for(var i = 0; i < links.length; i++) {
    scrape(links[i]);
  }
  printInfo();
};


var savePage = function($, url) {
  var links = [];

  $('a').each(function(i, link) {
    var href = $(link).attr('href');
    if ((/^\//).test(href)) {
      links.push(site + href);
    }
  });

  sites[url] = links;
  scrapeChildren(links);
};


var getHTML = function(err, resp, html, url) {
  if (err) console.log(err);
  if (resp.statusCode !== undefined && resp.statusCode !== 200) {
    console.log("Request was denied", resp.statusCode);
    return;
  } else if ((/^2/).test(resp.statusCode)) {
    var $ = cheerio.load(html);
    savePage($, url);
  }
};


var urlScraped = function(url) {
  for(var site in sites) {
    if (url === site) return true;
  }
  return false;
}


var scrape = function(url) {
  var isQuery = (/[?]/g).test(url);
  if (!(urlScraped(url) || isQuery)) {
    console.log(url + " - being scraped");
    request(url, function(err, resp, html) {
      getHTML(err, resp, html, url)
    });
  }
};

scrape(site);
