var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var connection = mysql.createConnection(dbconfig);

var dateFormat = require('dateformat');
var time = dateFormat(new Date(), "yyyy-mm-dd");
const countryList = require('country-list');

// 회원 계정 생성/등록
router.put('/create', function (req, res) {

    var email = req.body.email;
    var pass = req.body.pass;
    var country = req.body.country;
    var first_name = req.body.fname;
    var last_name = req.body.lname;
    var agree = req.body.agreement;

    var sql = 'INSERT INTO members (email, password, country, first_name, last_name, agreement, reg_date, auth) ' +
        'VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
    var params = [email, pass, country, first_name, last_name, agree, time, 'tutor'];
    connection.query(sql, params, function (err, rows, fields) {
        if (err) {
            res.send(err);
            console.log("err", err);
        } else {
            res.send("Succeed");
        }
    });
});

//이메일 등록 여부 검사
router.post('/check_email', function (req, res) {
    /*console.log("req", req.body.email);*/
    connection.query('select EXISTS (SELECT * FROM members WHERE email = ?) as success',
        req.body.email, function (err, rows, field) {
            if (!err) {
                if (rows[0].success === 0) {
                    res.send('possible');
                } else if (rows[0].success === 1) {
                    res.send('enrolled');
                }

            } else {
                console.log('Error while performing Query.', err);
            }
        });
});

//나라 목록 반환
router.get('/get_countries', function (req, res) {
    /*console.log("countryList", countryList.getNames());*/
    res.send(countryList.getNames());

});

// 해당 회원 정보 삭제
router.delete('/delete', function (req, res) {
    var id = req.body.id;
    /*console.log("데이터", id);*/
    connection.query('DELETE FROM members WHERE ID=(?)', id, function (err, rows, fields) {
        if (err) {
            console.log("err", err);
        } else {
            res.send("Delete Succeed");
        }
    });
});

//로그인 시 id, password 체크
router.post('/login', (req, res) => {
    /*console.log("req", req.body.email);*/
    connection.query('SELECT first_name FROM members WHERE email = ? and password = ?',
        [req.body.email, req.body.pass], function (err, rows, field) {
            if (!err) {
                res.send(rows);
            } else {
                console.log('Error while performing Query.', err);
            }
        });
});

module.exports = router;