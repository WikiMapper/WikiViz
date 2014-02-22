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

// request(website+startURL, getHTML);

// var cheerio = require('cheerio');
// var Promise = require('bluebird');
// var fs = Promise.promisifyAll(require('fs'));
// var request = Promise.promisify(require('request'));
// var _ = require('underscore');
// var path = require('path');

// var allPageUrls = [];
// var totalPagesVisited = 0;

// //finds all links on a page and submits more requests based on those links
// var getHTML = function(html, counter){
//   var depthCounter = counter || 0;
//   var pageUrls = [];
//   var $ = cheerio.load(html);

//   totalPagesVisited++;

//   //gather all links on a page and push to array
//   $('#mw-content-text a').each(function(i,link){
//     if($(link).attr('href').match(/#/g) === null){
//       pageUrls.push("http://en.wikipedia.org" + link.attribs.href)
//       //pageUrls.push(link.attribs.href);
//     }
//   });

//   allPageUrls.concat(pageUrls);
//   console.log("NEW PAGE has " + pageUrls.length + " links...");

//   //if page is not the bottom level call a request on each of its links
//   // if( depthCounter < 0){
//   //   _.each(pageUrls, function(url){
//   //     request(url)
//   //       .then(function(result){getHTML(result, depthCounter)})
//   //       .catch(function(err){ console.log('error logged!')})
//   //   });
//   // }
//   // depthCounter++;
//   return pageUrls;
// }

// var urlConnections = {};

// //read from a file, send request to getHTML and
// fs.readFileAsync(path.join(__dirname, 'testFile.txt'), 'utf8')
//   .then(function(contents){ return contents.split(',') })
//   .then(function(urls){
//     return Promise.all(_.map(urls, function(url){
//       return request(url)
//       .then(function(resp){
//         return getHTML(resp)})
//         .then(function(urlsOnPage){
//             console.log('url: ', url)
//             urlConnections[url] = urlsOnPage;
//           })
//     }));
//   }).then(function(){fs.appendFile(path.join(__dirname, 'sample.txt'), JSON.stringify(urlConnections))});



