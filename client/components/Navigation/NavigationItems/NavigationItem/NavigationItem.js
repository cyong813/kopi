import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const navigationItem = (props) => (
    <li className={props.sideNav === 'SideNavItem' ? ['NavigationItem', 'SideNavItem'].join(' ') : 'NavigationItem'}>
        <Link to={props.path}> {props.name} </Link>
    </li>
);

navigationItem.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default navigationItem;