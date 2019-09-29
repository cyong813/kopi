import React from 'react';
import coffeeLogo from '../../assets/images/coffee_icon.png';
import classes from './Logo.scss';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={coffeeLogo} alt="Kopi" />
    </div>
);

export default logo;