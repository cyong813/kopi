import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import UnloggedNavigationItems from '../NavigationItems/UnloggedNavigationItems';
import LoggedNavigationItems from '../NavigationItems/LoggedNavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Navbar = (props) => (
  <header className={props.isAuthed ? ['Navbar','LoggedNavbar'].join(' ') : 'Navbar'}>
    <DrawerToggle 
      clicked={props.drawerToggleClicked}
      isAuthed={props.isAuthed} />
    <div className='Logo'>
      <Logo />
    </div>
    <nav className='DesktopOnly'>
      { props.isAuthed ? 
        <LoggedNavigationItems 
          clicked={props.logout.bind(this)} /> : 
        <UnloggedNavigationItems /> 
      }
    </nav>
  </header>
);

Navbar.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  drawerToggleClicked: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default Navbar;