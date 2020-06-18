var express = require('express');
var mysql = require('mysql');
var dbconfig = require('./database.js');
var connection = mysql.createConnection(dbconfig);
const cors = require('cors');
var app = express();
var dateFormat = require('dateformat');

var time = dateFormat(new Date(), "yyyy-mm-dd");
const countryList = require('country-list');

app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(express.json());

app.put('/create', function (req, res) {

    var email = req.body.email;
    var pass = req.body.pass;
    var country = req.body.country;
    var first_name = req.body.fname;
    var last_name = req.body.lname;
    var agree = req.body.agreement;
    console.log("req", agree);
    var sql = 'INSERT INTO members (email, password, country, first_name, last_name, agreement, reg_date) ' +
        'VALUES(?, ?, ?, ?, ?, ?, ?)';
    var params = [email, pass, country, first_name, last_name, agree, time];
    connection.query(sql, params, function (err, rows, fields) {
        if (err) {
            res.send(err);
            console.log("err", err);
        } else {
            res.send("Succeed");
        }
    })
})

app.get('/list', function (req, res) {
    connection.query('SELECT * FROM members', function (err, rows, field) {
        if (!err) {
            /*console.log("rows", rows);*/
            res.send(rows);
        } else {
            console.log('Error while performing Query.', err);
        }
    });
})

app.post('/check_email', function (req, res) {
    /*console.log("req", req.body.email);*/
    connection.query('select EXISTS (SELECT * FROM members WHERE email = ?) as success',
        req.body.email, function (err, rows, field) {
        if (!err) {
            if(rows[0].success===0){
                res.send('failed');
            } else if(rows[0].success===1){
                res.send('success');
            }

        } else {
            console.log('Error while performing Query.', err);
        }
    });
})

app.get('/get_countries', function (req, res) {
    /*console.log("countryList", countryList.getNames());*/
    res.send(countryList.getNames());

})

app.post('/get', function (req, res) {
    var id = req.body.id;
    connection.query('SELECT * FROM members WHERE ID = ?', [id], function (err, rows, field) {
        if (!err) {
            res.send(rows);
        } else {
            console.log('Error while performing Query.', err);
        }
    });
})




app.delete('/delete', function (req, res) {
    var id = req.body.id;
    /*console.log("데이터", id);*/
    connection.query('DELETE FROM members WHERE ID=(?)', id, function (err, rows, fields) {
        if (err) {
            console.log("err", err);
        } else {
            res.send("Delete Succeed");
        }
    })
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port' + app.get('port'));
})