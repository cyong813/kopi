import React from 'react';
import PropTypes from 'prop-types';

const categories = [
  '','American', 'Filipino'
];

const filterSearch = (props) => (
  <div className='filter-container'>
    { Object.keys(props.filters).map((filter, i) => (
      <button 
        className={ props.filters[filter] ? 'clickedFilter' : 'filter' }
        onClick={ props.filterHandler.bind(this,filter) }>
          { props.formattedFilters[i] }
      </button>
    )) }
    <select className='categories' value={ props.currentCategory } onChange={ props.categoryHandler }>
      { 
        categories.map(category => (
          <option value={category}>{ category }</option>
      )) }
    </select>
  </div>
);

filterSearch.propTypes = {
  filters: PropTypes.object.isRequired,
  formattedFilters: PropTypes.array.isRequired,
  filterHandler: PropTypes.func.isRequired,
  categoryHandler: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired
};

export default filterSearch;