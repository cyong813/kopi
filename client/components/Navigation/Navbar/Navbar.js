import React, { Component } from 'react';
import Logo from '../../Logo/Logo';
import UnloggedNavigationItems from '../NavigationItems/UnloggedNavigationItems';
import LoggedNavigationItems from '../NavigationItems/LoggedNavigationItems';
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  handleLogout() {
    localStorage.removeItem('jwtToken');
    this.props.history.push('/login');
  }

  render() {
    const isAuthed = localStorage.getItem('jwtToken');

    return (
      <header className='Navbar'>
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

export default withRouter(Navbar);