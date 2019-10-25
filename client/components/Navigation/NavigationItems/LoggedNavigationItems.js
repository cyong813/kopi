import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import PropTypes from 'prop-types';

const loggedNavigationItems = (props) => (
  <ul className='NavigationItems'>
    <NavigationItem path='/bookmarks' name='Bookmarks' sideNav='SideNavItem' />
    <NavigationItem path='/cafes' name='Cafes' sideNav='SideNavItem' />
    <NavigationItem path='/drinks' name='Drinks' sideNav='SideNavItem' />
    <li className={['NavigationItem', 'SideNavItem'].join(' ')}>
      <a
        href="#"
        onClick={props.clicked}
        className="button button-black">
        Logout
      </a>
    </li>
  </ul>
);

loggedNavigationItems.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default loggedNavigationItems;