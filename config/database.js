require("dotenv").config();
// USING ORM SEQUELIZE
var sequelize = require("sequelize");
var db = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);
// USING NON ORM
// var mysql = require('mysql2');
// var db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'tutorial_db'
//     }
// );

// db.connect(function(err){
//     if(err) throw err;
//     console.log("database Connect");
// })

module.exports = db;
