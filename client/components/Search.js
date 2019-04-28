import React, { Component } from 'react';
import AdvancedSearch from './AdvancedSearch';

class Search extends Component {
    render() {
      return (
        <div className='search-container'>
          <input 
            type='text' 
            placeholder='⌕' 
            onChange={this.props.changeHandler} />
          <AdvancedSearch/>
        </div>
      )
    }
}

export default Search;