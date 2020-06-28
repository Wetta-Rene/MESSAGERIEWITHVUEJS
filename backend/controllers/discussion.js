/* VERSION 2


//Imports
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");
const axios = require('axios');



exports.getAllDiscussions = (req, res, next) => {
  const userID = req.params.userId;
  var sql = 'SELECT * FROM discussion WHERE utilisateur1 = "'+userID+'" OR utilisateur2 = "'+userID+'" ';   //  -> mettre en fonction de l'utilisateur loguer
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      ///res.sendStatus(200); 
      res.status(200).json(result);  
    }
  });
};

//afficher les messages de la discussion numero:
exports.getAllMessages = (req, res, next) => {  
  const discussion = req.params.discussion;
  var sql = 'SELECT * FROM message WHERE discussion = "'+discussion+'" ORDER BY id ASC';
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);
    }
  });
};

//créer une nouvelle disccussion
exports.createDiscussion = (req, res, next) => {
  if(req.body.destinataire != null || req.body.content != null ){
    //quelques const
    const expediteur = req.body.expediteur; //-> mettre localstorage de l'utilisateur loguer
    const destinataire = req.body.destinataire;
    const content = req.body.content; //-> a proteger
    const sqlinsertDiscussion = "INSERT INTO discussion (utilisateur1, utilisateur2) VALUES ('"+expediteur+"','"+destinataire+"')";

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

//suppression discussion et les messages
exports.deleteDiscussionAndMessages = (req, res, next) => {
  const idDiscussion = req.params.idDiscussion;
  const sqlDeleteDiscussion = "DELETE FROM discussion WHERE id= '"+idDiscussion+"' ";
  const sqlDeleteMessagesAfterDiscussionTable = "DELETE FROM message WHERE discussion= '"+idDiscussion+"' ";

  mysqlConnection.query(sqlDeleteDiscussion, function(err, result) {
    if (err) {
      throw err;
    } else {
      console.log("Discussion supprimée dans sql...")
      mysqlConnection.query(sqlDeleteMessagesAfterDiscussionTable, function(err, result) {
        if (err) {
          throw err;
        } else {
          console.log("Messages de la discussion supprimés");
          res.status(200).json("Discussion et messages suppriimés");
        }
      });
    }
  })
};
*/
















