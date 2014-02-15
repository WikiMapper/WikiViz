/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var querystring = require('querystring');
var Bookshelf = require('bookshelf').DB;  //note the suffix
var Promise = require('bluebird');  //promises module

var Url = Bookshelf.Model.extend({  //Url is a table ROW object
  tableName: 'urls'
});

var Keyword = Bookshelf.Model.extend({  //Url is a table ROW object
  tableName: 'keywords'
});

exampleURLs = [
  {title: 'Hack Reactor', url: "http://hackreactor.com"},
  {title: 'StackOverFlow', url: "http://stackoverflow.com"},
  {title: 'ESPN', url: "http://espn.com"},
  {title: 'NBA', url: "http://nba.com"},
];

exampleKeywords = [
  {keyword: 'javascript'},
  {keyword: 'a lot of help'},
  {keyword: 'sports'},
  {keyword: 'pro basketball'}
];

var booyah = new Keyword({keyword: "booyah"})
  .fetch({require: true})
  .then(function(res){
    console.log("Then... " + res);})
  .otherwise(function(obj){    
    console.log("Otherwise " + obj);
    //console.log(test.save());
  });



// for(var i =0; i < exampleKeywords.length; i++){
//   new Keyword(exampleKeywords[i])
//     .fetch()
//     .then(function(model){
//       console.log(model);
//     });
// }

// for(var i =0; i < exampleKeywords.length; i++){
//   new Keyword(exampleKeywords[i])
//     .save()
//     .then(function(res){
//     console.log(res.attributes.id);
//   });
// }

