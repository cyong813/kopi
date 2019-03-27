import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import axios from 'axios';
var querystring = require('querystring');

class Drink extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      drink_name: '',
      saved: 'Save',
      messageFromServer: '',
    };
    this.getData = this.getData.bind(this);
    this.onClick = this.onClick.bind(this);
    this.insertNewDrinkBookmark = this.insertNewDrinkBookmark.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
  }

  getData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    this.setState({drink_name: this.props.match.params.drink_name});
    axios.get('/api/drink/'+this.props.match.params.drink_name)
      .then(function(response) {
        // check for bookmark and accordingly change the bookmark button
        if (response.data.bkmk) {
          event.setState({data: response.data.cafes, saved: 'Saved'});
        }
        else {
          event.setState({data: response.data.cafes, saved: 'Save'});
        }
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   this.props.history.push("/login");
        // }
      });
  }

  // note: for some reason, onClick does not work with event as parameter.
  onClick() {
    if (this.state.saved === 'Save') {
      this.insertNewDrinkBookmark(this);
      this.setState({saved: 'Saved'});
    }
    else {
      this.deleteBookmark();
      this.setState({saved: 'Save'});
    }
  }

  insertNewDrinkBookmark(event) {
    axios.post('/addDrinkBookmark',
    querystring.stringify({
        drink_name: event.state.drink_name
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        event.setState({ messageFromServer: response.data });
    });
  }

  deleteBookmark() {
    axios.get('/api/drink/'+this.props.match.params.drink_name)
      .then(function(response) {
        // check for bookmark and accordingly change the bookmark button
        if (response.data.bkmk) {
          console.log(response.data.bkmk._id);
          return axios.get('/deleteBookmark?id='+response.data.bkmk._id)
            .then(function(result) {
              console.log(result.data);
            }).catch((error) => {
              // if (error.response.status === 401) {
              //   this.props.history.push("/login");
              // }
          });
        }
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
      <div>
        {localStorage.getItem('jwtToken') &&
          <button class="btn btn-primary" onClick={this.logout}>Logout</button>
        }
        <div className="Drink">
            {this.state.data.map(function(cafes) {
              return <div>
                        <h1><Link 
                              to={{pathname: '/cafe/'+cafes.cafe_name}}
                              style={{color: 'black',
                                    textDecoration: 'none'}}>
                              {cafes.cafe_name}
                            </Link>
                        </h1>
                        <p>{cafes.address}</p>
                        <p>{cafes.phone}</p>
                        <p><a href={cafes.website}>{cafes.website}</a></p>
                    </div>
            })}
            <Button 
              bsStyle='light' 
              bsSize='small'
              onClick={this.onClick}>{this.state.saved}  
            </Button>
        </div>
      </div>
    );
  }
}

export default Drink;