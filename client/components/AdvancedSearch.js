import React, { Component } from 'react';
import { withRouter } from "react-router";
import axios from 'axios';
import CafeItem from '../layout/CafeItem';

class AdvancedSearch extends Component {
  constructor() {
    super()
    this.state = {
      all_cafes: [],
      data: [],
      filters: {
        'credit_card': false,
        'good_for_working': false,
        'restroom': false,
        'wifi': false
      },
      filterTags: [],
      loading: true
    };

    this.getAllCafes = this.getAllCafes.bind(this);
  }

  filterHandler(filter) {
    let convertedFilter = filter.toLowerCase().replace(/ /g, '_');
    let result = this.state.filters;
    if (!result[convertedFilter]) {
      result[convertedFilter] = true;
    }
    else {
      result[convertedFilter] = false;
    }
    let trueFilters = Object.keys(result).filter(function(key) {
      return result[key];
    });
    this.setState({ filters: result, filterTags: trueFilters });
    this.props.history.push({
      pathname: '/cafes',
      search: '?query='+trueFilters
    });
    
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/filteredCafes/'+this.props.location.search)
      .then((response) => {
        console.log(response.data.filteredCafes);
        this.setState({ data: response.data.filteredCafes, loading: false });
    });
  }

  getAllCafes(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/getAllCafeNames')
      .then(function(response) {
        event.setState({all_cafes: response.data, loading: false});
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   this.props.history.push("/login");
        // }
    });
  }

  componentDidMount() {
    this.getAllCafes(this);
  }

  componentDidUpdate(prevState) {
    // if (this.state.filterTags !== prevState.filterTags) {
    //   console.log("workin");
    //   axios.get('/api/filteredCafes/'+this.props.location.search)
    //     .then((response) => {
    //       this.setState({ data: response.data.cafes_names });
    //   });
    // }
  }

  render() {
    let cafes;
    
    if (!this.state.loading) {
      if (this.state.data !== undefined && this.state.data.length === 0) {
        cafes = <div className="cafe-list">
                  <ol>
                    {this.state.all_cafes.map((item,i) => 
                      <li>
                        <CafeItem key={i} cafe={item} />
                      </li> 
                    )}
                  </ol>
                </div>
      }
      else {
        cafes = <div className="cafe-list">
                  <ol>
                    {this.state.data.map((item,i) => 
                      <li>
                        <CafeItem key={i} cafe={item} />
                      </li> 
                    )}
                  </ol>
                </div>
      }
    }
    else {
      cafes = null;
    }

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
        { cafes }
      </div>
    )
  }
}

export default withRouter(AdvancedSearch);