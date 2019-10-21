import React from 'react';

// credits: https://codepen.io/baillieogrady/pen/JJvEqO
const spinner = () => (
    <div className='full_screen'>
        <div className='coffee_container'>
            <div className='coffee_mug'>
                <div className='steam'></div>
                <div className='steam1'></div>
                <div className='steam2'></div>
            </div>
            <p>loading</p>
        </div>
    </div>
);

export default spinner;