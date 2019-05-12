import React, { Component } from 'react';
import axios from 'axios';
import CafeItem from '../layout/CafeItem';
import Search from './Search';

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

  render() {
    return (
      <div className="Cafes">
        <h1 className="cafes-header">Cafes</h1>
        <Search changeHandler={this.handleSearchChange} />
      </div>
    );
  }
}

export default Cafes;