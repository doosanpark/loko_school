import React, {useEffect} from 'react';
import '../../css/Home.less'

import {Carousel} from 'antd';
import 'antd/dist/antd.less';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function Home() {

    return (
        <div className={"Home"}>
            <div className={"Home__img"}>
                <div style={{
                    width: '80rem',
                    fontSize: '3rem',
                    textAlign: "left",
                    marginTop: '13rem',
                    marginLeft: '10rem',
                    lineHeight: '4rem'
                }}>
                    1:1 Online Tutor
                </div>
                <div style={{
                    width: '80rem',
                    fontWeight: 'bold',
                    textAlign: "left",
                    fontSize: '4.5rem',
                    marginTop: '1.5rem',
                    marginLeft: '10rem',
                    lineHeight: '5.5rem'
                }}>
                    The intersection of <br/>
                    Korean Culture and Language
                </div>
                <div style={{width: '70rem', textAlign: "left", fontSize: '2.5rem', marginTop: '5rem', marginLeft: '10rem'}}>

                    Meet <span style={{fontWeight: 'bold'}}>1:1 Live Online Tutoring Service</span> with <br/>College
                    Students majoring in Korean, Loko School.<br/>

                    <Link to={"/reservation"}>
                        <button id={"Home__detail"}>Book Now!</button>
                    </Link>
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
