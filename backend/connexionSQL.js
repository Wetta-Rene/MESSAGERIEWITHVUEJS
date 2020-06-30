
const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: 'localhost', // a changer en production par le contenu de .env
    user: 'root', // a changer en production par le contenu de .env
    password: 'root', // a changer en production par le contenu de .env
    database: 'GROUPOMANIA', // a changer en production par le contenu de .env
    port: '3306', // a changer en production par le contenu de .env
    multipleStatements: true
})

mysqlConnection.connect((err) =>{
    if(!err){
        console.log("Connected to SQL DATABASE !")
    }
    else{
        console.log("Connection to SQLDATABASE failed...")
    }
})

module.exports = mysqlConnection;