import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
var querystring = require('querystring');
import BookmarkedIcon from '../../../assets/images/bookmarked.png';
import NotBookmarkedIcon from '../../../assets/images/bookmark.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Drink extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      drink_name: '',
      saved: false,
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
          event.setState({
            data: response.data.cafes, 
            saved: true
          });
        }
        else {
          event.setState({
            data: response.data.cafes, 
            saved: false
          });
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
    if (!this.state.saved) {
      this.insertNewDrinkBookmark(this);
      toast.success('Drink saved!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      this.setState({saved: true});
    }
    else {
      this.deleteBookmark();
      toast.warn('Drink removed.', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      this.setState({saved: false});
    }
  }

  insertNewDrinkBookmark(event) {
    axios.post('/bookmark',
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
          return axios.delete('/bookmark?id='+response.data.bkmk._id)
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
    const { drink_name, saved } = this.state;
    let saveButton;

    if (saved) {
      saveButton = <button 
                      className='isBookmarked'
                      onClick={this.onClick}>
                      <img src={BookmarkedIcon}/>
                  </button>
    }
    else {
      saveButton = <button 
                      className='notBookmarked'
                      onClick={this.onClick}>
                      <img src={NotBookmarkedIcon}/>
                  </button>
    }

    return (
      <div>
        <ToastContainer />
        <div className='Drink'>
          <h1>{drink_name}</h1>
          { saveButton }
          <h2>locations</h2>
          {this.state.data.map(function(cafes) {
            return <div className='drink-cafe-list'>
                      <h3>
                        <Link to={{pathname: '/cafe/'+cafes.cafe_name}}>
                          {cafes.cafe_name}
                        </Link>
                      </h3>
                      <p>{cafes.address}</p>
                      <p>{cafes.phone}</p>
                      <p>
                        <a href={cafes.website}>{cafes.website}</a>
                      </p>
                  </div>
          })}
        </div>
      </div>
    );
  }
}

export default Drink;