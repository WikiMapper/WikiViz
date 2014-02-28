var cheerio = require('cheerio');
var Promise = require('bluebird');
var pReq    = Promise.promisify(require('request'));
var request = require('request');
var _       = require('underscore');
var db      = require('../database/db');
var alchemy = require('./getRelatedWords');


var getLinks = function(err, resp, html, url, res) {
  var $ = cheerio.load(html);
  var title = $('title').text();

  title = title.replace(/ - Wikipedia, the free encyclopedia/, "");
  // url = url.replace(/http:\/\/en.wikipedia.org\/wiki/, "");

  var links = [];

  $('#mw-content-text #toc').prevAll()
    .filter('p').children('a').each(function(i, link) {

    var linkTitle = $(link).attr('title');
    var href      = $(link).attr('href');

    links.push({
      title: linkTitle,
      url: 'http://wikipedia.com'+ href
    });
  });


  $('#mw-content-text #toc').prevAll().filter('p')
  .children('a').filter( function() {
    var href = $(this).attr('href');
    var internal = !(/[#]/g).test(href);
    if (!internal) {
      var linkTitle = $(this).attr('title');
      links.push({
        title: linkTitle,
        url: 'http://wikipedia.com'+ href
        //distance: value
      });
    }
  });

  // var linksObj = {
  //   url: url,
  //   title: title,
  //   incoming: null,
  //   outgoing: links.length
  // }
  //insertDb(linkObj);

  var linksObj2 = {
    url: url,
    title: title,
    links: links,
    incoming: null,
    outgoing: links.length
  }

  // console.log("Above myKeywords invocation");
  // alchemy.myKeywords("url", linksObj2.url)
  //   .then(function(data){
  //     console.log("In .then, data: " + JSON.stringify(data['keywords']));

  //   })
  //   .error(function(error){
  //     console.log(error)
  //   });



  // Promise.all([alchemy.myKeywords("url", linksObj2.url), alchemy.myKeywords("url", linksObj2.links[0].url)])
  //   .then(function(dataArr){
  //    console.log("In .then Data0 :" + JSON.stringify(dataArr[0]));
  //    console.log("In .then Data1 :" + JSON.stringify(dataArr[1]));
  //   })
  //   .error(function(error){
  //    console.log("In .error Data0 :" + error)
  //    console.log("In .error Data1 :" + error);
  //   });
var distBtwUrlVectors = function(v0, v1){
  var diff = {};
  var distSum = 0;
  for(var key in v0){
    diff[key] = v0[key];
  }
  for(var key in v1){
    if(key in diff)
      diff[key] = diff[key] - v1[key];
    else
      diff[key] = v1[key];
  }
  for(var key in diff){
    distSum = distSum + Math.pow(diff[key], 2);
  }
  //return Math.sqrt(distSum);
  return distSum;
}


  Promise.all(function(){
    var promArr = [];
    promArr.push(alchemy.myConcepts("url", linksObj2.url));
    // for(var i = 0; i < linksObj2.links.length; i++){
    for(var i = 0; i < linksObj2.links.length; i++){
      //console.log(linksObj2.links[i].url);
      promArr.push(alchemy.myConcepts("url", linksObj2.links[i].url));
    }
    return promArr;
  }())
    .then(function(dataArr){
      for(var i = 1; i < dataArr.length; i++){
        // console.log("URL num: " + i + ": " + linksObj2.links[i - 1].url);
        //console.log("Success: array length: " + dataArr[i].length);
        var distIter = distBtwUrlVectors(dataArr[0], dataArr[i]);
        linksObj2.links[i - 1]['distance'] = distIter;
      }
      res.end(JSON.stringify(linksObj2));
    })
    .error(function(){console.log('ERROR')});


  //do comparision

  //console.log("In scrape, keywordkeywords);

  // db.insertInputUrl(linksObj2, function(){  //SAVE ME FOR HEROKU
  //   console.log('added to database!');
  // });

  // return linksObj2;
};

var urlLinksContains = function(url) {
  return db.contains(url);
  //return false;
}

var scrape = function(url, res) {

  //if (!urlLinksContains(url)) {
    request(url, function(err, resp, html) {
      var linksObj = getLinks(err, resp, html, url);
      res.end(JSON.stringify(linksObj));
    });
  //}
};

exports.scrape = scrape;
