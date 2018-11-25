import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddBookmark from './AddBookmark';
import DeleteBookmark from './DeleteBookmark';
import axios from 'axios';

class Bookmarks extends Component {
    constructor() {
        super()
        this.state = {
          data: []
        };
        this.getData = this.getData.bind(this);
    }

    getData(event) {
        axios.get('/getAllBookmarks')
          .then(function(response) {
            event.setState({data: response.data});
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
            <AddBookmark/>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th className='col'>Bookmarks</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map(function(bkmk) {
                    return <tr>
                              <td className='counterCell'></td>
                              <td className='col'>{bkmk.item}</td>
                              <td className='col'><DeleteBookmark id={bkmk._id} bookmark={bkmk} /></td>
                            </tr>
                  })}
                </tbody>
              </table>
            </div>
        );
      }
}

export default Bookmarks;