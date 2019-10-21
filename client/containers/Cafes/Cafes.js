import React, { Component } from 'react';
import axios from 'axios';
import CafeItem from '../../components/Cafe/CafeItem/CafeItem';
import SearchBar from '../../components/Search/SearchBar';
import Spinner from '../../components/UI/Spinner/Spinner';

class Cafes extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      searchField: '',
      filters: {
        'credit_card': false,
        'good_for_working': false,
        'restroom': false,
        'wifi': false
      },
      filterTags: [],
      loading: true
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  getCafeNames(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/cafe?names=all')
      .then(function(response) {
        event.setState({data: response.data, loading: false});
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   this.props.history.push('/login');
        // }
    });
  };

  handleSearchChange(event) {
    this.setState({ searchField: event.target.value })
  };

  onSearchSubmit(event) {
    event.preventDefault();
    if (this.state.searchField.length > 0) {
      this.setState({loading: true});
      
      this.props.history.push({
        pathname: '/cafes',
        search: '?findQuery='+this.state.searchField
      });

      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get('/search?findQuery='+this.state.searchField)
        .then((res) => {
          this.setState({ data: res.data.searchedCafes, loading: false });
      });
    }
  };

  handleFilter = (filter) => {
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
    this.setState({ filters: result, filterTags: trueFilters, loading: true });

    this.props.history.push({
      pathname: '/cafes',
      search: '?filters='+trueFilters+'&findQuery='+this.state.searchField
    });

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/filter?filters='+trueFilters+'&findQuery='+this.state.searchField)
      .then((res) => {
        console.log(res.data.filteredCafes);
        this.setState({ data: res.data.filteredCafes, loading: false });
    });
  };

  componentDidMount() {
    this.getCafeNames(this);
  };

  // re-render when loading user search query, or user clicks on filters
  shouldComponentUpdate(nextProps,nextState) {
    if (this.state.loading !== nextState.loading) {
      return true;
    }
    if (this.state.data !== nextState.data) {
      return true;
    }
    if (this.props.location !== nextProps.location) {
      return true;
    }
    return false;
  };

  render() {
    const { loading } = this.state;
    let cafes;
    
    const filters = Object.keys(this.state.filters).map(function(item) {
      return item.replace(/_{1,}/g,' ').replace(/(\s{1,}|\b)(\w)/g, function(m, space, letter) {
        return space + letter.toUpperCase();
      });
    }, this);

    if (!loading) {
      cafes = <div className='cafe-list'>
                <ol>
                  {this.state.data.map(function(cafe) {
                    return (
                      <li>
                        <CafeItem key={cafe._id} cafe={cafe} />
                      </li>
                    )
                  })}
                </ol>
              </div>
    }
    else {
      cafes = <Spinner />;
    }

    return (
      <div className='Cafes'>
        <SearchBar 
          changeHandler={this.handleSearchChange}
          submitHandler={this.onSearchSubmit}
          filterHandler={this.handleFilter}
          filterList={filters} />
        <h1 className='cafes-header'>Cafes</h1>
        { cafes }
      </div>
    );
  }
}

export default Cafes;