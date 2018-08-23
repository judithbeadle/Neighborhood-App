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
          {/* Create a place to put the map in the HTML */}
          <div id="map">

            <Map
              googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyBDrid_nZpJckzqU2t51-aGhgxd-LjeDD4&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div className="loading-element" />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
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
