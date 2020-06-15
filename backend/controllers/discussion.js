const Sauce = require('../models/sauce');
const fs = require('fs');
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");

exports.getAllDiscussions = (req, res, next) => {
  var sql = 'SELECT * FROM discussion WHERE utilisateur1 = 1';
  mysqlConnection.query(sql, function(err, result) {
    console.log('------------------');
    console.log(result);
    console.log('------------------');

    if (err) {
      throw err;
    } else {
      ///res.sendStatus(200); 
      res.status(200).json({result});
    }
  });
};


exports.getDiscussion = (req, res, next) => {
  var sql = 'SELECT * FROM message WHERE discussion=3';
  mysqlConnection.query(sql, function(err, result) {
    console.log('------------------');
    console.log(result);
    console.log('------------------');

    if (err) {
      throw err;
    } else {
      ///res.sendStatus(200); 
      res.status(200).json({result});
    }
  });
};

exports.createDiscussion = (req, res, next) => {

  if(req.body.destinataire != null || req.body.content != null ){
    //quelques const
    const expediteur = req.body.expediteur; //-> mettre localstorage de l'utilisateur loguer
    const destinataire = req.body.destinataire;
    const dateCreate = new Date();
    const content = req.body.content; //-> a proteger

    var sqlinsertDiscussion = "INSERT INTO discussion (utilisateur1, utilisateur2, create_at) VALUES ('"+expediteur+"','"+destinataire+"', '"+dateCreate+"')";

    mysqlConnection.query(sqlinsertDiscussion, function(err, result) {
      console.log('------------------ log insert discussion');
      console.log(result);
      console.log('------------------ log insert discussion');

        if (err) {
          throw err;
        } else {
          res.status(200).json({result});
        }
    });

    const lastIdDiscussionTable = result.insertId; // on recupere le dernier id enregistrer dans la table discussion
    // ici discussion bien enregistree alors on enregistre le message
    var sqlinsertMessage = "INSERT INTO message (expediteur, destinataire, contenu, create_at, discussion) VALUES ('"+expediteur+"','"+destinataire+"','"+content+"','"+dateCreate+"','"+lastIdDiscussionTable+"')";
    mysqlConnection.query(sqlinsertMessage, function(err, result) {
      console.log('------------------ log insert message');
      console.log(result);
      console.log('------------------ log insert message');
      if (err) {
        throw err;
      } else {
        res.status(200).json({result});
      }
    });
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


