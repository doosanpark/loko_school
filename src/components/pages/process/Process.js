import React, {useEffect, useState} from 'react';
import yuri from '../../css/img/yuri.png';
import teacher from '../../css/img/teacher.png';
import couple from '../../css/img/couple.png';

import '../../css/Process.less'
import 'antd/dist/antd.less';
import {Card, Carousel} from 'antd';
import PaypalButton from "../apis/payment/PaypalButton";
import {Helmet} from "react-helmet";
import axios from "axios";

function Process() {

    const [showPaypal, setShowPaypal] = useState(false);
    const [tutorInfo, setTutorInfo] = useState();

    const showPaypalButtons = () => {
        setShowPaypal(true);
    };

    useEffect(() => {
        axios.post('http://localhost:3001/process/get_tutor_info')
            .then(function (response) {
                setTutorInfo(response.data);
                console.log("tutorInfo", response.data);
            }).catch(function (error) {
        });
    }, []);

    function showTutorInfo() {

        return (
            tutorInfo.map(
                info =>
                    <div>
                        dd
                        {info}
                    </div>
            )
        )
    }

    return (

        <div>
            {showTutorInfo}
        </div>

    )

}

export default Process;