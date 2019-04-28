import React, { Component } from 'react';
import axios from 'axios';
import CafeItem from '../layout/CafeItem';
import Search from './Search';

const isSearched = searchField => cafe => cafe.cafe_name.toLowerCase().includes(searchField.toLowerCase());
  // || cafe.filters[0].credit_card === 'yes' && searchField.toLowerCase() === 'credit'
  // || cafe.filters[1].cash_only === 'yes' && searchField.toLowerCase() === 'cash'
  // || cafe.filters[2].can_work === 'yes' && searchField.toLowerCase() === 'work'
  // || cafe.filters[4].restroom === 'yes' && searchField.toLowerCase() === 'restroom'
  // || cafe.filters[5].wifi === 'yes' && searchField.toLowerCase() === 'wifi';

class Cafes extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      searchField: '',
      loading: true
    };
    this.getData = this.getData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  getData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/getAllCafeNames')
      .then(function(response) {
        //console.log(response.data);
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
                  {this.state.data.filter(isSearched(this.state.searchField)).map((item,i) => 
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
        <h1 className="cafes-header">Cafes</h1>
        { cafes }
      </div>
    );
  }
}

export default Cafes;