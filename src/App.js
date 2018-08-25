import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar.js';
import Map from './Map.js';
import * as LocationsAPI from './LocationsAPI'

class App extends Component {

  state = {
    locations: [],
    query: '',
    showingLocations: []
  }


  // get all locations
  componentDidMount() {
     LocationsAPI.getAll()
     .then((locations) => {
        this.setState({locations})
        this.setState({originalLocations: locations})
      }).catch((error) => {
        alert('Error while getting Locations')
        console.log('Error While Getting All Locations')
      })
  }

  setMarkers = (map) => {

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
