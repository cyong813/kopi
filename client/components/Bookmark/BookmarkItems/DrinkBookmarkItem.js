import React from 'react';
import DrinkItem from '../../Drink/DrinkItem/DrinkItem';
import DeleteBookmark from '../../../containers/Bookmarks/DeleteBookmark';

const drinkBookmarkItem = (props) => (
    <div className='DrinkBookmarkItem'>
        <DrinkItem key={props.dbkmk._id} drink={props.dbkmk}/>
        <DeleteBookmark id={props.dbkmk._id} bookmark={props.dbkmk} />
    </div>
);

export default drinkBookmarkItem;