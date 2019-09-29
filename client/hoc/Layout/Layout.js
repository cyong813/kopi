import React, {Component} from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar';

class Layout extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <main className='Content'>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;