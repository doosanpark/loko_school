import React, {useState} from 'react';
import yuri from '../../css/img/yuri.png';
import teacher from '../../css/img/teacher.png';
import couple from '../../css/img/couple.png';

import '../../css/Process.less'
import 'antd/dist/antd.less';
import {Card, Carousel} from 'antd';


function Process() {
    return (
        <div className={"Process"}>
            <Card className={"Process__Info"}>
                dd
            </Card>


            {/*
            <Carousel
                className={"Process__Carousel"}
                dotPosition={"top"}
                autoplay
            >
                <div className={"Process__Carousel-div"}>
                    <img style={{margin: 0, width: "100%"}} src={yuri}/>
                </div>
                <div className={"Process__Carousel-div"}>
                    <img style={{margin: 0, width: "100%"}} src={couple}/>
                </div>
                <div className={"Process__Carousel-div"}>
                    <img style={{margin: 0, width: "100%"}} src={teacher}/>
                </div>
            </Carousel>*/}
        </div>
    )
}

export default Process;