import React from 'react';
import PropTypes from 'prop-types';

const button = (props) => (
    <button 
        className={['Button', props.btnType].join(' ')}
        onClick={props.clicked}>{props.children}
    </button>
);

button.propTypes = {
    btnType: PropTypes.string.isRequired,
    clicked: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

export default button;