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
          name='searchField'
          value={ props.searchValue }
          onChange={ props.changeHandler } required />
      <Button btnType='Main'>⌕</Button>
    </form>
    <FilterSearch
      currentCategory={ props.currentCategory }
      categoryHandler={ props.categoryHandler }
      filterHandler={ props.filterHandler }
      filters={ props.filters }
      formattedFilters={ props.formattedFilters } />
  </div>
);

searchBar.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  formattedFilters: PropTypes.array.isRequired,
  filterHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  categoryHandler: PropTypes.func.isRequired
};

export default searchBar;