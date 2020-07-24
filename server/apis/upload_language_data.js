var express = require('express');
var router = express.Router();

var pool = require('../database.js');
const multer = require('multer');

//로그인 시 id, password 체크
router.put('/lang-datas', async (req, res, next) => {

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

// 업로드된 파일을 "uploads/" 라는 폴더에 저장함.
// 해당 폴더가 없을 경우 에러 발생.
const storage = multer.diskStorage({
    destination: function(req, res, callback) {
        callback(null, "C:\\Users\\user\\Documents\\Developer\\Project\\loko_school\\server\\apis\\uploads");
    },
});

const upload = multer({
    storage: storage,
});

// 'files'는 프론트에서 보내온 file들이 저장된 formdata의 key입니다
router.post('/board', upload.array('files'));
router.post('/board', (req, res) => {
    const title = req.body.title;	// 프론트에서 설정한 'title' key의 value
    const contents = req.body.contents;	// 프론트에서 설정한 'contents' key의 value
    const files = req.files;	        // 받은 파일들의 객체 배열

    console.log("files", files);

    // do something...
});

module.exports = router;