import React, { Component } from 'react';
import axios from 'axios';
import CafeItem from '../../components/Cafe/CafeItem/CafeItem';
import SearchBar from '../../components/Search/SearchBar';
import Spinner from '../../components/UI/Spinner/Spinner';

class Cafes extends Component {
  constructor() {
    super();
    this.state = {
      cafe_data: [],
      searchField: '',
      firstSearch: '',
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

  getCafeNamesData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/cafe?category=names,id&sort=names_asc')
      .then(function(res) {
        event.setState({cafe_data: res.data, loading: false});
      })
      .catch((err) => {
        if (err.res.status === 401) {
          this.props.history.push('/login');
        }
    });
  };

  handleSearchChange(event) {
    this.setState({ searchField: event.target.value });
    console.log('handler '+event.target.value);
  };

  onSearchSubmit(event) {
    event.preventDefault();
    if (this.state.searchField.length > 0) {
      this.setState({loading: true});
      
      this.props.history.push({
        pathname: '/cafes',
        search: '?find_query='+this.state.searchField+'&filters='+this.state.filterTags
      });

      if (this.state.filterTags.length > 0) {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/search?find_query='+this.state.searchField+'&filters='+this.state.filterTags+'&sort=names_asc')
          .then((res) => {
            this.setState({ cafe_data: res.data.searchedCafes, loading: false });
        });
      }
      else {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/search?find_query='+this.state.searchField+'&sort=names_asc')
          .then((res) => {
            this.setState({ cafe_data: res.data.searchedCafes, loading: false });
        });
      }
    }
  };

  handleFilter = (filter) => {
    let convertedFilter = filter.toLowerCase().replace(/ /g, '_');
    let updatedFilters = JSON.parse(JSON.stringify(this.state.filters)); // deep copy of state object
    if (!updatedFilters[convertedFilter]) {
      updatedFilters[convertedFilter] = true;
    }
    else {
      updatedFilters[convertedFilter] = false;
    }
    let querifiedFilters = Object.keys(updatedFilters).filter(function(key) {
      return updatedFilters[key];
    });

    this.setState({ filters: updatedFilters, filterTags: querifiedFilters, loading: true });
    this.props.history.push({
      pathname: '/cafes',
      search: '?find_query='+this.state.searchField+'&filters='+querifiedFilters
    });

    if (querifiedFilters.length > 0) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get('/search?find_query='+this.state.searchField+'&filters='+querifiedFilters+'&sort=names_asc')
        .then((res) => {
          this.setState({ cafe_data: res.data.searchedCafes, loading: false });
      });
    }
    else {
      this.setState({ loading: false });
      this.props.history.push('/cafes');
    }
  };

  componentDidMount() {
    // if user refreshes, reload query submission data
    if (this.props.location.search.length > 0) {
      // parse filters from user's query, and update mounted state
      const filterQuery = this.props.location.search.substring(this.props.location.search.indexOf('filters=')+8,this.props.location.search.length).split(',');
      const userQuery = this.props.location.search.substring(this.props.location.search.indexOf('find_query=')+11,this.props.location.search.indexOf('&'));
      let updatedFilters = JSON.parse(JSON.stringify(this.state.filters));
      filterQuery.forEach(filter => {
        if (filter in updatedFilters) {
          updatedFilters[filter] = true;
        }
      });
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get('/search'+this.props.location.search+'&sort=names_asc')
        .then((res) => {
          this.setState({
            cafe_data: res.data.searchedCafes,
            filters: updatedFilters,
            searchField: userQuery,
            loading: false
          });
      });
    }
    else {
      this.getCafeNamesData(this);
    }
  };

  // re-render when loading user search query, or user clicks on filters
  shouldComponentUpdate(nextProps,nextState) {
    if (this.state.loading !== nextState.loading) {
      return true;
    }
    else if (this.state.data !== nextState.data) {
      return true;
    }
    else if (this.state.filters !== nextState.filters) {
      return true;
    }
    else if (this.state.searchField !== nextState.searchField) {
      return true;
    }
    else if (this.props.location !== nextProps.location) {
      return true;
    }
    return false;
  };

  render() {
    const { loading } = this.state;
    let cafes;
    
    const filters = Object.keys(this.state.filters).map(function(item) {
      return item.replace(/_{1,}/g,' ').replace(/(\s{1,}|\b)(\w)/g, function(m,space, letter) {
        return space + letter.toUpperCase();
      });
    }, this);

    if (!loading) {
      cafes = <div className='cafe-list'>
                <ol>
                  {this.state.cafe_data.map(function(cafe) {
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
          searchValue={this.state.searchField}
          filters={this.state.filters}
          formattedFilters={filters} />
        <h1 className='cafes-header'>Cafes</h1>
        { cafes }
      </div>
    );
  }
}

export default Cafes;