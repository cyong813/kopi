import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import CoffeeHeader from '../assets/images/coffeeparallax.jpg'
import axios from 'axios';
import Bookmarks from './Bookmarks';

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

  //https://github.com/umairraslam/expense-manager-mern/blob/master/client/components/Add.js
  render() {
    return (
      <div className="App">
        <Parallax bgImage={CoffeeHeader} strength={500}>
          <div style={{ height: 500 }}>
            <div style={insideStyles}>COFFEEEEEEEE</div>
          </div>
        </Parallax>
        <Link 
          to={{pathname: '/bookmarks'}}
          style={{textDecoration: 'none'}}>
          Bookmarks
        </Link>
      </div>
    );
  }
}

export default App;
