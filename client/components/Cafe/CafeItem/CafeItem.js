import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cafeItem = (props) => (
    <div className='CafeItem'>
        <Link to={{pathname: '/cafe/'+props.cafe.cafe_name}}>
            <div className='cafe-title'>
                <h4>{props.cafe.cafe_name}</h4>
            </div>
        </Link>
    </div>
);

cafeItem.propTypes = {
    cafe: PropTypes.object.isRequired
};

export default cafeItem;