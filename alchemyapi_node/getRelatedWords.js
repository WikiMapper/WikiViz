var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

var getWords = function(type, query){

  var prefiltered = {};
  var finished = false;

  var entities = function() {
    alchemyapi.entities(type, query, { 'sentiment':1 }, function(response) {
      prefiltered['entities'] = response['entities'];
    });
  };

  var keywords = function() {
    alchemyapi.keywords(type, query, { 'sentiment':1 }, function(response) {
      prefiltered['keywords'] = response['keywords'];
    });
  };

  var concepts = function() {
    alchemyapi.concepts(type, query, { 'showSourceText':1 }, function(response) {
      prefiltered['concepts'] = response['concepts'];
      finished = true;
    });
  };

  entities();
  keywords();
  concepts();

  var results = {};

  var wait = setInterval(function(){
    if (finished === true) {
      for (var i in prefiltered){
        for (var entry in prefiltered[i]){
          results[prefiltered[i][entry]['text']] = prefiltered[i][entry]['text'];
        }
      }
      for (var j in results){
        console.log(results[j]);
      }
      clearInterval(wait);
    }
  }
  , 300);
};

exports.getWords = getWords;
// getWords(process.argv[2], process.argv[3]);

// function text(req, res, output) {
//   alchemyapi.text('url', demo_url, {}, function(response) {
//     output['text'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
//     author(req, res, output);
//   });
// }