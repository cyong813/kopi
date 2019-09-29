import React from 'react';
import { Link } from 'react-router-dom';

const navigationItem = (props) => (
    <li className='NavigationItem'>
        <Link to={props.path}> {props.name} </Link>
    </li>
);

export default navigationItem;