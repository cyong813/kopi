import React from 'react';
import CafeItem from '../../Cafe/CafeItem/CafeItem';
import Button from '../../UI/Button/Button';

const cafeBookmarkItem = (props) => (
    <div className='CafeBookmarkItem'>
        <CafeItem cafe={props.cafe}/>
        <Button btnType={props.type} clicked={props.clicked}>x</Button>
    </div>
);

export default cafeBookmarkItem;