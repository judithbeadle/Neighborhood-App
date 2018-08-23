import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 52.541976, lng: 13.3467278 }}
  >
    <Marker
      position={{ lat: 52.541976, lng: 13.3467278 }}
    />
  </GoogleMap>
));




export default Map