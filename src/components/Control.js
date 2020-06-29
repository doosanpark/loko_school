import React, {useState} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onPlus: PropTypes.func,
    onSubtract: PropTypes.func,
    onRandomizeColor: PropTypes.func
}

function createWarning(funcName){
    return () => console.warn(funcName + ' is not defined');
}

const defaultProps = {
    onPlus: createWarning('onPlus'),
    onSubtract: createWarning('onSubtract'),
    onRandomizeColor: createWarning('onRandomizeColor')
}

function Control(props) {

    return (
        <div>
            <button onClick={props.onPlus}>+</button>
            <button onClick={props.onSubtract}>-</button>
            <button onClick={props.onRandomizeColor}>Randomize Color</button>
        </div>
    )
}

Control.propTypes = propTypes;
Control.defaultProps = defaultProps;

export default Control;
