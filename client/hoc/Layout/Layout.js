import React from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import PropTypes from 'prop-types';

const Layout = (props) => (
    <React.Fragment>
        <Navbar />
        <main className='Content'>
            {props.children}
        </main>
    </React.Fragment>
);

Layout.propTypes = {
    children: PropTypes.element.isRequired
};

export default Layout;