const mysql = require('mysql2/promise')

var host = 'localhost';
var user = 'lokoschoolbiz';
var password = 'lokoschool101!';
var port =3306;
var database = 'lokoschoolbiz';
var connectionLimit = 10;

const pool = mysql.createPool({
     host,
     user,
     password,
     port,
     database,
     connectionLimit
})

module.exports = pool;

/*
var host = 'localhost';
var user = 'root';
var password = '';
var port =3306;
var database = 'loko_school';
var connectionLimit = 10;
*/
