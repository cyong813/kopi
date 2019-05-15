import React, { PureComponent } from "react";
import axios from 'axios';
const _ = require('lodash');
const { compose, withProps, lifecycle, withStateHandlers } = require('recompose');
const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require('react-google-maps');
const { SearchBox } = require('react-google-maps/lib/components/places/SearchBox');
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const Map = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAQPV3EIdzAIRr-epyJlcXgP7D0rjuoA3M&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        markers: [],
        cafes: [],
        bounds: null,
        center: {
          lat: 40.662895, lng: -73.991554
        },
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          console.log(places);

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter
          });
        },
      });
      // Get all cafe lat/lng and names
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get("/getAllCafesPos")
        .then(result => {
          this.setState({ markers: result.data });
        })
        .catch((error) => {
          this.setState({ markers: [] });
      });
      axios.get("/getAllCafes")
        .then(result => {
          this.setState({ cafes: result.data });
        })
        .catch((error) => {
          this.setState({ cafes: [] });
      });

    },
  }),
  withStateHandlers(() => ({
    isOpen: false,
    activeKey: null
  }), {
    onToggleOpen: ({ isOpen, activeKey }) => (index) => ({
      isOpen: !isOpen,
      activeKey: index
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={12}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Enter an address"
        style={{
          boxSizing: 'border-box',
          border: '1px solid',
          width: '400px',
          height: '32px',
          marginTop: '27px',
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipses',
        }}
      />
    </SearchBox>
    
    {props.markers.map((marker, index) =>
      <Marker
        key={index} 
        position={marker.position}
        onClick={() => { props.onToggleOpen(index) }} >
          {props.isOpen && props.activeKey === index && 
            <InfoBox
              onCloseClick={props.onToggleOpen}
              options={{ closeBoxURL: ``, enableEventPropagation: true }}>
                <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
                  <div style={{ fontSize: `12px`, fontColor: `#08233B`, margin: `0 auto` }}>
                    <p><b>{props.cafes[index].cafe_name}</b></p>
                    <p>{props.cafes[index].address}</p>
                    <p><i>{(props.cafes[index].categories).toString()}</i></p>
                  </div>
                </div>
          </InfoBox>}
      </Marker>
    )}
  </GoogleMap>
);

<Map />;

export default Map;