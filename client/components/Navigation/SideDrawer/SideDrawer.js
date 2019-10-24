import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/LoggedNavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = ['SideDrawer','Close'];
    if (props.open) {
        attachedClasses = ['SideDrawer','Open'];
    }

    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className='SideDrawerLogo'>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;