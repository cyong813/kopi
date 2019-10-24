import React, { Component } from 'react';
import Map from '../containers/Maps/Map';
import Layout from '../hoc/Layout/Layout';
import { Particles } from 'react-particles-js'

class App extends Component {
  render() {
    const isAuthed = localStorage.getItem('jwtToken');
    return (
      <Layout pName={this.props.location.pathname}>       
        { isAuthed && 
            <div className='Map'>
                <Map/>
            </div>
        }
        { !isAuthed && 
            <div className='header-particles'> 
                <Particles
                    params={{
                    "particles": {
                        "number": {
                            "value": 150,
                            "density": {
                                "enable": false
                            }
                        },
                        "size": {
                            "value": 3,
                            "random": true,
                            "anim": {
                                "speed": 4,
                                "size_min": 0.3
                            }
                        },
                        "line_linked": {
                            "enable": false
                        },
                        "move": {
                            "random": true,
                            "speed": 1,
                            "direction": "top",
                            "out_mode": "out"
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "bubble"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        },
                        "modes": {
                            "bubble": {
                                "distance": 250,
                                "duration": 2,
                                "size": 0,
                                "opacity": 0
                            },
                            "repulse": {
                                "distance": 400,
                                "duration": 3
                            }
                        }
                    }
                    }} 
                />
                <div className='headerText'>
                    <h1>kopi</h1>
                </div>
            </div>
        }
      </Layout>
    );
  }
}

export default App;
