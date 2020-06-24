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
      res.status(200).json(result);  
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