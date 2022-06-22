// import express from 'express';
const express = require('express');
// import ejs from 'ejs';
const ejs = require('ejs');
// import expressLayouts from 'express-ejs-layouts';
const expressLayouts = require('express-ejs-layouts');
// import path from 'path';
const path = require('path');

// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

//Database Connection
const url =
  'mongodb+srv://Milan_Patel:I%40mgunatit369@cluster0.pkwubrq.mongodb.net/pizza?retryWrites=true&w=majority';
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

//Assests
app.use(express.static('public'));

//set a layouts
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);
//setup server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
