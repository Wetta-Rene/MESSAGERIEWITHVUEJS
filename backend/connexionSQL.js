
const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "GROUPOMANIA",
    port: "8889",
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