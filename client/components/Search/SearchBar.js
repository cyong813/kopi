import React from 'react';
import Button from '../UI/Button/Button';
import FilterSearch from './FilterSearch';

const searchBar = (props) => (
  <div className='search-container'>
    <form class="form-signin" onSubmit={ props.submitHandler }>
      <input 
          type='text' 
          placeholder='Enter a cafe...' 
          onChange={ props.changeHandler } required />
      <Button btnType='Main'>⌕</Button>
    </form>
    <FilterSearch
      filters={ props.filterList }
      filterHandler={ props.filterHandler } />
  </div>
);

export default searchBar;