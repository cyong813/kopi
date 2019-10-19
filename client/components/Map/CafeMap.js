import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');
import CafeMarker from './CafeMarker';

const CafeMap = withScriptjs(withGoogleMap((props) => {
  const markers = props.cafes.map(cafe => {
    let marker = <CafeMarker
                    key={cafe._id}
                    cid={cafe._id}
                    cafe={cafe}
                    onClick={props.onClick.bind(this, cafe._id)}
                    location={{lat: cafe.position.lat, lng: cafe.position.lng}}
                    activeMarker={props.activeMarker} />
    return marker;
  });
  return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={props.location}>
          <MarkerClusterer
            onClick={props.clusterClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}>
              {markers}
          </MarkerClusterer>
      </GoogleMap>
    )
  }
));

export default CafeMap;