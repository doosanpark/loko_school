var express = require('express');
var mysql = require('mysql');
var dbconfig = require('./database.js');

var account = require('./account/account');

const cors = require('cors');


var app = express();
app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(express.json());


app.use('/account', account); //회원가입 및 로그인


app.listen(app.get('port'), function () {
    console.log('Express server listening on port' + app.get('port'));
})