var fs           = require('fs');
var $            = require('cheerio');
var request      = require('request');
var startTime    = new Date().getTime();

var website    = 'http://en.wikipedia.org/';
var dirLinks   = ['wiki/Special:AllPages'], pageLinks = [];
var dirCounter = 0;

var writeToFile = function() {
  fs.appendFile(__dirname + '/links/pageLinks.txt', pageLinks);
  fs.appendFile(__dirname + '/links/dirLinks.txt', dirLinks);
  dirLinks = [], pageLinks = [];
};

var pushPageLinks = function(html) {
  html('a.mw-redirect').map(function(i, link) {
    var href = $(link).attr('href');
    pageLinks.push(href);
  });
};

var getNextPage = function(html) {
  var nextPageURL = html('a[title="Special:AllPages"]').last().attr('href');
  dirLinks.push(nextPageURL);
  request(website+nextPageURL, getHTML);
};

var getHTML = function(err, resp, html) {
  if (dirLinks.length % 10 === 0) {
    console.log("\n #### SCRAPPIN ####");
    console.log(dirLinks.length * ++dirCounter, "dirs brawled!!!");
    writeToFile();
  }

  var parsedHTML = $.load(html);
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

request(website+dirLinks[0], getHTML);


var child = childProcess.fork(__dirname + "/twitter.js", keywordData);
  child.on("exit", function(){
    console.log(keywordData[0] + ": died :(");
  });
  child.on("message", function(text) {
    console.log(keywordData[0] + ": " + text);
  });
  children.push(child);
});

process.on("exit", function() {
  children.forEach(function(child){
    child.kill();
  });
});