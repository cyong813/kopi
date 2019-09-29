import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const unloggedNavigationItems = () => (
  <ul className='NavigationItems'>
    <NavigationItem path='/login' name='Login' />
    <NavigationItem path='/register' name='Register' />
  </ul>
);

export default unloggedNavigationItems;
