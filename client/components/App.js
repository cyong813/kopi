import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import CoffeeHeader from '../assets/images/coffeeparallax.jpg'
import axios from 'axios';

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
  }

  render() {
    return (
      <div className="App">
        <Parallax bgImage={CoffeeHeader} strength={500}>
          <div style={{ height: 500 }}>
            <div style={insideStyles}>COFFEEEEEEEE</div>
          </div>
        </Parallax>
        <div className='navlinks'>
          <Link 
            to={{pathname: '/bookmarks'}}
            style={{textDecoration: 'none'}}>
            Bookmarks
          </Link>
          <Link 
            to={{pathname: '/cafes'}}
            style={{textDecoration: 'none'}}>
            Cafes
          </Link>
          <Link 
            to={{pathname: '/drinks'}}
            style={{textDecoration: 'none'}}>
            Drinks
          </Link>
        </div>
      </div>
    );
  }
}

export default App;