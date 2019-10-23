import React from 'react';
import { Link } from 'react-router-dom';
import coffeeLogo from '../../assets/images/coffee_icon.png';

const logo = () => (
    <div className='Logo'>
        <Link to='/'>
            <img src={coffeeLogo} alt="Kopi" />
        </Link>
    </div>
);

export default logo;