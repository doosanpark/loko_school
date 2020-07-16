var express = require('express');
var router = express.Router();

var pool = require('../database.js');

//로그인 시 id, password 체크
router.put('/lang_data', async (req, res, next) => {


    /*console.log("req", req.body.lang_data);*/

    try {


        var conn = await pool.getConnection();
        const {lang_data} = req.body;
        console.log("lang_data", lang_data);
        for(let i = 0; i < lang_data.length-1; i++) {
            var {eng, kor, code} = lang_data[i];

            console.log("code", code);
            console.log("kor", kor);
            console.log("eng", eng);
            var sql = 'INSERT INTO language_table (lang_code, korean, english) VALUES(?, ?, ?)';
            var params = [code, kor, eng];
            let result = await conn.query(sql, params);
        }
        return res.send("succeed");
    } catch (err) {
        console.log('Error while performing Query.', err);
    }
});

module.exports = router;