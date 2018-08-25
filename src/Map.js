import React, { Component } from 'react';

class Map extends Component {

  state = {
    map: {}
  }
 
  // Lifecycle Event - first call to do stuff
  componentDidMount(){
    this.loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyDT_aopfo8YkyGYkbDGcuwtVEHCl3k4Ays&v=3&callback=initMap")
  }
  // build the map
  initMap = () => {

    // Define the coordinates for the polygon's path.
    const coordinates = [
      { lat: 52.5462305, lng: 13.3591175 },
      { lat: 52.543986 , lng: 13.3549976 },
      { lat: 52.5421329, lng: 13.3495474 },
      { lat: 52.5405734, lng: 13.3471977 },
      { lat: 52.5389877, lng: 13.3451056 },
      { lat: 52.5387006, lng: 13.3478308 },
      { lat: 52.5396142, lng: 13.3538604 },
      { lat: 52.5378392, lng: 13.3610916 },
      { lat: 52.5411281, lng: 13.368237 },
      { lat: 52.5462305, lng: 13.3591175 },
    ]

    // Construct the polygon.
    const area = new window.google.maps.Polygon({
      paths: coordinates,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.2
    });

    // define coordinates for the centre of the map
    const mapCenter = {
      lat: 52.541932, lng: 13.357156
    }

    // create the map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      // set center point
      center: mapCenter,
      // set zoom level
      zoom: 15,
      // set styles - see https://mapstyle.withgoogle.com/
      styles: []
    });

    // make the map var available for the render function
    this.setState({map: map})

    // display the area on the map
    area.setMap(map);
    
  }
  
  // create a script tag that takes the url and passes the key to the google api
  // this will then call the initMap function
  loadMap = (url) => {
    const index = window.document.getElementsByTagName("script")[0]
    const script = window.document.createElement("script")
    script.src = url 
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
    window.initMap = this.initMap
  }

  render(){

    // grabbing the map object via state for the parent App.js set Markers 
    let map = this.state.map
    // run the set Markers function in the parent passing the map object
    this.props.onSetMarkers(map)

    // nothing to return from here
    return(null)
  }
}

export default Map