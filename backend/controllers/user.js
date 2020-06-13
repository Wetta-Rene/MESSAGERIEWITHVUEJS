const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
var mysql = require('mysql');


// enregistrement utilisateur avec hashage mot de passe
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) // hash du mot de passe
    .then(hash => {
          const sqlHost = process.env.SQL_HOST;
          const sqlUser = process.env.SQL_USER;
          const sqlPassword = process.env.SQL_PASSWORD;

          var connection = mysql.createConnection({
            host     : sqlHost,
            user     : 'root',
            password : 'root',
            database : 'GROUPOMANIA',
            port: '8889'
          });
          
          connection.connect();
          
          connection.query("INSERT INTO membre (pseudo, email, password, level) VALUES ('req.body.pseudo', 'req.body.email', 'req.body.password', 'req.body.level')", function (error, results, fields) {
            if (error) throw error;
            console.log("ok-inscription");
          });

          connection.end();
      });
  


/*
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ message: 'Error to save' }));
    })
    .catch(error => res.status(500).json({ message: 'Error to connect' }));
    */
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({userId: user._id,token: jwt.sign( { userId: user._id },'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' }) });
        
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};