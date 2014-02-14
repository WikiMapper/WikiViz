var fs           = require('fs');
var $            = require('cheerio');
var request      = require('request');
var startTime    = new Date().getTime();

var name     = process.argv[2];
var startURL = process.argv[3];
var endURL   = process.argv[4];

var website    = 'http://en.wikipedia.org/';
var dirLinks   = [startURL], pageLinks = [];
var dirCounter = 0;

var writeToFile = function() {
  fs.appendFile(__dirname + '/links/pageLinks-'+ name +'.txt', pageLinks);
  fs.appendFile(__dirname + '/links/dirLinks-'+ name +'.txt', dirLinks);
  dirLinks = [startURL], pageLinks = [];
};

var pushPageLinks = function(html) {
  html('a.mw-redirect').map(function(i, link) {
    var href = $(link).attr('href');
    pageLinks.push('\n'+href);
  });
};

var getNextPage = function(html, nextPageURL) {
  dirLinks.push('\n'+nextPageURL);
  request(website+nextPageURL, getHTML);
};

var getHTML = function(err, resp, html) {
  var parsedHTML = $.load(html);
  pushPageLinks(parsedHTML);
  writeToFile();

  if (dirLinks.length % 100 === 0) {
    console.log("\n #### "+ name + " IS SCRAPPIN, BRO! ####");
    console.log(dirLinks.length * ++dirCounter, "dirs brawled!!!");
  }

  var nextPageExists = !!parsedHTML('a[title="Special:AllPages"]').last().text().match(/Next Page/gi);
  var nextPageURL = parsedHTML('a[title="Special:AllPages"]').last().attr('href').substring(1);

  var finishedPartition = (nextPageURL === endURL);

  if (nextPageExists && !finishedPartition) {
    getNextPage(parsedHTML, nextPageURL);
  } else {
    var endTime = new Date().getTime();
    console.log("\n ########### WE'RE SCRAPPIN', BRO!!! ########### \n",
                "Street Scrapper brawled up some fools in", 
               (endTime - startTime) / 1000, "\n");
    return;
  }
};

request(website+startURL, getHTML);