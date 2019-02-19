import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Drink extends Component {
  constructor() {
      super()
      this.state = {
        data: []
      };
      this.getData = this.getData.bind(this);
  }

  getData(event) {
      console.log(req.params.drink_name)
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/drink/:drink_name')
      .then(function(response) {
          console.log(response.data.cafes)
        event.setState({data: response.data.cafes})
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   this.props.history.push("/login");
        // }
      });
  }
  
  componentDidMount() {
      this.getData(this);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }
  
  componentWillReceiveProps(nextProps) {
      this.getData(this);
  }

  render() {
      return (
        <div className="Drink">
          {localStorage.getItem('jwtToken') &&
            <button class="btn btn-primary" onClick={this.logout}>Logout</button>
          }
              {this.state.data.map(function(cafes) {
                return <div>
                    {cafes.cafe_name}
                </div>
              })}
        </div>
    );
  }
}

export default Drink;