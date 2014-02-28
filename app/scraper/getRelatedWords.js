//getRelatedWords.js
var Promise = require('bluebird');
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();
Promise.promisifyAll(alchemyapi);

var prefiltered = {};
var finished = false;

var myKeywords = function(type, query) {
  var promise = new Promise(function(resolve, reject){
    alchemyapi.keywords(type, query, { 'sentiment':1 }, function(data){
      // console.log("in myKeywords, data: " + JSON.stringify(data['keywords']));
      var keywordRelevanceHash = {};
      for (var i = 0; i < data.keywords.length; i++){
        console.log(JSON.stringify(data.keywords[i]));
        keywordRelevanceHash[data.keywords[i].text] = data.keywords[i].relevance;
      }
      resolve(keywordRelevanceHash);
    });
  });
  return promise;
};


var getWords = function(type, query){

  // var entities = function() {
  //   alchemyapi.entities(type, query, { 'sentiment':1 }, function(response) {
  //     prefiltered['entities'] = response['entities'];
  //   });
  // };

  var keywords = function() {
    //var promiseObj
    alchemyapi.keywords(type, query, { 'sentiment':1 }, function(response) {
      prefiltered['keywords'] = response['keywords'];
      promiseObj.data = prefiltered;
      console.log("In getRelatedWords.js " + prefiltered['keywords']);
      finished = true;
      return prefiltered;
    });
  };

  // var concepts = function() {
  //   alchemyapi.concepts(type, query, { 'showSourceText':1 }, function(response) {
  //     prefiltered['concepts'] = response['concepts'];
  //     finished = true;
  //   });
  // };

  //entities();
  keywords();
  //concepts();
};

var getKeywords = function(url, cb){

  var results = {};
  var resultsArray = [];
  prefiltered = {};
  finished = false;

  getWords('url',url);

  var wait = setInterval(function(){
    if (finished === true) {
      // filter out duplicates
      for (var i in prefiltered){
        for (var entry in prefiltered[i]){
          results[prefiltered[i][entry]['text']] = {'keyword':prefiltered[i][entry]['text'],'relevance':prefiltered[i][entry]['relevance']};
        }
      }
      //res.end(JSON.stringify(results));
      clearInterval(wait);
      for (var j in results){
        resultsArray.push(results[j]);
      }
      return resultsArray;
      //cb(resultsArray);
    }
  }
  , 300);
};


// getWords(process.argv[2], process.argv[3]);
exports.getKeywords = getKeywords;
exports.myKeywords = myKeywords;



// function text(req, res, output) {
//   alchemyapi.text('url', demo_url, {}, function(response) {
//     output['text'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
//     author(req, res, output);
//   });
// }
