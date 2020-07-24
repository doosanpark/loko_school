var express = require('express');
var pool = require('../../database.js');

/*
* 사용 규칙
* 1. arg의 첫 번째에 검색 데이터 종류 입력
* - 종류1. tutor_info
* */

async function searchFromMysql(arg) {
    // arg_cols = [conn, search_key, table, col, search_col ];

    let {typeOfSearch} = arg;

    switch (typeOfSearch) {
        case 'tutorInfo':
            return await getTutorInfoFromRelatedInfoTables(arg);
            break;
        case 'relatedInfo':
            return await getRelatedInfoFromLinkedTables(arg);
            break;

    }
}

async function getRelatedInfoFromLinkedTables(arg) {

    try{

        // 링크를 주관하는 테이블로부터 related 테이블들의 id를 추출
        var rowsId = await getData(arg);
        console.log("rowsId", rowsId);

        // id 리스트
        let idList = Array.from(rowsId, x => Object.values(x));

        // linked_tables로부터 연관 정보 테이블과 관련된 테이블 추출
        var tableNameAssociatedTag = await getData({
            searchKey: arg.tableName,
            tableName: 'linked_tables',
            colNameForTake: 'a_table',
            colNameForSearch: 'b_table'
        });

        let tbName = Object.values(tableNameAssociatedTag[0])[0];

        // related 테이블들의 id로부터 related info를 추출
        var result = await getData({
            searchKey: idList,
            tableName: tbName,
            colNameForTake: '*',
            colNameForSearch: 'id'
        });

        return result;

    } catch (e) {
        console.log('Error while performing Query.', e);
    }
}

async function getTutorInfoFromRelatedInfoTables(arg) {

    try {
        // 태깅 테이블로부터 id 추출
        var rowsId = await getSimilarData(arg);

        // tutor 연관 테이블들의 id 리스트
        let idList = Array.from(rowsId, x => Object.values(x));

        // linked_tables로부터 연관 정보 테이블과 관련된 테이블 추출
        var tableNameAssociatedTag = await getData({
            searchKey: arg.tableName,
            tableName: 'linked_tables',
            colNameForTake: 'b_table',
            colNameForSearch: 'a_table'
        });

        let tbName = Object.values(tableNameAssociatedTag[0])[0];

        // 연관 정보 테이블과 관련된 테이블로부터 mem_id 추출
        var memIds = await getData({
            searchKey: idList,
            tableName: tbName,
            colNameForTake: 'mem_id',
            colNameForSearch: arg.linkId
        });

        return memIds;
    } catch (e) {
        console.log('Error while performing Query.', e);
    }
}

async function getData(arg) {

    try {
        var conn = await pool.getConnection();
        var {searchKey, tableName, colNameForSearch, colNameForTake} = arg;

        console.log("getDataQuerry", `SELECT ${colNameForTake} FROM ${tableName} WHERE ${colNameForSearch} IN (${searchKey})`);
        var sql = `SELECT ${colNameForTake} FROM ${tableName} WHERE ${colNameForSearch} IN (?) `;
        var rows = await conn.query(sql, [searchKey]);

        console.log("rows[0]", rows[0]);

        return rows[0];
    } catch (e) {
        console.log('Error while performing Query.', e);
    }
}

async function getSimilarData(arg) {
    try {
        var conn = await pool.getConnection();

        var {searchKey, tableName, colNameForSearch, colNameForTake} = arg;

/*
        console.log("getSimilarData query", `SELECT ${colNameForTake} FROM ${tableName} WHERE ${colNameForSearch} LIKE ${searchKey} \n` +
            `ORDER BY CASE WHEN ${colNameForTake} = ${"%" + searchKey + "%"} THEN 0 \n` +
            `              WHEN ${colNameForTake} = ${searchKey} THEN 1 \n` +
            `              WHEN ${colNameForTake} = ${ searchKey + "%"} THEN 2 \n` +
            `              WHEN ${colNameForTake} = ${"%" + searchKey + "%"} THEN 3 \n` +
            `              ELSE 4 \n` +
            `          END \n` +
            `LIMIT 6 `);
*/

        // 유사한 단어들의 id 추출
        var sql = `SELECT ${colNameForTake} FROM ${tableName} WHERE ${colNameForSearch} LIKE ? \n` +
            `ORDER BY CASE WHEN ${colNameForTake} = ? THEN 0 \n` +
            `              WHEN ${colNameForTake} = ? THEN 1 \n` +
            `              WHEN ${colNameForTake} = ? THEN 2 \n` +
            `              WHEN ${colNameForTake} = ? THEN 3 \n` +
            `              ELSE 4 \n` +
            `          END \n` +
            `LIMIT 6 `;

        var params = ["%" + searchKey + "%", searchKey, searchKey + "%", "%" + searchKey + "%", "%" + searchKey];
        var rows = await conn.query(sql, params);
        /*console.log("getSimilarData", rows[0]);*/
        return rows[0];
    } catch (e) {
        console.log('Error while performing Query.', e);
    }
}

exports.getData = getData;
exports.searchFromMysql = searchFromMysql;
exports.getSimilarData = getSimilarData;
