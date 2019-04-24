import React, { Component } from 'react';

class Search extends Component {
    render() {
      return (
        <div className='search-container'>
          <input 
            type='text' 
            placeholder='⌕' 
            onChange={this.props.changeHandler} />
        </div>
      )
    }
}

export default Search;