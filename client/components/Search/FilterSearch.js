import React from 'react';

const filterSearch = (props) => (
  <div className='filter-container'>
    { Object.keys(props.filters).map((filter,i) => (
      <button 
        className={ props.filters[filter] ? 'clickedFilter' : 'filter' }
        onClick={ props.filterHandler.bind(this,filter) }>
          { props.formattedFilters[i] }
      </button>
    )) }
  </div>
);

export default filterSearch;