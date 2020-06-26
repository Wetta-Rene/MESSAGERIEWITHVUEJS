//Imports
const fs = require('fs');
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");
const axios = require('axios');



exports.getPostToModerate = (req, res, next) => {
  const id = req.params.id;
  var sql = 'SELECT * FROM wall WHERE id= "'+id+'" ';
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      const content = result[0].content //on recupere le content du post a moderer
      const moderationText = req.body.moderation;

      const newContentModerer = content +'<br/><h6>[MODERATION: '+moderationText+' ]</h6>'; // nouveau content avec le texte de moderation
          /// on met a jour le post
          var sqlUdatePost = 'UPDATE wall SET content = "'+newContentModerer+'" WHERE id= "'+id+'" ';   //  
          mysqlConnection.query(sqlUdatePost, function(err, result) {
            if (err) {
              throw err;
            } else {
              console.log("Ok content mis à jour");
              res.status(200).json(result);  
            }
          });
    }
  });
};

exports.getAllLastSignup = (req, res, next) => {
  var sql = 'SELECT * FROM membre WHERE admin= 0 ';   //  
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);  
    }
  });
};

exports.getAllLastPost = (req, res, next) => {
  var sql = 'SELECT * FROM wall WHERE admin= 0 ';   //  
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);  
    }
  });
};

exports.setupSignup = (req, res, next) => {
  const id = req.params.id;
  var sql = 'UPDATE membre SET admin = 1 WHERE id= "'+id+'" ';   //  
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);  
    }
  });
};

exports.setupPost = (req, res, next) => {
  const id = req.params.id;
  var sql = 'UPDATE wall SET admin = 1 WHERE id= "'+id+'" ';   //  
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);  
    }
  });
};

exports.deleteSetupSignup = (req, res, next) => {
  const id = req.params.id;
  var sql = 'DELETE FROM membre WHERE id= "'+id+'" ';   //  
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.status(200).json(result);  
    }
  });
};