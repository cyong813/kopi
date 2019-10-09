import React from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar';

const Layout = (props) => (
    <React.Fragment>
        <Navbar />
        <main className='Content'>
            {props.children}
        </main>
    </React.Fragment>
);

export default Layout;