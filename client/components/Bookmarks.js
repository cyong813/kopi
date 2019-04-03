import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  componentWillReceiveProps(nextProps) {
    this.getData(this);
  }

  render() {
    return (
      <div className="Bookmarks">
        <h1 className="bookmarks-header">Bookmarks</h1>
        <table>
          <tbody>
            {this.state.cafeBkmkData.map(function(cbkmk) {
              return <tr>
                        <td className='counterCell'></td>
                        <td className='col'>
                          <Link 
                            to={{pathname: '/cafe/'+cbkmk.cafe_name}}
                            style={{color: 'black',
                                    textDecoration: 'none'}}>
                            {cbkmk.cafe_name}
                          </Link>
                        </td>
                        <td className='col'><DeleteBookmark id={cbkmk._id} bookmark={cbkmk} /></td>
                      </tr>
            })}
            {this.state.drinkBkmkData.map(function(dbkmk) {
              return <tr>
                        <td className='counterCell'></td>
                        <td className='col'>
                          <Link 
                            to={{pathname: '/drink/'+dbkmk.drink_name}}
                            style={{color: 'black',
                                    textDecoration: 'none'}}>
                            {dbkmk.drink_name}
                          </Link>
                        </td>
                        <td className='col'>
                          <DeleteBookmark id={dbkmk._id} bookmark={dbkmk} />
                        </td>
                      </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Bookmarks;