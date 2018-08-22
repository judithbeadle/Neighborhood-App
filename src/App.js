import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar.js';

class App extends Component {

  // Lifecycle Event - first call to do stuff

  componentDidMount(){
    this.loadMap("http://maps.googleapis.com/maps/api/js?key=AIzaSyDT_aopfo8YkyGYkbDGcuwtVEHCl3k4Ays&v=3&callback=initMap")
  }

  // Load Map

  loadMap = (url) => {
    const index = window.document.getElementsByTagName("script")[0]
    const script = window.document.createElement("script")
    script.src = url 
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
    window.initMap = this.initMap
  }

  // initialize map

  initMap = () => {

    const map = new window.google.maps.Map(document.getElementById('map'), {
      // set center point
      center: {lat: 52.52000659999999, lng: 13.404954},
      // set zoom level
      zoom: 13,
      // set styles - see https://mapstyle.withgoogle.com/
      styles: []
    });
  }

  render() {
      return (
        <div className="App">
          {/* Create a place to put the map in the HTML */}
          <div id="map">map</div>
          <div id="sidebar">

            <Sidebar />

          </div>

        </div>
      );
    }
}


export default App;
