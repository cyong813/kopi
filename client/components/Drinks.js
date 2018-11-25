import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Drinks extends Component {
    constructor() {
        super()
        this.state = {
          data: []
        };
        this.getData = this.getData.bind(this);
    }

    getData(event) {
        axios.get('/getAllDrinks')
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
          <div className="Drinks">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th className='col'>Drinks</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map(function(drink) {
                    return <tr>
                              <td className='counterCell'></td>
                              <td className='col'>{drink.drink_name}</td>
                            </tr>
                  })}
                </tbody>
              </table>
            </div>
        );
      }
}

export default Drinks;