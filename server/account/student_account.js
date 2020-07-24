var express = require('express');
var router = express.Router();

var pool = require('../database.js');

var dateFormat = require('dateformat');
var time = dateFormat(new Date(), "yyyy-mm-dd");
const countryList = require('country-list');

// 회원 계정 생성/등록
router.put('/create', async (req, res, next) => {
    try {
        var email = req.body.email;
        var pass = req.body.pass;
        var country = req.body.country;
        var first_name = req.body.fname;
        var last_name = req.body.lname;
        var agree = req.body.agreement;
        var conn = await pool.getConnection();

        var sql = 'INSERT INTO members (email, password, country, first_name, last_name, agreement, reg_date, auth) ' +
            'VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        var params = [email, pass, country, first_name, last_name, agree, time, 'student'];
        await conn.query(sql, params);
        return res.send("Succeed");
    } catch (err) {
        console.log("err", err);
        return res.send(err);
    }
});

//이메일 등록 여부 검사
router.post('/check-emails', async function (req, res) {

    /*console.log("req", req.body.email);*/

    try {
        var conn = await pool.getConnection();
        var rows = "";

        rows = await conn.query('select EXISTS (SELECT * FROM members WHERE email = ?) as success', req.body.email);

        if (rows[0][0].success === 0) {
            return res.send('possible');
        } else if (rows[0][0].success === 1) {
            return res.send('enrolled');
        }

    } catch (err) {
        console.log('Error while performing Query.', err);
    }

});


//나라 목록 반환
router.get('/get-countries', async (req, res, next) => {
    var conn = pool.getConnection();
    /*console.log("countryList", countryList.getNames());*/
    res.send(countryList.getNames());
});


// 해당 회원 정보 삭제
router.delete('/delete', async function (req, res) {
    var conn = pool.getConnection();
    var id = req.body.id;
    /*console.log("데이터", id);*/

    try {
        await conn.query('DELETE FROM members WHERE ID=(?)', id);
        return res.send("Delete Succeed");
    } catch (err) {
        console.log("err", err);
    }

});

module.exports = router;