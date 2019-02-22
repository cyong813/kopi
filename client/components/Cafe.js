import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Cafe extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      loading: true
    };
    this.getData = this.getData.bind(this);
  }

  getData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/cafe/'+this.props.match.params.cafe_name)
      .then(function(response) {
        event.setState({data: response.data, loading: false});
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

  render() {
    const { loading } = this.state;
    let cafe;

    if (!loading) {
      cafe = <div>
              <p>{this.state.data.cafe_name}</p>
              <p>{this.state.data.categories}</p>
              <p>{this.state.data.address}</p>
              <p>{this.state.data.phone}</p>
              <p>
                <Link 
                    to={{pathname: this.state.data.website}}
                    style={{textDecoration: 'none'}}>
                    {this.state.data.website}
                </Link>
              </p>
              <p>Drinks:</p>
              <p>
                {this.state.data.drinks.map(drink => {
                  return (
                    <Link 
                      to={{pathname: '/drink/'+drink.drink_name}}
                      style={{textDecoration: 'none'}}>
                      {drink.drink_name}
                    </Link>
                  );
                })}
              </p>  
            </div>
    }
    else {
      cafe = null;
    }

    return (
      <div className="Cafes">
        {localStorage.getItem('jwtToken') &&
          <button class="btn btn-primary" onClick={this.logout}>Logout</button>
        }
        {cafe}
      </div>
    );
  }
}

export default Cafe;