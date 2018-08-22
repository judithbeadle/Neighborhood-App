import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar.js';
import Map from './Map.js';

class App extends Component {

  locations = [
    { name: 'Location Name' },
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

            <Map />
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
