import React from 'react';
import 'src/css/Reservation.less'
import PaypalButton from "src/components/apis/payment/PaypalButton";

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