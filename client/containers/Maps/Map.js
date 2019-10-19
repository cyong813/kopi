import React, { Component } from 'react';
import axios from 'axios';
import CafeMap from '../../components/Map/CafeMap';

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cafes: [],
			latitude: 40.662895,
			longitude: -73.991554,
			activeMarker: false,
			key: 'https://maps.googleapis.com/maps/api/js?key='+GOOGLE_MAP_API_KEY+'&libraries=geometry,drawing,places'
		}
	}

	getCafeNamesAndPos(event) {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios.get('/cafe')
		.then(function(res) {
			event.setState({cafes: res.data});
		})
		.catch((error) => {
			// if (error.response.status === 401) {
			//   this.props.history.push("/login");
			// }
		});
	};

	// getGoogleMapsKey(event) {
	// 	axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	// 	axios.get('/googleMapsKey')
	// 	.then(function(res) {
	// 		event.setState({key: 'https://maps.googleapis.com/maps/api/js?key='+GOOGLE_MAP_API_KEY+'&libraries=geometry,drawing,places'});
	// 	})
	// 	.catch((error) => {
	// 		// if (error.response.status === 401) {
	// 		//   this.props.history.push("/login");
	// 		// }
	// 	});
	// };

	componentDidMount() {
		this.getCafeNamesAndPos(this);
		//this.getGoogleMapsKey(this);
	};

	closeOtherMarkers = (cid) => {
		this.setState({activeMarker: cid});
	};

	onMarkerClustererClick = (markerClusterer) => {
		const clickedMarkers = markerClusterer.getMarkers()
		console.log(`Current clicked markers length: ${clickedMarkers.length}`)
		console.log(clickedMarkers)
	};

	render() {
		return (
			<CafeMap
				cafes={this.state.cafes}
				location={ {lat: this.state.latitude, lng: this.state.longitude} }
				googleMapURL={this.state.key}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `600px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				activeMarker={this.state.activeMarker}
				onClick={this.closeOtherMarkers}
				clusterClick={this.onMarkerClustererClick}
			/>
		);
	}
}

export default Map;