import React from 'react';
import classes from './Layout.scss';

const layout = ( props ) => (
    <React.Fragment>
        <div>Toolbar, SideDrawer</div>
        <main className={classes}>
            {props.children}
        </main>
    </React.Fragment>
);

export default layout;