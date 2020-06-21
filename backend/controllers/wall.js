//Imports
const fs = require('fs');
var mysql = require('mysql');
const mysqlConnection = require("../connexionSQL");
const { parse } = require('path');


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

exports.newPost = (req, res, next) => {
  // quelque const plus facile a utilise
  const title =  req.body.title;
  const content = req.body.content;
  const userId = req.body.userId;
  const imageUrl = req.body.imageUrl;
  //const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

  var insertPost = "INSERT INTO wall (userId, title, content, urlImage) VALUES ('"+userId+"','"+title+"','"+content+"','"+imageUrl+"')";

  mysqlConnection.query(insertPost, function(err, result) {
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
};