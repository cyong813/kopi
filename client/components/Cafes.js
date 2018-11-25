import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
//import AddCafe from './AddCafe';

class Cafes extends Component {
    constructor() {
        super()
        this.state = {
          data: []
        };
        this.getData = this.getData.bind(this);
    }

    getData(event) {
        axios.get('/getAllCafes')
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
          <div className="Cafes">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th className='button-col'>Cafes</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map(function(cafe) {
                    return <tr>
                              <td className='counterCell'></td>
                              <td className='button-col'>{cafe.cafe_name}</td>
                              <td className='button-col'>{cafe.drinks}</td>
                            </tr>
                  })}
                </tbody>
              </table>
            </div>
        );
      }
}

export default Cafes;