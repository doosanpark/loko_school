import React from 'react';
import 'src/css/Footer.less'
import {Divider} from "antd";

function Footer() {


    return (
        <div className={"Footer"}>
            <Divider style={{margin: "2rem 0"}}/>
            <div className={"Footer__Content"}>
                상호명 LOKOSCHOOL | 사업자등록번호 111-11-11111 | 통신판매신고번호 2019-서울관악구-12345 <br/>
                대표전화 010-6609-8663 | 주소 서울특별시 강서구 수명로2가길 (707동, 802호) <br/>
                대표이사 박유리
            </div>
        </div>
    )
}

export default Footer;