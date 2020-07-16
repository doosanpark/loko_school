var express = require('express');
var router = express.Router();

var pool = require('../database');

var dateFormat = require('dateformat');
var time = dateFormat(new Date(), "yyyy-mm-dd");
const countryList = require('country-list');

// 회원 계정 생성/등록
router.put('/create', async (req, res, next) => {
    var conn = await pool.getConnection();

    var {email, pass, country, first_name, last_name, lang, category, tags, agreement} = req.body;
    console.log("lang", lang.split(','));
    console.log("category", category.split(','));
    console.log("tags", tags);

    try {
        await conn.beginTransaction() // 트랜잭션 적용 시작

        var input_mem = 'INSERT INTO members (email, password, country, first_name, last_name, agreement, reg_date, auth) ' +
            'VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        var params = [email, pass, country, first_name, last_name, agreement, time, 'tutor'];
        var result = await conn.query(input_mem, params);
        var mem_id = result[0].insertId;

        //category 테이블에 데이터 입력
        var sql = 'INSERT INTO categories (category) VALUES(?)';
        var params = [category];
        var cat_id = await conn.query(sql, params);

        //connect_member_category 테이블에 키 입력
        var sql = 'INSERT INTO connect_member_category (mem_id, cat_id) VALUES(?, ?)';
        var params = [mem_id[0][0].id, cat_id[0][0].id];
        var conn_mem_cat = await conn.query(sql, params);

        //tags 테이블에 데이터 입력
        var sql = 'INSERT INTO tutor_tags (tag) VALUES(?)';
        var params = [tags];
        var tag_id = await conn.query(sql, params);

        //connect_member_tutor_tag 테이블에 키 입력
        var sql = 'INSERT INTO connect_member_tutor_tag (mem_id, tag_id) VALUES(?, ?)';
        var params = [mem_id[0][0].id, tag_id[0][0].id];
        var conn_mem_tag = await conn.query(sql, params);

        //lang 테이블에 데이터 입력
        var sql = 'INSERT INTO possible_lang (lang) VALUES(?)';
        var params = [lang];
        var lang_id = await conn.query(sql, params);

        //connect_member_language 테이블에 키 입력
        var sql = 'INSERT INTO connect_member_language (mem_id, lang) VALUES(?, ?)';
        var params = [mem_id[0][0].id, lang_id[0][0].id];
        var conn_mem_language = await conn.query(sql, params);

        await conn.commit(); // 커밋
        return res.send('succeed');
    } catch (err) {
        console.log("에러", err)
        conn.rollback()
        return res.status(500).json(err)
    } finally {
        conn.release() // pool에 conn 반납
    }

});

//이메일 등록 여부 검사
router.post('/check_email', async function (req, res) {

    /*console.log("req", req.body.email);*/

    try {
        var conn = await pool.getConnection();
        var rows = await conn.query(
            'select EXISTS (SELECT * FROM members WHERE email = ?) as success',
            req.body.email
        );

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
router.get('/get_countries', async (req, res, next) => {
    var conn = pool.getConnection();
    /*console.log("countryList", countryList.getNames());*/
    res.send(countryList.getNames());
});

//언어 목록 반환
router.get('/get_languages', async (req, res, next) => {
    try {
        var conn = await pool.getConnection();
        var rows = await conn.query(
            'SELECT * FROM language_table',
        );
        return res.send(rows[0]);
    } catch (err) {
        console.log('Error while performing Query.', err);
    }
});

/*
//이메일 등록 여부 검사
router.post('/check_email', async function (req, res) {

    /!*console.log("req", req.body.email);*!/

    try {
        var conn = await pool.getConnection();
        var rows = await conn.query('' +
            'select EXISTS (SELECT * FROM members WHERE email = ?) as success',
            req.body.email);*/

//태그 목록 반환
router.post('/check_tags', async function (req, res) {
    /*console.log("req", req.body);*/

    try {
        var conn = await pool.getConnection();

        var sql = 'SELECT * FROM tutor_tags WHERE tag LIKE ? \n' +
            'ORDER BY CASE WHEN tag = ? THEN 0 \n' +
            '              WHEN tag = ? THEN 1 \n' +
            '              WHEN tag = ? THEN 2 \n' +
            '              WHEN tag = ? THEN 3 \n' +
            '              ELSE 4 \n' +
            '          END \n' +
            'LIMIT 6 ';
        var params = ["%" + req.body.tag + "%", req.body.tag, req.body.tag + "%", "%" + req.body.tag + "%", "%" + req.body.tag];
        var rows = await conn.query(sql, params);

        return res.send(rows[0]);

    } catch (err) {
        console.log('Error while performing Query.', err);
    }

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