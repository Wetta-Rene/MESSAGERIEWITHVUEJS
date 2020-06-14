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
};

/*
// enregistrement utilisateur avec hashage mot de passe
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
      var sql = "INSERT INTO membre (pseudo, email, password, level) VALUES ('"+req.body.pseudo+"','"+req.body.email+"','"+hash+"','"+req.body.level+"')"

      mysqlConnection.query(sql, function(err, results) {

          console.log(err);
          console.log(results);
          console.log('------------------');

          if (err) {
            throw err;
          }
      });


      
      mysqlConnection.query(sql, (err, rows, fields) =>{
        if(!err){
          res.send(rows);
          console.log(rows);
        }
        else{
          console.log('Erreur SQL');
        console.log(err);
        }
      });
  })
  .then(() => res.status(201).json({ userInsert: true}))
  .catch(error => res.status(500).json({ message: 'Error to connect' }));

   */       

  


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
    
};
*/

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