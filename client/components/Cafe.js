import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import axios from 'axios';
var querystring = require('querystring');

class Cafe extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      loading: true,
      cafe_name: '',
      bkmk_id: null,
      saved: 'Save',
      messageFromServer: '',
    };
    this.getData = this.getData.bind(this);
    this.onClick = this.onClick.bind(this);
    this.insertNewCafeBookmark = this.insertNewCafeBookmark.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
  }

  getData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/cafe/'+this.props.match.params.cafe_name)
      .then(function(response) {
        event.setState({data: response.data, cafe_name: response.data.cafe_name, loading: false});
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   this.props.history.push("/login");
        // }
    });
  }
    
  onClick(event) {
    this.insertNewCafeBookmark(this);
  }

  insertNewCafeBookmark(event) {
      axios.post('/addCafeBookmark',
      querystring.stringify({
          cafe_name: event.state.cafe_name
      }), {
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          }
      }).then(function(response) {
          event.setState({
              messageFromServer: response.data
          });
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
                <a href={this.state.data.website}>{this.state.data.website}</a>
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
              <Button 
                bsStyle='success' 
                bsSize='small'
                onClick={this.onClick}>Save  
              </Button>
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