import React, {useState} from 'react';
import '../../css/Reservation.less'
import {Card} from 'antd';

function Reservation() {

    return (
        <div className={"Reservation"}>
            <div className={"Reservation__Body"}>
                <div id={"title"}>
                    Select your tutor!
                </div>
            </div>
        </div>
    )
}

export default Reservation;