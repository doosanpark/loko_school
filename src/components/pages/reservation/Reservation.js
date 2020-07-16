import React, {useState} from 'react';
import '../../css/Reservation.less'
import {Card} from 'antd';
import PaypalButton from "../apis/payment/PaypalButton";

function Reservation() {

    return (
        <div className={"Reservation"}>
            <div className={"Reservation__Body"}>
                <div id={"title"}>
                    Select your tutor!
                    <PaypalButton/>
                </div>
            </div>
        </div>
    )
}

export default Reservation;