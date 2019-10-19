import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

import MarkerIcon from '../../assets/images/map-marker.png';
import CafeMapCard from './CafeMapCard';

// Location pin from flaticon.com

class CafeMarker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen}, () => {
        if (!this.state.isOpen) {
          this.setState({activeMarker: false}, () => {
            this.props.onClick(null);
          })
        } else{
          this.props.onClick(this.props.cid);
        }
      }
    )
  }

  render() {
    return (
      <div>
        <Marker 
                icon={{ url: MarkerIcon }}
                onClick={this.toggleOpen}
                position={this.props.location}>
            { this.props.activeMarker === this.props.cid && this.state.isOpen ?
              <InfoWindow
                maxWidth={800}
                defaultPosition={this.props.location}
                onClick={this.toggleOpen}> 
                  <CafeMapCard cafe={this.props.cafe}/>
              </InfoWindow> : null
            }
        </Marker>
      </div>
    )
  }
}

export default CafeMarker;