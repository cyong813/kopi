import React, { Component } from 'react';
import axios from 'axios';

class Cafes extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    };
    this.getData = this.getData.bind(this);
  }

  getData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/getAllCafes')
      .then(function(response) {
        event.setState({data: response.data});
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.props.history.push("/login");
        }
    });
  }
    
  componentDidMount() {
    this.getData(this);
  }
    
  logout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  componentWillReceiveProps(nextProps) {
    this.getData(this);
  }

  render() {
    return (
      <div className="Cafes">
        {localStorage.getItem('jwtToken') &&
          <button class="btn btn-primary" onClick={this.logout}>Logout</button>
        }
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='col'>Cafes</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(cafe) {
              return <tr>
                        <td className='counterCell'></td>
                        <td className='col'>{cafe.cafe_name}</td>
                        <td className='col'>{cafe.drinks}</td>
                     </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Cafes;