import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DrinkItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='DrinkItem'>
                <Link to={{pathname: '/drink/'+this.props.drink.drink_name}}>
                    {/* <img className='drink-image'/> */}
                    <div className='drink-title'>
                        <h4>{this.props.drink.drink_name}</h4>
                    </div>
                </Link>
            </div>
        )
    }
}

export default DrinkItem;