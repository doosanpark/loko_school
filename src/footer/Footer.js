import React from 'react';
import './css/Footer.less'
import {Divider} from "antd";

function Footer() {


    return (
        <div className={"Footer"}>
            <Divider style={{margin: "20px"}}/>
            <div className={"Footer__Content"}>
                상호명 LOKOSCHOOL | 사업자등록번호 111-11-11111 | 통신판매신고번호 2019-서울관악구-12345 <br/>
                대표전화 010-6609-8663 | 주소 서울특별시 관악구 복은4길 25 (광신서원, 206호). <br/>
                대표이사 박유리

            </div>
        </div>
    )
}

export default Footer;