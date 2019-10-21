import React from 'react';

const filterSearch = (props) => (
  <div className='adv-search-container'>
    {props.filters.map(filter =>
      <button 
          className='filters'
          onClick={ props.filterHandler.bind(this,filter) }>
        {filter}
      </button>
    )}
  </div>
);

export default filterSearch;