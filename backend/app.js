const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const discRoutes = require('./routes/discussion');
const userRoutes = require('./routes/user');
const wallRoutes = require('./routes/wall');
const adminRoutes = require('./routes/admin');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/discussions', discRoutes); // chemins des discussions
app.use('/api/auth', userRoutes); // chemins utilisateur
app.use('/api/wall', wallRoutes); // chemin du wall Groupomania
app.use('/api/admin', adminRoutes); //chemin de la gestion Admin
 
module.exports = app;