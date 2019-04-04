import React, { Component } from 'react';
import CafeItem from '../layout/CafeItem';
import DeleteBookmark from './DeleteBookmark';

class CafeBookmarkItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='CafeBookmarkItem'>
                <CafeItem key={this.props.cbkmk._id} cafe={this.props.cbkmk}/>
                <DeleteBookmark id={this.props.cbkmk._id} bookmark={this.props.cbkmk} />
            </div>
        )
    }
}

export default CafeBookmarkItem;