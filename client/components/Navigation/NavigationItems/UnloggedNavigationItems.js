import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const unloggedNavigationItems = (props) => (
  <ul className={window.location.pathname === '/' ? ['NavigationItems', 'UnloggedNavItems'].join(' ') : 'NavigationItems'}>
    <NavigationItem path='/login' name='Login' sideNav={props.sideNav} />
    <NavigationItem path='/register' name='Register' sideNav={props.sideNav} />
  </ul>
);

export default unloggedNavigationItems;
