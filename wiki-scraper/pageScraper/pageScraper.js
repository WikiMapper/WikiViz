var cheerio = require('cheerio');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisify(require('request'));
var _ = require('underscore');
var path = require('path');

var allPageUrls = [];
var totalPagesVisited = 0;

//finds all links on a page and submits more requests based on those links
var getHTML = function(html, counter){
  var depthCounter = counter || 0;
  var pageUrls = [];
  var $ = cheerio.load(html);

  totalPagesVisited++;

  //gather all links on a page and push to array
  $('#mw-content-text a').each(function(i,link){
    if($(link).attr('href').match(/#/g) === null){
      pageUrls.push("http://en.wikipedia.org" + link.attribs.href)
      //pageUrls.push(link.attribs.href);
    }
  });

  allPageUrls.concat(pageUrls);
  console.log("NEW PAGE has " + pageUrls.length + " links...");

  //if page is not the bottom level call a request on each of its links
  // if( depthCounter < 0){
  //   _.each(pageUrls, function(url){
  //     request(url)
  //       .then(function(result){getHTML(result, depthCounter)})
  //       .catch(function(err){ console.log('error logged!')})
  //   });
  // }
  // depthCounter++;
  return pageUrls;
}

var urlConnections = {};

//read from a file, send request to getHTML and
fs.readFileAsync(path.join(__dirname, 'testFile.txt'), 'utf8')
  .then(function(contents){ return contents.split(',') })
  .then(function(urls){
    return Promise.all(_.map(urls, function(url){
      return request(url)
      .then(function(resp){
        return getHTML(resp)})
        .then(function(urlsOnPage){
            console.log('url: ', url)
            urlConnections[url] = urlsOnPage;
          })
    }));
  }).then(function(){fs.appendFile(path.join(__dirname, 'sample.txt'), JSON.stringify(urlConnections))});



