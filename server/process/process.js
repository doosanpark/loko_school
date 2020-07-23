var express = require('express');
var router = express.Router();
var search = require('../apis/search/search');
var pool = require('../database.js');

//로그인 시 id, password 체크
router.post('/get_tutor_info', async (req, res, next) => {
    /*console.log("req", req.body.email);*/
    try {
        var conn = await pool.getConnection();


        var {tag, lang, category} = req.body;
        lang = 'korean';

        let memIds_possible_lang = await search.searchFromMysql({
            typeOfSearch: 'tutorInfo',
            searchKey: lang,
            tableName: 'tutor_possible_lang',
            colNameForTake: 'id',
            colNameForSearch: 'lang',
            linkId: 'lang_id'
        });

        category = 'Movie';

        let memIds_categories = await search.searchFromMysql({
            typeOfSearch: 'tutorInfo',
            searchKey: category,
            tableName: 'tutor_categories',
            colNameForTake: 'id',
            colNameForSearch: 'category',
            linkId: 'cat_id'
        });

        // 검색 결과에 맞는 모든 id값들
        var ids = memIds_possible_lang.concat(memIds_categories);

        // 각각의 객체에서 value를 추출하여 배열로 저장
        ids = Array.from(ids, x => Object.values(x).toString());

        // 중복 제거 후 최종 member_id 리스트 추출
        ids = Array.from(new Set(ids));

        console.log("---------------------------------------------");


        let resultTutorTagInfo = await search.searchFromMysql(
            {
                typeOfSearch: 'relatedInfo',
                searchKey: ids,
                tableName: 'connect_tutor_tag',
                colNameForTake: 'tag_id',
                colNameForSearch: 'mem_id',
            }
        )



        console.log("resultTutorTagInfo", resultTutorTagInfo);

/*
        let resultTutorLangInfo = await search.searchFromMysql(
            {

                typeOfSearch: 'relatedInfo',
                searchKey: ids,
                tableName: 'connect_tutor_lang',
                colNameForTake: 'lang_id',
                colNameForSearch: 'mem_id',

            }
        )

        let resultTutorCategoryInfo = await search.searchFromMysql(
            {

                typeOfSearch: 'relatedInfo',
                searchKey: ids,
                tableName: 'connect_tutor_category',
                colNameForTake: 'cat_id',
                colNameForSearch: 'mem_id',

            }
        )

        let result_tutor_info = await search.getData({
            searchKey: ids,
            tableName: 'members',
            colNameForTake: 'last_name, first_name, country',
            colNameForSearch: 'id'
        });
*/

        /*console.log("result", result);*/

        return res.send("succeed");
    } catch (err) {
        console.log('Error while performing Query.', err);
    }
});

module.exports = router;