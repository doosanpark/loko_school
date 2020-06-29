import React, {useState} from 'react';
import Value from "./Value";
import Control from "./Control";
import {connect} from "react-redux";

import * as actions from '../redux/actions/action'


function Counter(props) {


    function setRandomColor() {
        const color = [
            Math.floor((Math.random() * 55) + 200),
            Math.floor((Math.random() * 55) + 200),
            Math.floor((Math.random() * 55) + 200),
        ]

        props.handleSetColor(color);
    }

    const color = props.color;
    const style = {
        background: `rgb(${color[0]},${color[1]},${color[2]})`
    };

    return (
        <div style={style}>
            <Value number={props.number}/>
            <Control
                onPlus={props.handleIncrement}
                onSubtract={props.handleDecrement}
                onRandomizeColor={setRandomColor}
            />
        </div>
    )
}

const mapStateToProps = (eReduxState) => {
    return { // 어떤 props가 state의 어떠한 값으로 연결될지 정하는 것
        number: eReduxState.counter.number,
        color: eReduxState.ui.color
    };
}

const mapDispatchToProps = (eReduxDispatch) => {
    return { //action을 dispatch하는 함수를 props로 올려줌
        handleIncrement: () => {
            eReduxDispatch(actions.increment())
        },
        handleDecrement: () => {
            eReduxDispatch(actions.decrement())
        },
        handleSetColor: (color) => {
            eReduxDispatch(actions.setColor(color))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);