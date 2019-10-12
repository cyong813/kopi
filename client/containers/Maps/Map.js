import React, { Component } from "react";
import axios from 'axios';
import CafeMap from "../../components/Map/CafeMap";

class Map extends Component {
	state = {
		cafes: [],
		latitude: 40.662895,
		longitude: -73.991554,
		activeMarker: null
	}

	getCafeNamesAndPos(event) {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios.get('/cafe')
		.then(function(response) {
			event.setState({cafes: response.data});
		})
		.catch((error) => {
			// if (error.response.status === 401) {
			//   this.props.history.push("/login");
			// }
		});
	}

	componentDidMount() {
		this.getCafeNamesAndPos(this);
	}

	componentDidUpdate(prevState) {
		if (prevState.cafes !== this.state.cafes) {
			this.setState({
				cafes: nextProps.cafes,
				latitude: nextProps.latitude,
				longitude: nextProps.longitude
			});
		}
	}

	closeOtherMarkers = (cid) => {
		this.setState({activeMarker: cid})
	}

	render() {
		const cafes = this.state.cafes;
		return (
				<CafeMap
					cafes={cafes}
					latitude={this.state.latitude}
					longitude={this.state.longitude}
					googleMapURL={process.env.GOOGLE_MAPS_API_KEY}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `600px`, width: `600px` }} />}
					mapElement={<div style={{ height: `100%` }} />}
					toggleShowPage={this.props.toggleShowPage}
					activeMarker={this.state.activeMarker}
					closeOtherMarkers={this.closeOtherMarkers}
				/>
		);
	}
}

export default Map;