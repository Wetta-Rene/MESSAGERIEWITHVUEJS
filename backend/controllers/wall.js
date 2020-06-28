//Imports
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

exports.newPost = (req, res, next) => {
  // quelque const plus facile a utilise
  const title =  req.body.title;
  const content = req.body.content;
  const userId = req.body.userId;
  const imageUrl = req.body.imageUrl;

  var sqlPseudo = 'SELECT pseudo FROM membre WHERE id='+userId;  //on cherche le metier dans la base de donnée
  mysqlConnection.query(sqlPseudo, function(err, result1) {
    const pseudo = result1[0].pseudo //on recupere le metier de la premiere requete
    if (err) {
      throw err;
    } else { //j'ai le resultat je peux poursuivre
            var insertPost = "INSERT INTO wall (user, title, content, urlImage, admin) VALUES ('"+pseudo+"','"+title+"','"+content+"','"+imageUrl+"',0)";

            mysqlConnection.query(insertPost, function(err, result) {
              if (err) {
                throw err;
              } else {
                //res.sendStatus(200); 
                res.status(200).json({id: result.insertId});
              }
            });
          }
        })
};