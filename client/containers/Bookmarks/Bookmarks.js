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
    this.getCafeBookmarkData = this.getCafeBookmarkData.bind(this);
    this.getDrinkBookmarkData = this.getDrinkBookmarkData.bind(this);
  }

  deleteBookmark(bookmarkId,isCafe) {
    axios.delete('/deleteBookmark?id='+bookmarkId)
      .then(console.log('Deleted.'))
      .catch(err => console.log(err));
    if (isCafe) {
      const newCafeState=[...this.state.cafeBkmkData].filter(bkmk => bkmk._id !== bookmarkId);
      this.setState({
        cafeBkmkData: newCafeState
      });
    }
    else {
      const newDrinkState=[...this.state.drinkBkmkData].filter(bkmk => bkmk._id !== bookmarkId);
      this.setState({
        drinkBkmkData: newDrinkState
      });
    }
  }

  getCafeBookmarkData(event) {
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
  }

  getDrinkBookmarkData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
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
    this.getCafeBookmarkData(this);
    this.getDrinkBookmarkData(this);
  }

  // re-render when removing a bookmark
  shouldComponentUpdate(nextProps,nextState) {
    if (this.state.cafeBkmkData !== nextState.cafeBkmkData) {
      return true;
    }
    if (this.state.drinkBkmkData !== nextState.drinkBkmkData) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="Bookmarks">
        <h1 className="bookmarks-header">Bookmarks</h1>
        <h2 className="cafe-bookmarks-header">Cafes</h2>
        <ol>
          {this.state.cafeBkmkData.map((cbkmk) => {
            return (
              <li key={cbkmk._id}>
                <CafeBookmarkItem 
                  cafe={cbkmk}
                  clicked={() => this.deleteBookmark(cbkmk._id,true)}
                  type="Danger"
                />
              </li>
          )})}
        </ol>
        <h2 className="drink-bookmarks-header">Drinks</h2>
        <ol>
          {this.state.drinkBkmkData.map((dbkmk) => {
            return (
              <li key={dbkmk._id}>
                <DrinkBookmarkItem 
                  drink={dbkmk}
                  clicked={() => this.deleteBookmark(dbkmk._id,false)}
                  type="Danger" 
                />
              </li>
          )})}
        </ol>
      </div>
    );
  }
}

export default Bookmarks;