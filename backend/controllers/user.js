const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");

//inscription utilisateur
exports.signup = (req, res, next) => {
mysqlConnection.query(sqlMetier, function(err, result1) {
  const metier = result1[0].metier //on recupere le metier de la premiere requete
  if (err) {
    throw err;
  } else { //j'ai le resultat je peux poursuivre
  var sqlMetier = 'SELECT metier FROM fonction WHERE id='+req.body.level;  //on cherche le metier dans la base de donnée
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      var sql = "INSERT INTO membre (pseudo, email, password, level, metier,admin) VALUES ('"+req.body.pseudo+"','"+req.body.email+"','"+hash+"','"+req.body.level+"','"+metier+"',0)";

      mysqlConnection.query(sql, function(err, result2) {
        console.log('----result2------');
        console.log(result2);
        console.log('-----------------');

        if (err) {
          throw err;
        } else {
          //res.sendStatus(200); 
          res.status(200).json({ id: result2.insertId});
        }
      });
    });
  }
})
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
        //3 params utile pour navigation sur le front: userId, userLevel et le token pour verifier les requetes vers le backend apres
        res.status(200).json({userId: result[0].id, userLevel: result[0].level, token: jwt.sign( { userId: result[0].id },'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' }) });
      
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
  var sqlAllFromMembre = 'SELECT * FROM membre WHERE id ='+idUser;   //  -> on cherche tous du membre
  var sqlFonctionFromMembre = 'SELECT metier FROM fonction WHERE id= '+sqlAllFromMembre.level
  mysqlConnection.query(sqlAllFromMembre, function(err, result) {
    if (err) {
      throw err;
    } else { //on a tout du membre on fait le requete d'apres
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