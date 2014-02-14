var fs           = require('fs');
var $            = require('cheerio');
var request      = require('request');
var startTime    = new Date().getTime();
var childProcess = require('child_process');

var website    = 'http://en.wikipedia.org/';
var dirLinks   = ['wiki/Special:AllPages'], pageLinks = [];
var dirCounter = 0;

var writeToFile = function() {
  fs.appendFile(__dirname + '/pages/pageLinks.txt', pageLinks);
  fs.appendFile(__dirname + '/dirs/dirLinks.txt', dirLinks);
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