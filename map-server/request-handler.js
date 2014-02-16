/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
//var fs = require('fs');
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

var findOrCreate = function(){
  var newRow = new Url({'title': "ESPN"});
  newRow.fetch({require: true})
  .then(function(model){
    console.log(model.get('url'));
  })
  .otherwise(function(){
    console.log("Otherwise it's a new row - save the row");
    //newRow.save();
  });
 };

findOrCreate();

// // //This example is working:************
// var testRow = new Url({'title': 'ESPN'})
// testRow.fetch({require: true})
//   .then(function(model) {
//     console.log(model.get('url'));
//   })
//   .otherwise(function(){
//     console.log("Otherwise it's a new row - save the row");
//   });
// // //************************************  

// //This example is working:************
// new Keyword({'keyword': 'javascript'})
//   .fetch()
//   .then(function(model) {
//     console.log(model.get('keyword'));
//   });
// //************************************  

// var findOrCreate = function(){
//   //var newRow = new Constructor(obj);
//   var newRow = new Url({'title': "test"});
//   newRow.fetch({require: true})
//   .then(function(model){
//     console.log("Row found: then return the row id: " + model.attributes);
//   })
//   .otherwise(function(){
//     console.log("Otherwise it's a new row - save the row");
//     newRow.save();
//   });
//  };

// findOrCreate();

// var testRow = new Url({'title': 'test4'});
// testRow.save()
// .then(function(model){
//   console.log(model);
// })
// .otherwise(function(){
//   console.log("Row not found");
// });


// new Url({'title': 'ESPN'})
//   .fetch({require: true})
//   .then(function(model){
//     console.log("Row found: then return the row id: " + model.attributes);
//   })
//   .otherwise(function(){
//     console.log("Otherwise it's a new row - save the row: ");
//     //newRow.save();
//   });

// var findOrCreate = function(){
//   //var newRow = new Constructor(obj);
//   var newRow = new Keyword({'keyword': "sports"});
//   newRow.fetch({require: true})
//     .then(function(model){
//       console.log("Row found: then return the row id: " + model.attributes);
//       //return id
//     })
//     .otherwise(function(){
//       console.log("Otherwise it's a new row - save the row");
//       newRow.save();
//     });
//  };

// findOrCreate();

//var testRow = new Keyword({'keyword': "hmmmm2"});

//testRow.findOrCreate();

 // Bookshelf.Model.prototype.findOrCreate = function(){
 //  var that = this;
 //  console.log(that);
 //  that.fetch({require: true})
 //    .then(function(res){
 //      console.log("Then return the row id: " + res.attributes);
 //      //return id
 //    })
 //    .otherwise(function(){
 //      console.log("Otherwise, save the row");
 //      that.save();
 //    });
 // }


// testRow.fetch({require: true})
//   .then(function(res){
//     console.log("Then... " + res.get('keyword'));
//   })
//   .otherwise(function(){    
//     console.log("Otherwise, save the row");
//     testRow.save();
//   });

// sports.fetch({require: true})
//   .then(function(res){
//     console.log("Then... " + res.toJSON());})
//   .otherwise(function(obj){    
//     console.log("Otherwise " + obj);
//     //console.log(test.save());
//   });

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

