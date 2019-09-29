import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
var querystring = require('querystring');
import BookmarkedIcon from '../../../assets/images/bookmarked.png';
import NotBookmarkedIcon from '../../../assets/images/bookmark.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Cafe extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      loading: true,
      cafe_name: '',
      saved: false,
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
            saved: true});
        }
        else {
          event.setState({
            data: response.data.cafe, 
            cafe_name: response.data.cafe.cafe_name, 
            loading: false, 
            saved: false});
        }
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   this.props.history.push("/login");
        // }
    });
  }
    
  onClick() {
    if (!this.state.saved) {
      this.insertNewCafeBookmark(this);
      toast.success('Cafe saved!', {
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
      toast.warning('Cafe removed.', {
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
    const { loading, saved } = this.state;
    let cafe;
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

    if (!loading) {
      cafe = <div className='Cafe'>
                <div className='cafe-container'>
                  <img src={this.state.data.cafe_image} />
                  <div className='cafe-info'>
                    <h1>{this.state.data.cafe_name}</h1>
                    { saveButton }
                    <p>{this.state.data.categories}</p>
                    <p>{this.state.data.address}</p>
                    <p>{this.state.data.phone}</p>
                    <p>
                      <a href={this.state.data.website}>{this.state.data.website}</a>
                    </p>
                    <div className='drink-list-container'>
                      <h3>Drinks</h3>
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
                    </div>
                  </div>
                </div>
              </div>
    }
    else {
      cafe = null;
    }

    return (
      <div>
        <ToastContainer />
        {cafe}
      </div>
    );
  }
}

export default Cafe;