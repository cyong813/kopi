import React, { Component } from 'react';
import Logo from '../../Logo/Logo';
import UnloggedNavigationItems from '../NavigationItems/UnloggedNavigationItems';
import LoggedNavigationItems from '../NavigationItems/LoggedNavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

class Navbar extends Component {
  render() {
    const isAuthed = localStorage.getItem('jwtToken');

    return (
      <header className={isAuthed ? ['Navbar','LoggedNavbar'].join(' ') : 'Navbar'}>
        <DrawerToggle clicked={this.props.drawerToggleClicked} />
        <div className='Logo'>
          <Logo />
        </div>
        <nav className='DesktopOnly'>
          { isAuthed ? 
            <LoggedNavigationItems 
              clicked={this.props.logout.bind(this)} /> : 
            <UnloggedNavigationItems /> 
          }
        </nav>
      </header>
    )
  }
}

export default Navbar;