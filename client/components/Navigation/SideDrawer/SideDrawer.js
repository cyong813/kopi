import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import LoggedNavigationItems from '../NavigationItems/LoggedNavigationItems';
import UnloggedNavigationItems from '../NavigationItems/UnloggedNavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = ['SideDrawer','Close'];
    if (props.open) {
        attachedClasses = ['SideDrawer','Open'];
    }

    const isAuthed = localStorage.getItem('jwtToken');

    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className='SideDrawerLogo'>
                    <Logo />
                </div>
                <nav>
                    { isAuthed ? 
                        <LoggedNavigationItems clicked={props.logout.bind(this)} /> : 
                        <UnloggedNavigationItems sideNav='SideNavItem' /> 
                    }
                </nav>
            </div>
        </React.Fragment>
    );
};

sideDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    closed: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};

export default sideDrawer;