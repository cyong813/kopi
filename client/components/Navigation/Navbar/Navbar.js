import React, { Component } from 'react';
import Logo from '../../Logo/Logo';
import UnloggedNavigationItems from '../NavigationItems/UnloggedNavigationItems';
import LoggedNavigationItems from '../NavigationItems/LoggedNavigationItems';

class Navbar extends Component {
  handleLogout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    const isAuthed = localStorage.getItem('jwtToken');

    return (
      <header className={isAuthed ? ['Navbar','LoggedNavbar'].join(' ') : 'Navbar'}>
        <div className='Logo'>
          <Logo />
        </div>
        <nav className='DesktopOnly'>
          { isAuthed ? <LoggedNavigationItems clicked={this.handleLogout.bind(this)} /> : <UnloggedNavigationItems/> }
        </nav>
      </header>
    )
  }
}

export default Navbar;