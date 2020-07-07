import React, {useEffect} from 'react';
import '../../css/Home.less'

import { Carousel } from 'antd';
import 'antd/dist/antd.less';
import {connect} from "react-redux";

function Home() {

    return(
        <div className={"Home"}>
            <div className={"Home__img"}>
                <div style={{width: 800, textAlign: "left", fontSize: '30px', marginTop: 130, marginLeft: 100, lineHeight: '40px'}}>
                    1:1 Online Tutor
                </div>
                <div style={{width: 800, fontWeight: 'bold', textAlign: "left", fontSize: '45px', marginTop: 15, marginLeft: 100, lineHeight: '55px'}}>
                    The intersection of <br/>
                    Korean Culture and Language
                </div>
                <div style={{width: 700, textAlign: "left", fontSize: '25px', marginTop: 50, marginLeft: 100}}>

                    Meet <span style={{fontWeight: 'bold'}}>1:1 Live Online Tutoring Service</span> with <br/>College Students majoring in Korean, Loko School.<br/>


                    <button id={"Home__detail"} >Book Now!</button>
                </div>
            </div>

            <Carousel autoplay>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
            </Carousel>
        </div>
    )
}

export default Home;
