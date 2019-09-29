import React, { Component } from 'react';
import axios from 'axios';
import DrinkBookmarkItem from '../../components/Bookmark/BookmarkItems/DrinkBookmarkItem';
import CafeBookmarkItem from '../../components/Bookmark/BookmarkItems/CafeBookmarkItem';

class Bookmarks extends Component {
  constructor() {
    super()
    this.state = {
      cafeBkmkData: [],
      drinkBkmkData: []
    };
    this.getData = this.getData.bind(this);
  }

  getData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/getAllCafeBookmarks')
      .then(function(cresponse) {
        event.setState({cafeBkmkData: cresponse.data});
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
    axios.get('/api/getAllDrinkBookmarks')
      .then(function(dresponse) {
        event.setState({drinkBkmkData: dresponse.data});
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
  }

  componentDidMount() {
    this.getData(this);
  }

  render() {
    return (
      <div className="Bookmarks">
        <h1 className="bookmarks-header">Bookmarks</h1>
        <h2 className="cafe-bookmarks-header">Cafes</h2>
        <ol>
          {this.state.cafeBkmkData.map(function(cbkmk) {
            return (
              <li>
                <CafeBookmarkItem key={cbkmk._id} cbkmk={cbkmk} />
              </li>
            )
          })}
        </ol>
        <h2 className="drink-bookmarks-header">Drinks</h2>
        <ol>
          {this.state.drinkBkmkData.map(function(dbkmk) {
            return (
              <li>
                <DrinkBookmarkItem key={dbkmk._id} dbkmk={dbkmk} />
              </li>
            )
          })}
        </ol>
      </div>
    );
  }
}

export default Bookmarks;