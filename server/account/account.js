var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var connection = mysql.createConnection(dbconfig);

var dateFormat = require('dateformat');
var time = dateFormat(new Date(), "yyyy-mm-dd");
const countryList = require('country-list');


router.put('/create', function (req, res) {

    var email = req.body.email;
    var pass = req.body.pass;
    var country = req.body.country;
    var first_name = req.body.fname;
    var last_name = req.body.lname;
    var agree = req.body.agreement;

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

router.get('/list', function (req, res) {
    connection.query('SELECT * FROM members', function (err, rows, field) {
        if (!err) {
            /*console.log("rows", rows);*/
            res.send(rows);
        } else {
            console.log('Error while performing Query.', err);
        }
    });
})

router.post('/check_email', function (req, res) {
    /*console.log("req", req.body.email);*/
    connection.query('select EXISTS (SELECT * FROM members WHERE email = ?) as success',
        req.body.email, function (err, rows, field) {
            if (!err) {
                if(rows[0].success===0){
                    res.send('possible');
                } else if(rows[0].success===1){
                    res.send('enrolled');
                }

            } else {
                console.log('Error while performing Query.', err);
            }
        });
})

router.get('/get_countries', function (req, res) {
    /*console.log("countryList", countryList.getNames());*/
    res.send(countryList.getNames());

})

router.post('/get', function (req, res) {
    var id = req.body.id;
    connection.query('SELECT * FROM members WHERE ID = ?', [id], function (err, rows, field) {
        if (!err) {
            res.send(rows);
        } else {
            console.log('Error while performing Query.', err);
        }
    });
})

router.delete('/delete', function (req, res) {
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

router.post('/login', (req, res) => {
    /*console.log("req", req.body.email);*/
    connection.query('select EXISTS (SELECT * FROM members WHERE email = ? and password = ?) as success',
        [req.body.email, req.body.pass], function (err, rows, field) {
            if (!err) {
                if(rows[0].success===0){
                    res.send('failed');
                } else if(rows[0].success===1){
                    res.send('successed');
                }
            } else {
                console.log('Error while performing Query.', err);
            }
        });
})

module.exports = router;