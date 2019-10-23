import React from 'react';
import Button from '../UI/Button/Button';
import FilterSearch from './FilterSearch';

const searchBar = (props) => (
  <div className='search-container'>
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

export default searchBar;