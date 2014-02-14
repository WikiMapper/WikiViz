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

var Url = Bookshelf.Model.extend({  //Url is a table object
  tableName: 'urls'
});

//var urlRow = new Url();
//urlRow.save();

Url.forge({title: 'Hack Reactor', url: "http://hackreactor.com"}).save()
  .then(function(res) {
    console.log(res.attributes);
});

//Choose