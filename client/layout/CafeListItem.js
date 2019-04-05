import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CafeListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='CafeItem'>
                <Link to={{pathname: '/cafe/'+this.props.cafe.cafe_name}}>
                    <div className='cafe-title'>
                        <h4>{this.props.cafe.cafe_name}</h4>
                    </div>
                </Link>
            </div>
        )
    }
}

export default CafeListItem;