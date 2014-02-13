var fs        = require('fs');
var $         = require('cheerio');
var request   = require('request');
var startTime = new Date().getTime();

var dirLinks  = ['http://en.wikipedia.org/wiki/Special:AllPages'];
var pageLinks = [];

var writeToTemp = function() {
  fs.appendFile(__dirname + '/pages/tempPageLinks.txt', pageLinks);
  fs.appendFile(__dirname + '/dirs/tempDirLinks.txt', dirLinks);
};

var pushPageLinks = function(html) {
  html('a.mw-redirect').map(function(i, link) {
    var href = $(link).attr('href');
    pageLinks.push('http://www.wikipedia.org' + href);
  });
};

var getNextPage = function(html) {
  var nextPageURL = 'http://en.wikipedia.org' + html('a[title="Special:AllPages"]').last().attr('href');
  dirLinks.push(nextPageURL);
  request(nextPageURL, getHTML);
};

var writeToMaster = function() {
  fs.writeFile(__dirname + '/pages/pageLinks.txt', pageLinks);
  fs.writeFile(__dirname + '/dirs/dirLinks.txt', dirLinks);
};
  

var getHTML = function(err, resp, html) {
  var parsedHTML = $.load(html);

  if (dirLinks.length % 500 === 0) {
    writeToTemp();
  }

  pushPageLinks(parsedHTML);

  var nextPageExists = !!parsedHTML('a[title="Special:AllPages"]').last().text().match(/Next Page/gi);

  if (nextPageExists) {
    getNextPage(parsedHTML);
  } else {
    var endTime = new Date().getTime();
    console.log("\n ########### WE'RE SCRAPPIN', BRO!!! ########### \n",
                "Street Scrapper brawled up some fools in", 
               (endTime - startTime) / 1000, "\n");
    return;
  }
};

request(dirLinks[0], getHTML);