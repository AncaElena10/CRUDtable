const { mongoose } = require('./db.js'); // <--- NU STERGE ASTA!!!
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
var app = express();
var mongoose1 = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db = mongoose1.connection;
var employee = require('./controllers/employeeController.js');
var user = require('./controllers/users.js');
const blogs = require('./controllers/comments.js');
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

// utils
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// cors
app.use(cors({
    origin: ['http://localhost:4200', 'http://192.168.8.36:4200'],
    credentials: true,
}));

// server port
app.listen(3030, () => console.log('Server started at port: 3030'));

// routes
app.use('/employees', employee);
app.use('/api', user);
app.use('/blogs', blogs);