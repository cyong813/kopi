import React, { Component } from 'react';
import axios from 'axios';
import CafeItem from '../../components/Cafe/CafeItem/CafeItem';
import Search from '../../components/Search';

const isSearched = searchField => cafe => cafe.cafe_name.toLowerCase().includes(searchField.toLowerCase());

class Cafes extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      searchField: '',
      loading: true
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  getData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/cafe?names=all')
      .then(function(response) {
        event.setState({data: response.data, loading: false});
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   this.props.history.push("/login");
        // }
    });
  }

  handleSearchChange(event) {
    this.setState({ searchField: event.target.value })
  }

  componentDidMount() {
    this.getData(this);
  }

  render() {
    const { loading } = this.state;
    let cafes;

    if (!loading) {
      cafes = <div className="cafe-list">
                <ol>
                  {this.state.searchField.length !== 0 && this.state.data.filter(isSearched(this.state.searchField)).map((item,i) => 
                    <li>
                      <CafeItem key={i} cafe={item} />
                    </li> 
                  )}
                </ol>
              </div>
    }
    else {
      cafes = null;
    }

    return (
      <div className="Cafes">
        <Search changeHandler={this.handleSearchChange} />
        <h1 className="cafes-header">Search Results</h1>
        { cafes }
      </div>
    );
  }
}

export default Cafes;