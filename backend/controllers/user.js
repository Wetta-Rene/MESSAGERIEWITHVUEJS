const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    var sql = "INSERT INTO membre (pseudo, email, password, level) VALUES ('"+req.body.pseudo+"','"+req.body.email+"','"+hash+"','"+req.body.level+"')";

    mysqlConnection.query(sql, function(err, result) {
      console.log('------------------');
      console.log(result);
      console.log('------------------');

      if (err) {
        throw err;
      } else {
        //res.sendStatus(200); 
        res.status(200).json({ id: result.insertId});
      }
    });
  });
}


exports.login = (req, res, next) => {
  var sql = 'SELECT * FROM membre WHERE email = "'+req.body.email+'" ';

  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
      res.status(401).json({ error: 'Utilisateur non trouvé !' });
    } else {  //utilisateur trouve
      bcrypt.compare(req.body.password, result[0].password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({userId: result[0].id,token: jwt.sign( { userId: result[0].id },'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' }) });
      
      })
      .catch(error => res.status(500).json({ error: "<- Erreur 500" }));
    }
  });
}

exports.getAllUsers = (req, res, next) => {
  var sql = 'SELECT * FROM membre';   //  -> on cherche tous les membres...
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      ///res.sendStatus(200); 
      res.status(200).json(result);  
    }
  });
}



/*
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
*/