var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

var getWords = function(queryURL){

  var prefiltered = {};
  var finished = false;

  var entities = function() {
    alchemyapi.entities('url', queryURL, { 'sentiment':1 }, function(response) {
      prefiltered['entities'] = response['entities'];
    });
  };

  var keywords = function() {
    alchemyapi.keywords('url', queryURL, { 'sentiment':1 }, function(response) {
      prefiltered['keywords'] = response['keywords'];
    });
  };

  var concepts = function() {
    alchemyapi.concepts('url', queryURL, { 'showSourceText':1 }, function(response) {
      finished = true;
      prefiltered['concepts'] = response['concepts'];
    });
  };

  entities();
  keywords();
  concepts();

  var results = {};

  var wait = setInterval(function(){
    if (finished) {
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
  , 400);
};

getWords(process.argv[2]);

// function text(req, res, output) {
//   alchemyapi.text('url', demo_url, {}, function(response) {
//     output['text'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
//     author(req, res, output);
//   });
// }