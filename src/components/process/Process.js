import React, {useState} from 'react';
import yuri from '../../css/img/yuri.png';
import teacher from '../../css/img/teacher.png';
import couple from '../../css/img/couple.png';

import '../../css/Process.less'
import 'antd/dist/antd.less';
import {Card, Carousel} from 'antd';
import PaypalButton from "../apis/payment/PaypalButton";
import {Helmet} from "react-helmet";

function Process() {

    const [showPaypal, setShowPaypal] = useState(false);

    const showPaypalButtons = () => {
        setShowPaypal(true);
    };

   /* return <PaypalButton />;*/
    /*if (showPaypal) {
        return <PaypalButton />;
    } else {
        return (
            <div className="main">
                <h2> Buy this Mercedes at a giveaway price (Super Cheap) </h2>
                <h3>
                    <b>$200</b>
                </h3>
                <button onClick={showPaypalButtons}> Pay </button>
            </div>
        );
    }*/

    return(

        <div>
            dd

        </div>

    )

}

export default Process;