import React, { Component } from 'react';
import axios from 'axios';

import DrinkItem from '../../components/Drink/DrinkItem/DrinkItem';
import Spinner from '../../components/UI/Spinner/Spinner'

class Drinks extends Component {
  constructor() {
      super()
      this.state = {
        drink_data: [],
        loading: true
      };
  }

  getSortedDrinkData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/drink?sort=names_asc')
      .then(function(res) {
        event.setState({drink_data: res.data, loading: false});
      })
      .catch((err) => {
        if (err.res.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  componentDidMount() {
      this.getSortedDrinkData(this);
  }

  render() {
    const { loading } = this.state;
    let drinks;

    if (!loading) {
      drinks = <div className="drinks-grid">
                  {this.state.drink_data.map(function(drink) {
                    return (
                      <DrinkItem key={drink._id} drink={drink} /> 
                    )
                  })}
              </div>
    }
    else {
      drinks = <Spinner />;
    }

    return (
      <div className="Drinks">
        <h1 className="drinks-header">Drinks</h1>
        { drinks }
      </div>
    );
  }
}

export default Drinks;