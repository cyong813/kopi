import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        console.log('closed')
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        console.log('toggle')
        this.setState({showSideDrawer: !this.state.showSideDrawer });
    };

    render() {
        return (
            <React.Fragment>
                <Navbar 
                    pName={ this.props.pName }
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
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