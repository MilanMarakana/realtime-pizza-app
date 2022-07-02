// import express from 'express';
require('dotenv').config();
const express = require('express');
// import ejs from 'ejs';
const ejs = require('ejs');
// import expressLayouts from 'express-ejs-layouts';
const expressLayouts = require('express-ejs-layouts');
// import path from 'path';
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
const passport = require('passport');
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

const app = express();

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

//Database Connection
const url = process.env.CONNECTION_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('database connected...');
});

// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   app.listen(PORT, () => console.log('Server running on port:' +PORT ));
// }).then(() => {
//   console.log('database connected...')
// }).catch((err) => {
//   console.log(err.message);
// });

//session MongoDbStore
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: 'sessions',
});

//session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());

//passport config
const initializePassport = require('./app/config/passport');
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

//Assests
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

//set a layouts
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);
//setup server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
