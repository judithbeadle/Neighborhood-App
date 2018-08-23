import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar.js';
import Map from './Map.js';

class App extends Component {

  locations = [
    { name: 'Location Nme' },
    { name: 'reggrvdv' },
    { name: 'tbsbt' },
    { name: 'bvtstvrt' },
    { name: 'Location Name' }
  ]

  

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
              locations = {this.locations}
            />

          </div>

        </div>
      );
    }
}


export default App;
