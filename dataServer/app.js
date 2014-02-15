//////////////////////////////////////////////////////////////////
// DEPENDENCIES
//////////////////////////////////////////////////////////////////

var express   = require('express');
var routes    = require('./routes');
var user      = require('./routes/user');
var http      = require('http');
var path      = require('path');
var Waterline = require('waterline');
var _         = require('lodash');

var app = express();


//////////////////////////////////////////////////////////////////
// ORM CONFIG
//////////////////////////////////////////////////////////////////

// Instantiate an ORM instance, require the adapter and config
var orm = new Waterline();
var diskAdapter = require('sails-mysql');

var config = {
  adapter: {
    default: mysqlAdapter,
    mysql: mysqlAdapter
  },

  connections: {
    myLocalSql: {
      adapter: 'mysql',
      host: 'localhost',
      database: 'wikiUrls'
    }
  }
};


//////////////////////////////////////////////////////////////////
// ORM MODELS
//////////////////////////////////////////////////////////////////

var Url = Waterline.Collection.extend({
  identity: 'url',
  connection: 'myLocalSql',

  attributes: {
    href: 'string'
  }
});

// Load the Model into the ORM
orm.loadCollection(Url);


//////////////////////////////////////////////////////////////////
// EXPRESS SETUP
//////////////////////////////////////////////////////////////////

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Build Express Routes (CRUD routes for /users)
app.get('/urls', function(req, res) {
  app.models.url.find().done(function(err, models) {
    if(err) return res.join({ err: err }, 500);
    res.join(models);
  });
});

app.post('/urls', function(req, res) {
  app.models.url.create(req.body, function(err, model) {
    if(err) return res.join({ err: err }, 500);
    res.join(model);
  });
});

app.get('/urls/:id', function(req, res) {
  app.models.url.findOne({ id: req.params.id }, function(err, model) {
    if(err) return res.join({ err:err }, 500);
    res.json(model);
  });
});

app.del('/users/:id', function(req, res) {
  app.models.user.destroy({ id: req.params.id }, function(err) {
    if(err) res.join({ err:err }, 500);
    res.json({ status: 'OK' });
  });
});

app.put('/users/:id', function(req, res) {
  // Don't pass ID to update
  delete req.body.id;

  app.models.user.update({ id: req.params.id }, req.body, function(err, model) {
    if(err) res.join({ err:err }, 500);
    res.json(model);
  });
});

//////////////////////////////////////////////////////////////////
// START THE ORM & SERVER
//////////////////////////////////////////////////////////////////

// Start the ORM passing adapter in
orm.initialize(config, function(err, models) {
  if(err) throw err;

  app.models      = models.collections;
  app.connections = models.connections;

  // Start Server
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

  // app.listen(3000);
});