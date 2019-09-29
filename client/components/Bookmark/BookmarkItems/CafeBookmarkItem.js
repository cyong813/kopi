import React from 'react';
import CafeItem from '../../Cafe/CafeItem';
import DeleteBookmark from '../../../containers/Bookmarks/DeleteBookmark';

const cafeBookmarkItem = (props) => (
    <div className='CafeBookmarkItem'>
        <CafeItem key={props.cbkmk._id} cafe={props.cbkmk}/>
        <DeleteBookmark id={props.cbkmk._id} bookmark={props.cbkmk} />
    </div>
);

export default cafeBookmarkItem;