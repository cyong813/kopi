import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import CoffeeHeader from '../assets/images/coffeeparallax.jpg'

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
  render() {
    return (
      <div className="App">
        <Parallax bgImage={CoffeeHeader} strength={500}>
          <div style={{ height: 500 }}>
            <div style={insideStyles}>COFFEEEEEEEE</div>
          </div>
        </Parallax>
      </div>
    );
  }
}

export default App;
