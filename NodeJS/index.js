const { mongoose } = require('./db.js'); // <--- NU STERGE ASTA!!!
const express = require('express');
// const router = express.Router(); // Creates a new router object.
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var app = express();
var mongoose1 = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = mongoose1.connection;
var employeeController = require('./controllers/employeeController.js');
var test = require('./controllers/test.js');
var register = require('./controllers/users.js');
var login = require('./controllers/users.js');
var profile = require('./controllers/users.js');
var upload = require('./controllers/users.js');
var comment_details = require('./controllers/comments.js');
const blogs = require('./controllers/comments.js'); // Import Blog Routes
// var picture = require('./controllers/users.js');
// var edit = require('./controllers/users.js');
var comment = require('./controllers/comments.js');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

//passport
var passport = require('passport');
var session = require('express-session');
app.use(session({
  name: 'myname.sid',
  resave: false,
  saveUninitialized: false,
  secret: 'secret',
  cookie: {
    maxAge: 36000000,
    httpOnly: false,
    secure: false
  },
  store: new MongoStore({ mongooseConnection: db })
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

// engine
app.set('view engine', 'html');

// chestii
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: ['http://localhost:4500', 'http://192.168.8.36:4500'],
  credentials: true,
}));
app.use(bodyParser.json());
app.listen(3030, () => console.log('Server started at port: 3030'));

app.use('/employees', employeeController);
app.use('/bla', test);
app.use('/api', register);
app.use('/api', login);
app.use('/api', profile);
app.use('/api', upload);

// app.use('/section', comment)
// app.use('/section', comment_details)

app.use('/blogs', blogs); // Use Blog routes in application