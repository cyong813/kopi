import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import CoffeeHeader from '../assets/images/coffeeparallax.jpg';
import Map from './Map';

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
  render() {
    const isAuthed = localStorage.getItem('jwtToken');

    return (
      <div className="App">
        <Parallax bgImage={CoffeeHeader} strength={500}>
          <div style={{ height: 500 }}>
            <div style={insideStyles}>
              kopi
            </div>
            <p style={pStyles}>Coffee culture all in one place.</p>
          </div>
        </Parallax>
        { isAuthed && <div className='Map'>
          <Map/>
        </div>}
      </div>
    );
  }
}

export default App;
