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
      alert('Error While getting All Locations data from FourSquare API >> Sorry!! Locations Data Will not be loaded or displayed ')
      console.log('Error While Getting All Locations')
    })
  }

  render() {
      return (
        <div className="App">
          
          {/* #map is targeted by the initMap function to create the map */}
          <div id="map">
            <Map
              locations = {this.state.locations}
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
