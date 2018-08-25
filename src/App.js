import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar.js';
import Map from './Map.js';
import * as LocationsAPI from './LocationsAPI'

class App extends Component {

   state = {
      initialResult: [],
      locations: [],
      query: '',
      showingLocations: []
   }

   // get all locations
   componentDidMount() {
     LocationsAPI.getAll()
     .then((initialResult) => {
        this.setState({ initialResult })
        this.setState({ locations: initialResult }) // this needs to be  removed here and get set as a filtered result matching ploygon
      }).catch((error) => {
        alert('Error while getting Locations from HERE.com ')
        console.log('Error While Getting All Locations')
      })
   }

   setMarkers = (map) => {
      // clear old markers

      // then create new ones based on current array of locations
      this.state.locations.map(location => {
         let llat = location.position[0]
         let llng = location.position[1]
         let position = { lat: llat, lng: llng }

         const marker = new window.google.maps.Marker({
           position: position,
           map: map
         })
         console.log('this is the set marker function: ' + map)
      })
   }

   // TODO update locations
         
         // filter current locations by query




  // TODO update query function



   render() {
      return (
        <div className="App">
          
          {/* #map is targeted by the initMap function to create the map */}
          <div id="map">
            <Map
              locations = {this.state.locations}
              onSetMarkers={(map) => this.setMarkers(map)}
            />
          </div>
          <div id="sidebar">

            <Sidebar 
              locations = {this.state.locations}
            />

          </div>

        </div>
      );
    }
}

export default App;
