const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");

//inscription utilisateur
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

//connexion utilisateur
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
        res.status(200).json({userId: result[0].id,userLevel: result[0].level,token: jwt.sign( { userId: result[0].id },'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' }) });
      
      })
      .catch(error => res.status(500).json({ error: "<- Erreur 500" }));
    }
  });
}

//afficher tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
  const id = req.params.id;
  var sql = 'SELECT pseudo FROM membre WHERE id != '+id;   //  -> on cherche tous les membres...
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      ///res.sendStatus(200); 
      res.status(200).json(result);  
    }
  });
}

//afficher un seul utilisateur (profil)
exports.getOneUser = (req, res, next) => {
  const idUser = req.params.userId;
  var sql = 'SELECT * FROM membre WHERE id = '+idUser;   //  -> on cherche tous du membre
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      console.log(result)
      res.status(200).json(result);  
    }
  });

}

//suppression de l'utilisateur
exports.deleteOneUser = (req, res, next) => {
  const idUser = req.params.userId;
  var sql = 'DELETE FROM membre WHERE id = '+idUser;   //  -> on cherche tous du membre
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      console.log(result)
      res.status(200).json(result);  
    }
  });

}