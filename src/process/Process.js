import React, {useState} from 'react';
import yuri from './img/yuri.png';
import teacher from './img/teacher.png';
import couple from './img/couple.png';

import './css/Process.less'
import 'antd/dist/antd.less';
import {Card, Carousel} from 'antd';


function Process() {
    return (
        <div className={"Process"}>
            <Card className={"Process__Info"}>
                dd
            </Card>
            <Carousel
                className={"Process__Carousel"}
                dotPosition={"top"}
                /*effect={"fade"}*/
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
            </Carousel>
        </div>
    )
}

export default Process;