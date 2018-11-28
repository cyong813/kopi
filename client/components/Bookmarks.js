import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddCafeBookmark from './AddCafeBookmark';
import AddDrinkBookmark from './AddDrinkBookmark';
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
      axios.get('/getAllCafeBookmarks')
        .then(function(cresponse) {
          event.setState({cafeBkmkData: cresponse.data});
      });
      axios.get('/getAllDrinkBookmarks')
        .then(function(dresponse) {
          event.setState({drinkBkmkData: dresponse.data});
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
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th className='col'>Bookmarks</th>
                    <th>
                      <AddCafeBookmark/>
                      <AddDrinkBookmark/>
                    </th>
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