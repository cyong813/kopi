import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const unloggedNavigationItems = (props) => (
  <ul className={props.pName === '/' ? ['NavigationItems', 'UnloggedNavItems'].join(' ') : 'NavigationItems'}>
    <NavigationItem path='/login' name='Login' />
    <NavigationItem path='/register' name='Register' />
  </ul>
);

export default unloggedNavigationItems;
