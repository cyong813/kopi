import React, { Component } from 'react';
import axios from 'axios';
import CafeItem from '../../components/Cafe/CafeItem/CafeItem';
import SearchBar from '../../components/Search/SearchBar';
import Spinner from '../../components/UI/Spinner/Spinner';

// Pagination Styling Credits: https://codepen.io/hakimel/pen/gfIsk

const PAGE_LIMIT = 2;
const CATEGORIES = [
  '','American', 'Filipino'
];

class Cafes extends Component {
  constructor() {
    super();
    this.state = {
      cafe_data: [],
      searchField: '',
      filters: {
        'credit_card': false,
        'good_for_working': false,
        'restroom': false,
        'wifi': false
      },
      filterTags: [],
      categories: '',
      page: 0,
      totalItems: 0,
      loading: true
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onPaginatedHandler(direction) {
    if (!direction) { // previous page
      this.setState({ loading: true }, () => {
        if (this.state.page-1 > 0) {
          if (this.props.location.search.length === 0) {
            this.props.history.push({
              pathname: '/cafes',
              search: 'page='+this.state.page
            });
          }
        }
        else {
          // change url if first page
          if (this.props.location.search.indexOf('find_query=') === -1 &&
              this.props.location.search.indexOf('filters=') === -1 && 
              this.props.location.search.indexOf('category=') === -1) {
            this.props.history.push({
              pathname: '/cafes',
              search: ''
            });
          }
          else {  // just remove page query
            const newSearchQuery = this.props.location.search.substring(0,this.props.location.search.indexOf('&page='));
            console.log(newSearchQuery);
            this.props.history.push({
              pathname: '/cafes',
              search: newSearchQuery
            });
          }
        }

        // separate /search from /cafe requests
        if (this.props.location.search.indexOf('find_query=') === -1 &&
              this.props.location.search.indexOf('filters=') === -1 && 
              this.props.location.search.indexOf('category=') === -1) {
          this.getCafeNamesData(this, this.state.page-1, false);
        }
        else {
          this.getCafeNamesData(this, this.state.page-1, true);
        }
      });
    }
    else { // next page
      this.setState({ loading: true }, () => {
        console.log('current url: ', this.props.location.search);
        if (this.props.location.search.length === 0 || this.props.location.search.indexOf('?') === -1) { // no user queries
          this.props.history.push({
            pathname: '/cafes',
            search: 'page='+(this.state.page+2)
          });
        }
        else {
          const newSearchQuery = this.props.location.search.substring(0,this.props.location.search.indexOf('&page='));
          this.props.history.push({
            pathname: '/cafes',
            search: newSearchQuery+'&page='+(this.state.page+2)
          });
        }
        // separate /search from /cafe requests
        if (this.props.location.search.indexOf('?') === -1) {
          this.getCafeNamesData(this, this.state.page+1, false);
        }
        else {
          this.getCafeNamesData(this, this.state.page+1, true);
        }
      });
    }
  };

  getCafeNamesData(event, curPage, search) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    if (!search) {  
      axios.get('/cafe?category=names,id&page='+curPage+'&limit='+PAGE_LIMIT+'&sort=names_asc')
        .then(function(res) {
          // if current page is non-existent, redirect to first page
          // TODO: write message to user?
          if (curPage < 0 || curPage > res.data.count) {
            event.setState({
              cafe_data: res.data.cafes, 
              page: 0, 
              totalItems: res.data.count,
              loading: false
            });
          }
          else {
            event.setState({
              cafe_data: res.data.cafes, 
              page: curPage, 
              totalItems: res.data.count,
              loading: false
            });
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            this.props.history.push('/login');
          }
      });
    }
    else {
      let querifiedFilters = Object.keys(event.state.filters).filter(function(key) {
        return event.state.filters[key];
      });
      axios.get('/search?find_query='+event.state.searchField+'&filters='+querifiedFilters+'&category='+event.state.categories+'&page='+curPage+'&limit='+PAGE_LIMIT+'&sort=names_asc')
        .then(function(res) {
          if (curPage < 0 || curPage > res.data.count) {
            event.setState({
              cafe_data: res.data.searchedCafes, 
              page: 0, 
              totalItems: res.data.count,
              loading: false
            });
          }
          else {
            event.setState({
              cafe_data: res.data.searchedCafes, 
              page: curPage, 
              totalItems: res.data.count,
              loading: false
            });
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            this.props.history.push('/login');
          }
      });
    }
  };

  handleSearchChange(event) {
    this.setState({ searchField: event.target.value });
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
        axios.get('/search?find_query='+this.state.searchField+'&filters='+this.state.filterTags+'&category='+this.state.categories+'&sort=names_asc')
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
    let convertedFilter = filter.toLowerCase().replace(/ /g, '_'); // reformat readable filter back to code
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
      search: '?find_query='+this.state.searchField+'&filters='+querifiedFilters+'&category='+this.state.categories
    });

    if (querifiedFilters.length === 0 && this.state.searchField.length === 0 && this.state.categories.length === 0) {
      this.props.history.push('/cafes');
      this.getCafeNamesData(this, false);
    }
    else {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get('/search?find_query='+this.state.searchField+'&filters='+querifiedFilters+'&category='+this.state.categories+'&sort=names_asc')
        .then((res) => {
          this.setState({ cafe_data: res.data.searchedCafes, loading: false });
      });
    }
  };

  handleCategoryChange(event) {
    const state = this.state;
    let selectedCategory = event.target.value;
    this.setState({ categories: selectedCategory, loading: true });
    let querifiedFilters = Object.keys(state.filters).filter(function(key) {
      return state.filters[key];
    });
    this.props.history.push({
      pathname: '/cafes',
      search: '?find_query='+state.searchField+'&filters='+querifiedFilters+'&category='+selectedCategory
    });
    if (selectedCategory.length === 0 && state.searchField.length === 0 && querifiedFilters.length === 0) {
      this.props.history.push('/cafes');
      this.getCafeNamesData(this, false);
    }
    else {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get('/search?find_query='+state.searchField+'&filters='+querifiedFilters+'&category='+selectedCategory+'&sort=names_asc')
        .then((res) => {
          this.setState({ cafe_data: res.data.searchedCafes, loading: false });
      });
    }
  };

  componentDidMount() {
    // when user refreshes, reload query submission data
    if (this.props.location.search.length > 0) {
      // parse user's queries, and update mounted state
      let categoryQuery = '';
      let filterQuery = '';
      let userQuery = '';
      let pageQuery = 0;

      // checking queries to ensure validity, otherwise keep empty
      if ( this.props.location.search.indexOf('category=') !== -1) {
        // when user only enters category and no other queries  
        if ( this.props.location.search.indexOf('page=') !== -1 &&
              CATEGORIES.includes(this.props.location.search.substring(this.props.location.search.indexOf('category=')+9,this.props.location.search.indexOf('&page='))) ) {
          categoryQuery = this.props.location.search.substring(this.props.location.search.indexOf('category=')+9,this.props.location.search.indexOf('&page='));
        }
        else if ( CATEGORIES.includes(this.props.location.search.substring(this.props.location.search.indexOf('category=')+9,this.props.location.search.length)) ) {
          categoryQuery = this.props.location.search.substring(this.props.location.search.indexOf('category=')+9,this.props.location.search.length);
        }
      }
      if (this.props.location.search.indexOf('filters=') !== -1) {
        if (this.props.location.search.indexOf('find_query=') !== -1 &&
            this.props.location.search.indexOf('&') !== -1 && 
            this.props.location.search.split('&').length >= 1 && 
            this.props.location.search.split('&')[1].substring(this.props.location.search.split('&')[1].indexOf('filters=')+8,this.props.location.search.split('&')[1].length).split(',').every(item => Object.keys(this.state.filters).indexOf(item) >= 0)) {
          filterQuery = this.props.location.search.split('&')[1].substring(this.props.location.search.split('&')[1].indexOf('filters=')+8,this.props.location.search.split('&')[1].length).split(',');
        }
        // when user only enters filters and no other queries
        else if ( this.props.location.search.indexOf('find_query=') !== -1 && 
                  this.props.location.search.indexOf('category=') !== -1 &&
                  this.props.location.search.indexOf('page=') !== -1 &&
                  this.props.location.search.substring(this.props.location.search.indexOf('filters=')+8,this.props.location.search.length).split(',').every(item => Object.keys(this.state.filters).indexOf(item) >= 0) ) {
          filterQuery = this.props.location.search.substring(this.props.location.search.indexOf('filters=')+8,this.props.location.search.length).split(',');            
        }

      }
      if (this.props.location.search.indexOf('find_query=') !== -1) {
        if (this.props.location.search.indexOf('filters=') === -1 && 
            this.props.location.search.indexOf('category=') === -1 &&
            this.props.location.search.indexOf('page=') === -1) {
          userQuery = this.props.location.search.substring(this.props.location.search.indexOf('find_query=')+11,this.props.location.search.length);
        }
        else { // other queries exist
          userQuery = this.props.location.search.substring(this.props.location.search.indexOf('find_query=')+11,this.props.location.search.indexOf('&'));
        }
      }
      if ( this.props.location.search.indexOf('page=') !== -1 && 
          !isNaN(+this.props.location.search.substring(this.props.location.search.indexOf('page=')+5,this.props.location.search.length)) &&
          (+this.props.location.search.substring(this.props.location.search.indexOf('page=')+5,this.props.location.search.length)) > 1 ) {
        pageQuery = parseInt(this.props.location.search.substring(this.props.location.search.indexOf('page=')+5,this.props.location.search.length))-1;
      }

      console.log(categoryQuery);
      console.log(filterQuery);
      console.log(userQuery);
      console.log(pageQuery);

      if (filterQuery.length > 0 || categoryQuery.length > 0 || userQuery.length > 0) {
        let updatedFilters = JSON.parse(JSON.stringify(this.state.filters));
        if (filterQuery.length > 0) {
          filterQuery.forEach(filter => {
            if (filter in updatedFilters) {
              updatedFilters[filter] = true;
            }
          });
        }
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/search?find_query='+userQuery+'&filters='+filterQuery+'&category='+categoryQuery+'&page='+pageQuery+'&limit='+PAGE_LIMIT+'&sort=names_asc')
          .then((res) => {
            // prevent incorrect paging in pagination
            if (res.data.count <= PAGE_LIMIT && pageQuery > 0) {
              const newSearchQuery = this.props.location.search.substring(0,this.props.location.search.indexOf('&page='));
              console.log(newSearchQuery);
              this.props.history.push({ // remove page query since we force to 0
                pathname: '/cafes',
                search: newSearchQuery
              });
              this.setState({
                cafe_data: res.data.searchedCafes,
                categories: categoryQuery,
                filters: updatedFilters,
                searchField: userQuery,
                totalItems: res.data.count,
                page: 0,
                loading: false
              });
            }
            else {
              this.setState({
                cafe_data: res.data.searchedCafes,
                categories: categoryQuery,
                filters: updatedFilters,
                searchField: userQuery,
                totalItems: res.data.count,
                page: pageQuery,
                loading: false
              });
            }
        });
      }
      // when page is the only query
      else if (filterQuery.length === 0 &&
                categoryQuery.length === 0 &&
                userQuery.length === 0 &&
                pageQuery > 0) {
        // update url to next pg
        const newPageQuery = this.props.location.search.substring(0,this.props.location.search.indexOf('&page='));
        this.props.history.push({
          pathname: '/cafes',
          search: newPageQuery+'page='+(pageQuery+1)
        });
        this.getCafeNamesData(this, pageQuery-1, false);
      }
      else {
        // in case user manually enters unrecognizable query and refreshes
        // TODO: maybe redirect to a 404 page/error message?
        this.props.history.push({
          pathname: '/cafes',
          search: ''
        });
        this.getCafeNamesData(this, 0, false);
      }
    }
    else {
      this.getCafeNamesData(this, 0, false);
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
    else if (this.state.categories !== nextState.categories) {
      return true;
    }
    else if (this.state.searchField !== nextState.searchField) {
      return true;
    }
    else if (this.state.page !== nextState.page) {
      return true;
    }
    else if (this.props.location !== nextProps.location) {
      return true;
    }
    return false;
  };

  render() {
    const { loading, page, totalItems } = this.state;
    let cafes, counter;
    
    const filters = Object.keys(this.state.filters).map(function(item) {
      return item.replace(/_{1,}/g,' ').replace(/(\s{1,}|\b)(\w)/g, function(m,space, letter) {
        return space + letter.toUpperCase();
      });
    }, this);
 
    if ( page === 0 && (totalItems === 0 || totalItems <= PAGE_LIMIT) ) {
      counter = '1 / 1';
    }
    else {
      counter = (page + 1).toString() + '/' + (Math.ceil(totalItems / PAGE_LIMIT)).toString();
    }

    if (!loading) {
      cafes = <div className='cafe-list'>
                <ol>
                  {this.state.cafe_data.map(function(cafe, i) {
                    return (
                      <li>
                        <span>{(page * PAGE_LIMIT) + i + 1}.</span>
                        <CafeItem 
                          key={cafe._id} 
                          cafe={cafe} />
                      </li>
                    )
                  })}
                </ol>
                <div className='pagination'>
                  <div className='counter'>{counter}</div> 
                  <button 
                    type='button'
                    onClick={page > 0 && this.onPaginatedHandler.bind(this, false)}
                    className={page > 0 ? 'paginate left' : 'paginate left disabled'}
                  ><span></span><span></span></button>
                  <button 
                    type='button'
                    onClick={(page+1) < Math.ceil(totalItems / PAGE_LIMIT) && this.onPaginatedHandler.bind(this, true)}
                    className={(page+1) < Math.ceil(totalItems / PAGE_LIMIT) ? 'paginate right' : 'paginate right disabled'}
                  ><span></span><span></span></button>
                </div>
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
          categoryHandler={this.handleCategoryChange}
          currentCategory={this.state.categories}
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