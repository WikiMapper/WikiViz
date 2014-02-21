
angular.module('VisApp')
  .factory('DatabaseService', ['$http', function($http) {
    console.log('DatabaseService called');

    // var doRequest = function() {
    //   console.log('making request');
    //   return $http({
    //     method: 'JSONP',
    //     url: '../data/testdata.json' 
    //   })
    //   .then(function(data){
    //     console.log(data);
    //     return data;
    //   })
    //   .catch(function(e){
    //     throw e;
    //   });
    //   //return {'url': 'www.hi.com'};
    // };

    // return {
    //   request : function(url) { return doRequest(url); }
    // };

    var data =
    {"nodes":[
        {"title" : "Article One",    "url" : "www.wikepedia.com",    "hits" : 20, "group" : 1},
        {"title" : "Article Two",    "url" : "www.wikepedia.com",    "hits" : 10, "group" : 1},
        {"title" : "Article Three",  "url" : "www.wikepedia.com",  "hits" : 8, "group" : 1},
        {"title" : "Article  Four",   "url" : "www.wikepedia.com",   "hits" : 8, "group" : 3},
        {"title" : "Article Five",   "url" : "www.wikepedia.com",   "hits" : 7, "group" : 2},
        {"title" : "Article Six",    "url" : "www.wikepedia.com",    "hits" : 8, "group" : 1},
        {"title" : "Article Seven",  "url" : "www.wikepedia.en.com",  "hits" : 9, "group" : 1},
        {"title" : "Article Eight",  "url" : "www.wikepedia.ht.com",  "hits" : 11, "group" : 1},
        {"title" : "Article Nine",   "url" : "www.wikepedia.e.com",   "hits" : 11, "group" : 3},
        {"title" : "Article Ten",    "url" : "www.wikepedia..com",    "hits" : 15, "group" : 2},
        {"title" : "Article Eleven",   "url" : "www.wikepedia.com",    "hits" : 5, "group" : 1},
        {"title" : "Article Twelve",    "url" : "www.wikepedia.com",  "hits" : 5, "group" : 1},
        {"title" : "Article Thirteen", "url" : "www.wikepedia.com",   "hits" : 7, "group" : 3},
        {"title" : "Article Fourteen", "url" : "www.wikepedia.com",    "hits" : 9, "group" : 2},
        {"title" : "Article Fifteen",  "url" : "www.wikepedia.com",    "hits" : 10, "group" : 1}
    ],
   "links" : [
        {"source":0,"target":1,"value":100}, {"source":0,"target":2,"value":100},
        {"source":0,"target":3,"value":100},  {"source":0,"target":4,"value":100},
        {"source":0,"target":5,"value":100}, {"source":0,"target":6,"value":100},
        {"source":0,"target":7,"value":100}, {"source":0,"target":8,"value":100},
        {"source":0,"target":10,"value":100}, {"source":0,"target":11,"value":100},
        {"source":0,"target":9,"value":100}, {"source":0,"target":13,"value":100},
        {"source":0,"target":12,"value":100},  {"source":0,"target":14,"value":100}
    ]};

    return { request : data };
  }]);

/**
 * this service will :
 * query table 1 in database for the url
 * query table 2 to get parent & children
 * put this data into array of objects
 * query table 1 to get title, other info
 * 
 */

//
// Creating a service simply returns a function that returns an object. 
// This object is created with the creation of the application instance 
// (remember, it’s a singleton object).

