var express = require('express');
var router = express.Router();

var pool = require('../database.js');

//로그인 시 id, password 체크
router.post('/login', async (req, res, next) => {
    /*console.log("req", req.body.email);*/
    try {
        var connection = await pool.getConnection();

        var rows = await connection.query('SELECT first_name FROM members WHERE email = ? and password = ?',
            [req.body.email, req.body.pass]);
        return res.send(rows);
    } catch (err) {
        console.log('Error while performing Query.', err);
    }

});

module.exports = router;