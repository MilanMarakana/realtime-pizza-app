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

const PORT = process.env.PORT || 3000;

//Assests
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

//set a layouts
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

//setup server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
