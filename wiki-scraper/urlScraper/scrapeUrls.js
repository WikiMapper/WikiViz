var fs         = require('fs');
var $          = require('cheerio');
var request    = require('request');
var startTime  = new Date().getTime();

var name       = process.argv[2];
var startURL   = process.argv[3];
var endURL     = process.argv[4];

var website    = 'http://en.wikipedia.org/';
var dirLinks   = [startURL], pageLinks = [];
var dirCounter = 0;

var writeToFile = function() {
  fs.appendFile(__dirname + '/links/pageLinks-'+ name +'.txt', pageLinks);
  fs.appendFile(__dirname + '/links/dirLinks-'+ name +'.txt', dirLinks);
  dirLinks = [], pageLinks = [];
};

var pushPageLinks = function(html) {
  html('a.mw-redirect').map(function(i, link) {
    var href = $(link).attr('href');
    pageLinks.push(href);
  });
};

var getNextPage = function(nextPageURL) {
  dirLinks.push(nextPageURL);
  request(website+nextPageURL, getHTML);
};

var trollWiki = function() {
  setTimeout(function() {
    getNextPage(dirLinks.slice(-1));
  }, 1000);
};

var getHTML = function(err, resp, html) {
  if (err) console.log(err);

  if (resp.statusCode !== undefined && resp.statusCode !== 200) {
    trollWiki();
    return;
  }

  var parsedHTML = $.load(html);
  pushPageLinks(parsedHTML);

  if (dirLinks.length % 50 === 0) {
    console.log("\n #### "+ name + " IS SCRAPPIN, BRO! ####");
    console.log(dirLinks.length * ++dirCounter, "dirs brawled!!!");
    writeToFile();
  }

  var nextPageExists = !!parsedHTML('a[title="Special:AllPages"]').last().text().match(/Next Page/gi);
  var nextPageURL = parsedHTML('a[title="Special:AllPages"]').last().attr('href').substring(1);

  var finishedPartition = (nextPageURL === endURL);

  if (nextPageExists && !finishedPartition) {
    getNextPage(nextPageURL);
  } else {
    writeToFile();
    var endTime = new Date().getTime();
    console.log("\n ########### WE'RE SCRAPPIN', BRO!!! ########### \n",
                "Street Scrapper brawled up some fools in", 
               (endTime - startTime) / 1000, "\n");
    return;
  }
};

request(website+startURL, getHTML);