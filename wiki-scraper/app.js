var fs        = require('fs');
var $         = require('cheerio');
var request   = require('request');
var child     = require('child_process');

child.fork(__dirname + "/child-process.js");

var dirLinks  = ['http://en.wikipedia.org/wiki/Special:AllPages'];
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
  console.log('PARENT IS SEARCHING -->' + nextPageURL);

  if (nextPageExists && nextPageURL != 'http://en.wikipedia.org/w/index.php?title=Special:AllPages&from=%28272%29+Antonia') {
    getNextPage(parsedHTML);
  } else {
    var endTime = new Date().getTime();
    console.log("\n ########### WE'RE SCRAPPIN', BRO!!! ########### \n",
                "Street Scrapper brawled up " + counter + " fools in", 
               (endTime - startTime) / 1000, "\n");
    return;
  }
};

request(dirLinks[0], getHTML);





// var cluster = require('cluster');
// var http = require('http');
// var numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//   // Fork workers.
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('death', function(worker) {
//     console.log('worker ' + worker.pid + ' died');
//   });
// } else {
//   // Worker processes have a http server.
//   http.Server(function(req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
//   }).listen(8000);
// }