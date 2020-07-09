import React, {useState} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    number: PropTypes.number
}

const defaultProps = {
    number: -1
}

function Value(props) {

    return (
        <div>
            <h1>{props.number}</h1>
        </div>
    )
}


Value.propTypes = propTypes;
Value.defaultProps = defaultProps;

export default Value;