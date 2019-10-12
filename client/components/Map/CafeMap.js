import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import CafeMarker from "./CafeMarker"

const CafeMap = withScriptjs(withGoogleMap((props) => {
  const markers = props.cafes.map( cafe => {
    let marker = <CafeMarker
                    key={cafe._id}
                    cid={cafe._id}
                    closeMarkers={props.closeOtherMarkers}
                    toggleShowPage={props.toggleShowPage}
                    cafe={cafe}
                    latitude={cafe.position.lat}
                    longitude={cafe.position.lng}
                    activeMarker={cafe._id === props.activeMarker ? true : false}
                  />
    return marker;
  });
  return (
      <GoogleMap
        defaultZoom={14}
        center={ props.location } >
            {markers}
      </GoogleMap>
    )
  }
));

export default CafeMap;