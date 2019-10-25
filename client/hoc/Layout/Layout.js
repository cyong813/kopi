import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => ({
            showSideDrawer: !prevState.showSideDrawer 
        }));
    };

    handleLogout() {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    logout={this.handleLogout} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    logout={this.handleLogout} />
                <main className='Content'>
                    { this.props.children }
                </main>
            </React.Fragment>
        )
    }
};

Layout.propTypes = {
    children: PropTypes.element.isRequired,
    pName: PropTypes.string.isRequired
};

export default Layout;