//Imports
const fs = require('fs');
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");


exports.getAllTheWall = (req, res, next) => {
  const userID = req.params.userId;
  var sql = 'SELECT * FROM wall ORDER BY id DESC';   //  -> mettre en fonction de l'utilisateur loguer
  mysqlConnection.query(sql, function(err, result) {
    if (err) {
      throw err;
    } else {
      ///res.sendStatus(200); 
      res.status(200).json(result);  
    }
  });
};

