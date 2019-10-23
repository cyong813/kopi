import React from 'react';
import CafeItem from '../../Cafe/CafeItem/CafeItem';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

const cafeBookmarkItem = (props) => (
    <div className='CafeBookmarkItem'>
        <CafeItem cafe={props.cafe}/>
        <Button btnType={props.type} clicked={props.clicked}>x</Button>
    </div>
);

cafeBookmarkItem.propTypes = {
    cafe: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    clicked: PropTypes.func.isRequired
};

export default cafeBookmarkItem;