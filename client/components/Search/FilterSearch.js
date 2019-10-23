import React from 'react';
import PropTypes from 'prop-types';

const filterSearch = (props) => (
  <div className='filter-container'>
    { Object.keys(props.filters).map((filter, i) => (
      <button 
        className={ props.filters[filter] ? 'clickedFilter' : 'filter' }
        onClick={ props.filterHandler.bind(this,filter) }>
          { props.formattedFilters[i] }
      </button>
    )) }
  </div>
);

filterSearch.propTypes = {
  filters: PropTypes.object.isRequired,
  formattedFilters: PropTypes.array.isRequired,
  filterHandler: PropTypes.func.isRequired
};

export default filterSearch;