import React from 'react';
import { Link } from 'react-router-dom';

const cafeItem = (props) => (
    <div className='CafeItem'>
        <Link to={{pathname: '/cafe/'+props.cafe.cafe_name}}>
            <div className='cafe-title'>
                <h4>{props.cafe.cafe_name}</h4>
            </div>
        </Link>
    </div>
);

export default cafeItem;