// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port  = process.env.PORT || 8080;

var mongoose   = require('mongoose');
//mongoose.connect('mongodb://admin:123@ds247449.mlab.com:47449/robots-builder');
mongoose.connect('mongodb://robotbuilder:robotbuilder99@ds231133.mlab.com:31133/robotbuilder');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

var routes = require('./routes/api');

app.use('/api', routes);

app.listen(port);
console.log('Running on port ' + port);
