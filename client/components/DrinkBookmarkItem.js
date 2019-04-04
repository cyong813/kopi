import React, { Component } from 'react';
import DrinkItem from '../layout/DrinkItem';
import DeleteBookmark from './DeleteBookmark';

class DrinkBookmarkItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='DrinkBookmarkItem'>
                <DrinkItem key={this.props.dbkmk._id} drink={this.props.dbkmk}/>
                <DeleteBookmark id={this.props.dbkmk._id} bookmark={this.props.dbkmk} />
            </div>
        )
    }
}

export default DrinkBookmarkItem;