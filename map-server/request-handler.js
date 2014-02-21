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
  tableName: 'urls',
  idAttribute: "url_id"
});

var UrlsCollection = Bookshelf.Collection.extend({
  model: Url
});

var Url_to_url = Bookshelf.Model.extend({  //Url is a table ROW object
  tableName: 'url_to_url'
});

var Url_to_urlsCollection = Bookshelf.Collection.extend({
  model: Url_to_url
});

//Goal 1 of 2: Count number of child nodes
//Iterate over each row in urls table
  //Get url_id[i]
  //Query url_to_url for child nodes of url_id[i]
var urlsColl = new UrlsCollection();
var url_to_urlsColl = new Url_to_urlsCollection();
urlsColl.fetch()
.then(function(coll){
  var id;
  coll.each(function(model){
    id = model.id;
    //console.log(id);
    var childCollPromise = url_to_urlsColl.query({where: {url_id: id}}).fetch();
    childCollPromise.then(function(childColl){
      var child_id;
      var child_title;
      childColl.each(function(child){
        child_id = child.get('child_id');
        child_model = coll.get(child_id);
        console.log(model.get('title') + " --> " + child_model.get('title'));
      });
    });
  });
});


// var qb = Url.query();
// qb.where({id: 1}).select().then(function(resp) {
//   console.log(resp);
// });



// var findOrCreate = function(Constructor, obj){
//   var newRow = new Constructor(obj);
//   newRow.fetch({require: true})
//   .then(function(model){
//     console.log(model.id);
//   })
//   .otherwise(function(){
//     console.log("Otherwise it's a new row - save the row: " + newRow);
//     newRow.save();
//   });
//  };

// findOrCreate(Url, {'title': "ESPN", url: "http://espn.com"});
