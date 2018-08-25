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
      markers: [],
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

   clearMarkers = () => {
      this.state.markers.map(marker => {
         marker.setMap(null)
         console.log('I have deleted a marker')
      })
   }

   setMarkers = (map) => {

      // then create new ones based on current array of locations
      this.state.locations.map(location => {
         let llat = location.position[0]
         let llng = location.position[1]
         let position = { lat: llat, lng: llng }

         const marker = new window.google.maps.Marker({
           position: position,
           map: map
         })
         this.state.markers.push(marker)
         console.log('Just created this  '+ marker + ' on this ' + map)
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
              onClearMarkers={(map) => this.clearMarkers(map)}
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
