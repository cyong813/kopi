import React from 'react';
import DrinkItem from '../../Drink/DrinkItem/DrinkItem';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

const drinkBookmarkItem = (props) => (
    <div className='DrinkBookmarkItem'>
        <DrinkItem drink={props.drink}/>
        <Button btnType={props.type} clicked={props.clicked}>x</Button>
    </div>
);

drinkBookmarkItem.propTypes = {
    drink: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    clicked: PropTypes.func.isRequired
};

export default drinkBookmarkItem;