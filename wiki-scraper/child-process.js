var fs        = require('fs');
var $         = require('cheerio');
var request   = require('request');
var startTime = new Date().getTime();

var counter = 0;
var dirLinks  = ['http://en.wikipedia.org/w/index.php?title=Special:AllPages&from=%27N+Sync+%28album%29'];
var pageLinks = [];

var writeToFile = function() {
  fs.appendFile(__dirname + '/pages/pageLinks.txt', pageLinks);
  fs.appendFile(__dirname + '/dirs/dirLinks.txt', dirLinks);
  var pageLinks = [];
  var dirLinks = [];
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

var getHTML = function(err, resp, html) {
  var parsedHTML = $.load(html);
  counter++;

  if (dirLinks.length % 50 === 0) {
    writeToFile();
  }

  pushPageLinks(parsedHTML);

  var nextPageExists = !!parsedHTML('a[title="Special:AllPages"]').last().text().match(/Next Page/gi);
  var nextPageURL = 'http://en.wikipedia.org' + parsedHTML('a[title="Special:AllPages"]').last().attr('href');
  console.log( 'CHILD is searching ----> ' + nextPageURL);

  if (nextPageExists && nextPageURL != 'http://en.wikipedia.org/w/index.php?title=Special:AllPages&from=%28I%27m+in+Love+with%29+Margaret+Thatcher') {
    getNextPage(parsedHTML);
  } else {
    var endTime = new Date().getTime();
    console.log("\n ########### WE'RE SCRAPPIN', BRO!!! ########### \n",
                "Street Scrapper brawled " + counter + " fools in", 
               (endTime - startTime) / 1000, "\n");
    return;
  }
};

request(dirLinks[0], getHTML);