import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import CoffeeHeader from '../assets/images/coffeeparallax.jpg';
import Register from './Register';

const insideStyles = {
  color: "white",
  fontSize: 50,
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};

const pStyles = {
  color: "white",
  fontSize: 15,
  padding: 20,
  position: "absolute",
  top: "65%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};

class App extends Component {
  constructor() {
    super()
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Parallax bgImage={CoffeeHeader} strength={500}>
          <div style={{ height: 500 }}>
            <div style={insideStyles}>
              COFFEEEEEEEE
            </div>
            <p style={pStyles}>Coffee culture all in one place.</p>
          </div>
        </Parallax>
        {!localStorage.getItem('jwtToken') &&
        <div>
          <div className='navlinks'>
            <Link 
              to={{pathname: '/login'}}
              style={{textDecoration: 'none'}}>
              Login
            </Link>
          </div> 
          <Register />
          </div>
        }
        {localStorage.getItem('jwtToken') &&
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
        }
      </div>
    );
  }
}

export default App;
