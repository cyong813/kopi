import React, { Component } from 'react';
import axios from 'axios';
import CafeMap from '../../components/Map/CafeMap';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cafes: [],
			latitude: 40.662895,
			longitude: -73.991554,
			activeMarker: false,
			key: 'https://maps.googleapis.com/maps/api/js?key='+GOOGLE_MAPS_API_KEY+'&libraries=geometry,drawing,places'
		};
	}

	getCafeNamesAndPos(event) {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios.get('/cafe?category=names,pos,id')
		.then(function(res) {
			event.setState({cafes: res.data});
		})
		.catch((err) => {
			if (err.res.status === 401) {
			  this.props.history.push("/login");
			}
		});
	};

	componentDidMount() {
		this.getCafeNamesAndPos(this);
	};

	closeOtherMarkers = (cid) => {
		this.setState({activeMarker: cid});
	};

	onMarkerClustererClick = (markerClusterer) => {
		const clickedMarkers = markerClusterer.getMarkers()
		//console.log(`Current clicked markers length: ${clickedMarkers.length}`)
		//console.log(clickedMarkers)
	};

	render() {
		return (
			<CafeMap
				cafes={this.state.cafes}
				location={ {lat: this.state.latitude, lng: this.state.longitude} }
				googleMapURL={this.state.key}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `800px`, width: `100%` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				activeMarker={this.state.activeMarker}
				onClick={this.closeOtherMarkers}
				clusterClick={this.onMarkerClustererClick}
			/>
		);
	}
}

export default Map;