var express = require('express');

var student_account = require('./account/student_account');
var tutor_account = require('./account/tutor_account');
var login = require('./account/login');
var proce = require('./process/process');
var language_data = require('./apis/upload_language_data');

const path = require('path');
const cors = require('cors');

var app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 3001);
app.use(cors());
app.use(express.json());
app.use('/server/accounts/students', student_account); //학생 회원가입
app.use('/server/accounts/tutors', tutor_account); //튜터 회원가입
app.use('/server/accounts', login); //로그인
app.use('/server/process', proce); //과정 검색 및 신정
app.use('/server/apis', language_data); //과정 검색 및 신정~`

app.listen(app.get('port'), function () {
    console.log('Express server listening on port' + app.get('port'));
})