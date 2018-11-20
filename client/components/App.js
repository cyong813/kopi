import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Parallax } from 'react-parallax';
import CoffeeHeader from '../assets/images/coffeeparallax.jpg'
import axios from 'axios';
import AddBookmark from './AddBookmark';
import DeleteBookmark from './DeleteBookmark';

const insideStyles = {
  color: "white",
  fontSize: 50,
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    };
    this.getData = this.getData.bind(this);
  }

  getData(event) {
    axios.get('/bookmarks')
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
      <div className="App">
        <Parallax bgImage={CoffeeHeader} strength={500}>
          <div style={{ height: 500 }}>
            <div style={insideStyles}>COFFEEEEEEEE</div>
          </div>
        </Parallax>
        <div className='bookmarks'>
        <AddBookmark/>
          <table>
            <thead>
              <tr>
                <th></th>
                <th className='button-col'>Bookmarks</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(function(bkmk) {
                return <tr>
                          <td className='counterCell'></td>
                          <td className='button-col'>{bkmk.item}</td>
                          <td className='button-col'><DeleteBookmark bookmark={bkmk} /></td>
                        </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
