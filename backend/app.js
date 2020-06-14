const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();  //chargement du module dotenv pour charger .env avec les mots de passe, config, etc...

const path = require('path');
const discRoutes = require('./routes/discussion');
const userRoutes = require('./routes/user');


const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/discussions', discRoutes);
app.use('/api/auth', userRoutes);
 
module.exports = app;