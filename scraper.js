var fs        = require('fs');
var $         = require('cheerio');
var request   = require('request');
var startTime = new Date().getTime();

var dirLinks  = ['http://en.wikipedia.org/wiki/Special:AllPages'];
var pageLinks = [];

var getHTML = function(err, resp, html) {
  var parsedHTML = $.load(html);

  parsedHTML('a.mw-redirect').map(function(i, link) {
    var href = $(link).attr('href');
    pageLinks.push('http://www.wikipedia.org' + href);
  });

  var nextPageExists = !!parsedHTML('a[title="Special:AllPages"]').last().text().match(/Next Page/gi);

  if (nextPageExists && dirLinks.length < 100) {
    var nextPageURL = 'http://en.wikipedia.org' + parsedHTML('a[title="Special:AllPages"]').last().attr('href');
    dirLinks.push(nextPageURL);
    request(nextPageURL, getHTML);  
  } 

  else {
    fs.writeFile(__dirname + '/pageLinks.txt', pageLinks);
    fs.writeFile(__dirname + '/dirLinks.txt', dirLinks);
    var endTime = new Date().getTime();

    console.log("\n ########### WE'RE SCRAPPIN', BRO!!! ########### \n",
                "Street Scrapper brawled up some fools in", 
               (endTime - startTime) / 1000, "\n");
    return;
  }
};

request(dirLinks[0], getHTML);