//getRelatedWords.js
var Promise = require('bluebird');
var AlchemyAPI = require('./lib/alchemyapi');
var alchemyapi = new AlchemyAPI();
Promise.promisifyAll(alchemyapi);

var prefiltered = {};
var finished = false;

var myConcepts = function(type, query) {
  var promise = new Promise(function(resolve, reject){
    alchemyapi.concepts(type, query, { 'sentiment':1 }, function(data){
      var keywordRelevanceHash = {};
      console.log(data);
      for (var i = 0; i < data.concepts.length; i++){
        keywordRelevanceHash[data.concepts[i].text] = data.concepts[i].relevance;
      }
      resolve(keywordRelevanceHash);
    });
  });
  return promise;
};


var getWords = function(type, query){

  var keywords = function() {
    alchemyapi.keywords(type, query, { 'sentiment':1 }, function(response) {
      prefiltered['keywords'] = response['keywords'];
      promiseObj.data = prefiltered;
      console.log("In getRelatedWords.js " + prefiltered['keywords']);
      finished = true;
      return prefiltered;
    });
  };

  keywords();
};

var getKeywords = function(url, cb){

  var results = {};
  var resultsArray = [];
  prefiltered = {};
  finished = false;

  getWords('url',url);

  var wait = setInterval(function(){
    if (finished === true) {
      for (var i in prefiltered){
        for (var entry in prefiltered[i]){
          results[prefiltered[i][entry]['text']] = {'keyword':prefiltered[i][entry]['text'],'relevance':prefiltered[i][entry]['relevance']};
        }
      }
      clearInterval(wait);
      for (var j in results){
        resultsArray.push(results[j]);
      }
      return resultsArray;
    }
  }
  , 300);
};


exports.getKeywords = getKeywords;
exports.myConcepts = myConcepts;



