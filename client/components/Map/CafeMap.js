import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');

import CafeMarker from './CafeMarker';
import ClusterMarkerIcon from '../../assets/images/ClusterMapMarker.png';
//<div>Icons made by <a href="https://www.flaticon.com/authors/pixelmeetup" title="Pixelmeetup">Pixelmeetup</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>

const customMap = require('./Map.json');

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
      defaultCenter={props.location}
      defaultOptions={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: customMap}}>
        <MarkerClusterer
          onClick={props.clusterClick}
          averageCenter
          enableRetinaIcons
          gridSize={60}
          styles={[{
              url: ClusterMarkerIcon,
              height: 32,
              width: 32,
              textColor:"#FFF"
            }]}>
          {markers}
        </MarkerClusterer>
    </GoogleMap>
  )
}));

export default CafeMap;