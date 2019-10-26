import React from 'react';
import PropTypes from 'prop-types';

const drawerToggle = (props) => (
    <div
        className={ window.location.pathname === '/' && !props.isAuthed ? 
                    ['DrawerToggle', 'UnloggedDrawerToggle'].join(' ') : 
                    ['DrawerToggle', 'LoggedDrawerToggle'].join(' ') }
        onClick={ props.clicked }>
            <div></div>
            <div></div>
            <div></div>
    </div>
);

drawerToggle.propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    clicked: PropTypes.func.isRequired
};

export default drawerToggle;