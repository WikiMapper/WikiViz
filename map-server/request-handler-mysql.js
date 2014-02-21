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
var _ = require('underscore');

var connection = mysql.connection;
//connection.connect();  // I don't think this line is needed

  var db = {
    find_id_by_url: "SELECT url_id FROM urls JOIN url_to_url USING (url_id) WHERE url = ?;",
    find_children_by_id: "SELECT child_id FROM urls JOIN url_to_url USING (url_id) WHERE url_id = ?;",
    find_children_by_url: "SELECT child_id FROM urls JOIN url_to_url USING (url_id) WHERE url = ?;",
    find_parents_by_id: 
      "SELECT *  \
      FROM urls  \
      JOIN url_to_url  \
      USING (url_id)  \
      WHERE child_id = ?;",  //? is a variable that's is specified as the 2cd argument of the query
  testJoinJoin:  //not working
      "SELECT *  \
      FROM urls u1  \
      LEFT OUTER JOIN url_to_url  \
      ON u1.url_id = url_to_url.url_id  \
      LEFT OUTER JOIN urls u2  \
      ON url_to_url.child_id = u2.url_id;",  //? is a variable that's is specified as the 2cd argument of the query
  testJoinJoin2: //not working...
      "SELECT *  \
      FROM urlsCopy u1, url_to_url, dummyUrls u2  \
      WHERE u1.url_id = url_to_url.url_id  \
      AND url_to_url.child_id = u2.myUrl_id;",  //? is a variable that's is specified as the 2cd argument of the query  
  testJoinJoin3: //not working...
      "SELECT u1.title AS title1, u2.title AS title2  \
      FROM urls as u1  \
      INNER JOIN url_to_url ON u1.url_id = url_to_url.url_id  \
      INNER JOIN urls as u2 ON url_to_url.child_id = u2.url_id;",  //? is a variable that's is specified as the 2cd argument of the query
  testJoinJoin4: 'select * from self as child join self as parent on parent.parent = child.sid;'
};


  //mysql> 
  // select * 
  // from self as child 
  // join self as parent 
  // on parent.parent = child.sid;

  // SELECT users.id, users.login
  // FROM users 
  // INNER JOIN friendships ON friendships.user_id = users.id 
  // INNER JOIN users ON users.id = friendships.friend_id 
  // WHERE friendships.user_id = 1

  connection.query(db.testJoinJoin3, function(err, rows){
    if(!err){
      console.log(rows);
      // row0 = rows[0];
      // _.each(row0, function(obj){
      //   console.log(obj);
      // });
    }
    else console.log(err);
  });  

  connection.query(db.find_id_by_url, 'http://foowiki.com/Javascript', function(err, rows){
    if(!err){
      console.log("url_id: " + rows[0].url_id);
      return rows[0].url_id;
    }
    return null;
  });

  connection.query(db.find_children_by_id, 1, function(err, rows){
    connection.query("INSERT INTO urls (child_count, ?)", rows.length, function(err, resp){
      console.log("Saved number of children: " + rows.length);
    });
    _.each(rows, function(row){
      console.log("Child id: " + row.child_id);
    });
  });

  connection.query(db.find_parents_by_id, 1, function(err, rows){
    connection.query("INSERT INTO urls (parent_count, ?)", rows.length, function(err, resp){
      console.log("Saved number of parents: " + rows.length);
    });
    _.each(rows, function(row){
      console.log("Parent id: " + row.url_id);
    });
  });

// "SELECT *  \
//       FROM urls  \
//       JOIN url_to_url  \
//         ON (urls.url_id = url_to_url.url_id)  \
//       JOIN urls
//         ON (url_to_url.child_id = urls.url_id)
//       WHERE url = ?;",


// SELECT elements.ID, elements.Element, groups.Genre
//   FROM elements
// LEFT OUTER JOIN group_elements
//   ON elements.ID = group_elements.ElementID
//  AND group_elements.GroupID = 3
// LEFT OUTER JOIN groups
//   ON group_elements.GroupID = groups.ID

// SELECT breeder.name,breeder.address,breeder.phone,breeder.email,breed.name AS breedName
// FROM breed,breeder,breed__breeder
// WHERE breed__breeder.breed_id = breed.id
// AND breed__breeder.breeder_id = breeder.id
// ORDER BY breeder.name ASC;


//var Bookshelf = require('bookshelf').DB;  //note the suffix
// var Promise = require('bluebird');  //promises module

// var Url = Bookshelf.Model.extend({  //Url is a table ROW object
//   tableName: 'urls',
//   idAttribute: "url_id"
// });

// var UrlsCollection = Bookshelf.Collection.extend({
//   model: Url
// });

// var Url_to_url = Bookshelf.Model.extend({  //Url is a table ROW object
//   tableName: 'url_to_url'
// });

// var Url_to_urlsCollection = Bookshelf.Collection.extend({
//   model: Url_to_url
// });

//Goal 1 of 2: Count number of child nodes
//Iterate over each row in urls table
  //Get url_id[i]
  //Query url_to_url for child nodes of url_id[i]
// var urlsColl = new UrlsCollection();
// var url_to_urlsColl = new Url_to_urlsCollection();
// urlsColl.fetch()
// .then(function(coll){
//   var id;
//   coll.each(function(model){
//     id = model.id;
//     //console.log(id);
//     var childCollPromise = url_to_urlsColl.query({where: {url_id: id}}).fetch();
//     childCollPromise.then(function(childColl){
//       var child_id;
//       var child_title;
//       childColl.each(function(child){
//         child_id = child.get('child_id');
//         child_model = coll.get(child_id);
//         console.log(model.get('title') + " --> " + child_model.get('title'));
//       });
//     });
//   });
// });


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
