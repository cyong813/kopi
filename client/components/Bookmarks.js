import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DeleteBookmark from './DeleteBookmark';
import axios from 'axios';

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
    axios.get('/getAllCafeBookmarks')
      .then(function(cresponse) {
        event.setState({cafeBkmkData: cresponse.data});
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
      });
    axios.get('/getAllDrinkBookmarks')
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

  logout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  componentWillReceiveProps(nextProps) {
    this.getData(this);
  }

  render() {
    return (
      <div className="Bookmarks">
        {localStorage.getItem('jwtToken') &&
          <button class="btn btn-primary" onClick={this.logout}>Logout</button>
        }
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='col'>Bookmarks</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cafeBkmkData.map(function(cbkmk) {
              return <tr>
                        <td className='counterCell'></td>
                        <td className='col'>{cbkmk.cafe_name}</td>
                        <td className='col'><DeleteBookmark id={cbkmk._id} bookmark={cbkmk} /></td>
                      </tr>
            })}
            {this.state.drinkBkmkData.map(function(dbkmk) {
              return <tr>
                        <td className='counterCell'></td>
                        <td className='col'>{dbkmk.drink_name}</td>
                        <td className='col'><DeleteBookmark id={dbkmk._id} bookmark={dbkmk} /></td>
                      </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Bookmarks;