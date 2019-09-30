import React from 'react';
import DrinkItem from '../../Drink/DrinkItem/DrinkItem';
import Button from '../../UI/Button/Button';

const drinkBookmarkItem = (props) => (
    <div className='DrinkBookmarkItem'>
        <DrinkItem drink={props.drink}/>
        <Button btnType={props.type} clicked={props.clicked}>x</Button>
    </div>
);

export default drinkBookmarkItem;