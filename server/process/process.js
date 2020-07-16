var express = require('express');
var router = express.Router();

var pool = require('../database.js');

//로그인 시 id, password 체크
router.post('/get_tutor_info', async (req, res, next) => {
    /*console.log("req", req.body.email);*/
    try {
        var connection = await pool.getConnection();
/*
        var rows = await connection.query('SELECT members.first_name, members.last_name, members.country, tutors.* FROM members INNER JOIN tutors ON members.auth = \'tutor\'' +
            'AND tutors.id=members.id' +
            '');*/
        var rows = await connection.query('SELECT members.first_name, members.last_name, members.country FROM members WHERE members.auth = \'tutor\'');
        return res.send(rows);
    } catch (err) {
        console.log('Error while performing Query.', err);
    }
});

module.exports = router;