import React, { Component } from 'react';
import axios from 'axios';
import DrinkItem from '../../components/Drink/DrinkItem/DrinkItem';

class Drinks extends Component {
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
    axios.get('/getAllDrinks')
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

  render() {
    const { loading } = this.state;
    let drinks;

    if (!loading) {
      drinks = <div className="drinks-grid">
                  {this.state.data.map(function(drink) {
                    return (
                      <DrinkItem key={drink._id} drink={drink} /> 
                    )
                  })}
              </div>
    }
    else {
      drinks = null;
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