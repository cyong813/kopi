import React, { Component } from 'react';

class Search extends Component {
    render() {
      return (
        <div className='search-container'>
          <label>Search</label>
          <input type='text' onChange={this.props.changeHandler} />
        </div>
      )
    }
}

export default Search;