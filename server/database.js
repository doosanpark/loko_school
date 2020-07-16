const mysql = require('mysql2/promise')

var host = 'localhost';
var user = 'root';
var password = '';
var port =3306;
var database = 'loko_school';
var connectionLimit = 10;

const pool = mysql.createPool({
     host : 'localhost',
     user : 'root',
     password : '',
     port :3306,
     database : 'loko_school',
     connectionLimit : 10
})

module.exports = pool