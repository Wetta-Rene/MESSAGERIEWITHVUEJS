//Imports
const Sauce = require('../models/sauce');
const fs = require('fs');
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");
const axios = require('axios');



exports.getAllDiscussions = (req, res, next) => {
  var sql = 'SELECT * FROM discussion WHERE utilisateur1 = 1 OR utilisateur2 = 1';   //  -> mettre en fonction de l'utilisateur loguer
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      ///res.sendStatus(200); 
      res.status(200).json({result});
    }
  });
};

//afficher les messages de la discussion numero:
exports.getAllMessages = (req, res, next) => {  
  const discussion = req.body.discussion;
  var sql = 'SELECT * FROM message WHERE discussion = "'+discussion+'" ORDER BY id ASC';
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json({result});
    }
  });
};

exports.createDiscussion = (req, res, next) => {
  if(req.body.destinataire != null || req.body.content != null ){
    //quelques const
    const expediteur = req.body.expediteur; //-> mettre localstorage de l'utilisateur loguer
    const destinataire = req.body.destinataire;
    const content = req.body.content; //-> a proteger

    var sqlinsertDiscussion = "INSERT INTO discussion (utilisateur1, utilisateur2) VALUES ('"+expediteur+"','"+destinataire+"')";

    mysqlConnection.query(sqlinsertDiscussion, function(err, result) {
        if (err) {
          throw err;
        }else{
            const lastIdDiscussionTable = result.insertId; // on recupere le dernier id enregistrer dans la table discussion
            // ici discussion bien enregistree alors on enregistre le message
            var sqlinsertMessage = "INSERT INTO message (expediteur, destinataire, contenu, discussion) VALUES ('"+expediteur+"','"+destinataire+"','"+content+"','"+lastIdDiscussionTable+"')";
            mysqlConnection.query(sqlinsertMessage, function(err, resultat) {
              if (err) {
                throw err;
              } else {
                res.status(200).json({resultat});
              }
            })
        }
    })
  }
};



















exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};



exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, 
            () => {
                    Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


