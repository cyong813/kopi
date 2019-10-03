import React, { Component } from 'react';
import Map from '../containers/Maps/Map';
import Layout from '../hoc/Layout/Layout';

class App extends Component {
  render() {
    const isAuthed = localStorage.getItem('jwtToken');
    return (
      <Layout>       
        { isAuthed && <div className='Map'>
          {/* <Map/> */}
        </div>}
      </Layout>
    );
  }
}

export default App;
