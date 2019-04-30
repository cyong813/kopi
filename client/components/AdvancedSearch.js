import React, { Component } from 'react';
import { withRouter } from "react-router";

class AdvancedSearch extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      filters: {
        'credit_card': false,
        'good_for_working': false,
        'restroom': false,
        'wifi': false
      }
    };
  }

  filterHandler(filter) {
    let convertedFilter = filter.toLowerCase().replace(/ /g, '_');
    let result = this.state.filters;
    result[convertedFilter] = true;
    let trueFilters = Object.keys(result).filter(function(key) {
      return result[key];
    });
    this.setState({ filters: result });
    this.props.history.push({
      pathname: '/cafes',
      search: '?query='+trueFilters
    });
  }

  render() {
    const filters = Object.keys(this.state.filters).map(function(item) {
      return item.replace(/_{1,}/g,' ').replace(/(\s{1,}|\b)(\w)/g, function(m, space, letter) {
        return space + letter.toUpperCase();
      });
    }, this);
    return (
      <div className='adv-search-container'>
        {filters.map(filter =>
          <button 
            className='filters'
            onClick={this.filterHandler.bind(this,filter)}>
            {filter}
          </button>
        )}
      </div>
    )
  }
}

export default withRouter(AdvancedSearch);