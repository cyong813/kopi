import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const drinkItem = (props) => (
    <div className='DrinkItem'>
        <Link to={{pathname: '/drink/'+props.drink.drink_name}}>
            <img 
                className='drink-image' 
                src={props.drink.drink_image}
            />
            <div className='drink-title'>
                <h4>{props.drink.drink_name}</h4>
            </div>
        </Link>
    </div>
);

drinkItem.propTypes = {
    drink: PropTypes.object.isRequired
};

export default drinkItem;