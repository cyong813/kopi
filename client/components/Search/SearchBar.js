import React from 'react';
import Button from '../UI/Button/Button';
import FilterSearch from './FilterSearch';
import PropTypes from 'prop-types';

const searchBar = (props) => (
  <div className='SearchBar'>
    <form class="form-signin" onSubmit={ props.submitHandler }>
      <input 
          type='text' 
          placeholder='Enter a cafe...'
          value={ props.searchValue }
          onChange={ props.changeHandler } required />
      <Button btnType='Main'>⌕</Button>
    </form>
    <FilterSearch
      filterHandler={ props.filterHandler }
      filters={ props.filters }
      formattedFilters={ props.formattedFilters } />
  </div>
);

searchBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  formattedFilters: PropTypes.array.isRequired,
  filterHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired
};

export default searchBar;