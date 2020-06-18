import React from 'react';
import './css/Home.less'

import { Carousel } from 'antd';
import 'antd/dist/antd.less';

function Home() {
    return(
        <div className={"Home"}>
            <div className={"Home__img"}>
                <div style={{width: 800, fontWeight: 'bold', textAlign: "left", fontSize: '50px', marginTop: 130}}>
                    2020. March.<br/>
                    "Why that lyrics made you cry?"
                </div>
                <div style={{width: 650, textAlign: "left", fontSize: '15px', marginTop: 80}}>
                    Learning only what others forced you to do never stay in you long . <br/>
                    Study Korean words & expressions that you look up for. Answer to your Journal question and get a language
                    feedback from your Private Local Korean study mate who have a similar interest with you, who genuinely understand you.<br/>
                    Our study mates are young, warm, wise, and love K-culture.<br/>
                    <button id={"Home__detail"} >More Details</button>
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
