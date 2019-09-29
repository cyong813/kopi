import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../assets/images/coffee_icon.png';
import PropTypes from 'prop-types';

class Navbar extends Component {
  handleLogout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    const isAuthed = localStorage.getItem('jwtToken');

    const loggedInLinks = (
      <ul className='navlinks'>
        <li>
          <Link to={{pathname: '/bookmarks'}}> Bookmarks </Link>
        </li>
        <li>
          <Link to={{pathname: '/cafes'}}> Cafes </Link>  
        </li>
        <li>
          <Link to={{pathname: '/drinks'}}> Drinks </Link>          
        </li>
        <li>
          <a
            href="#"
            onClick={this.handleLogout}
            className="button button-black">
            Logout
          </a>
        </li>
      </ul>
    )

    const loggedOutLinks = (
      <ul className = 'navlinks'>
        <li>
          <Link to={{pathname: '/login'}}> Login </Link>
        </li>
        <li>
          <Link to={{pathname: '/register'}}> Register </Link>
        </li>
      </ul>
    )

    return (
      <div className='Navbar'>
        <header className='max-width'>
          <div className='logo'>
            <Link to='/'>
              <img className='navbar-logo' src={Logo} alt="kopi"></img>
            </Link>
          </div>
          <nav className='desktop-nav'>
            { isAuthed ? loggedInLinks : loggedOutLinks}
          </nav>
        </header>
      </div>
    )
  }
}

export default Navbar;