import React, { Component } from 'react';
import axios from 'axios';

class Cafe extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    };
    this.getData = this.getData.bind(this);
  }

  getData(event) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/cafe/'+this.props.match.params.cafe_name)
      .then(function(response) {
        event.setState({data: response.data});
      })
      .catch((error) => {
        // if (error.response.status === 401) {
        //   this.props.history.push("/login");
        // }
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
            {this.state.data.map(function(cafe) {
              return <div>
                        {cafe.cafe_name}
                     </div>
            })}
      </div>
    );
  }
}

export default Cafe;