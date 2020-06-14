
const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    port: process.env.SQL_PORT,
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