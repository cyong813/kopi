import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
var querystring = require('querystring');

class Cafe extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      loading: true,
      cafe_name: '',
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
        // check for bookmark and accordingly change the bookmark button
        if (response.data.bkmk) {
          event.setState({
            data: response.data.cafe, 
            cafe_name: response.data.cafe.cafe_name, 
            loading: false, 
            saved: 'Saved'});
        }
        else {
          event.setState({
            data: response.data.cafe, 
            cafe_name: response.data.cafe.cafe_name, 
            loading: false, 
            saved: 'Save'});
        }
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   this.props.history.push("/login");
        // }
    });
  }
    
  onClick() {
    if (this.state.saved === 'Save') {
      this.insertNewCafeBookmark(this);
      this.setState({saved: 'Saved'});
    }
    else {
      this.deleteBookmark();
      this.setState({saved: 'Save'});
    }
  }

  insertNewCafeBookmark(event) {
    console.log(event.state.cafe_name);
    axios.post('/addCafeBookmark',
    querystring.stringify({
      cafe_name: event.state.cafe_name
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
      event.setState({ messageFromServer: response.data });
    });
  }

  deleteBookmark() {
    axios.get('/api/cafe/'+this.props.match.params.cafe_name)
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

  render() {
    const { loading } = this.state;
    let cafe;

    if (!loading) {
      cafe = <div className="Cafe">
                <h1>{this.state.data.cafe_name}</h1>
                <p>{this.state.data.categories}</p>
                <p>{this.state.data.address}</p>
                <p>{this.state.data.phone}</p>
                <p>
                  <a href={this.state.data.website}>{this.state.data.website}</a>
                </p>
                <p>Drinks:</p>
                <ul>
                  {this.state.data.drinks.map(drink => {
                    return (
                      <li>
                        <Link 
                          to={{pathname: '/drink/'+drink.drink_name}}
                          style={{textDecoration: 'none'}}>
                          {drink.drink_name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>  
                <Button 
                  bsStyle='light' 
                  bsSize='small'
                  onClick={this.onClick}>{this.state.saved}
                </Button>
              </div>
    }
    else {
      cafe = null;
    }

    return (
      <div>
        {cafe}
      </div>
    );
  }
}

export default Cafe;