// TODO move map component here
import React, { Component } from 'react';
import { Polygon } from 'react-google-maps';


class Map extends Component {

  // build the map

  initMap = () => {

    // Define the LatLng coordinates for the polygon's path.
    const sprengelLatLngs = [
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
    const sprengelkiez = new window.google.maps.Polygon({
      paths: sprengelLatLngs,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 1
    });

    const sprengelCenter = {
      lat: 52.5462305, lng: 13.3591175
    }
    const map = new window.google.maps.Map(document.getElementById('map'), {
      // set center point
      center: sprengelCenter,
      // set zoom level
      zoom: 15,
      // set styles - see https://mapstyle.withgoogle.com/
      styles: []


    });

    sprengelkiez.setMap(map);
    
    const marker = new window.google.maps.Marker({
      position: sprengelCenter,
      map: map,
      titel: 'First Marker'
    })
  }


  // Lifecycle Event - first call to do stuff
  componentDidMount(){
    this.loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyDT_aopfo8YkyGYkbDGcuwtVEHCl3k4Ays&v=3&callback=initMap")
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

  

  
  render(){
    return(
      <div>Map Template</div>
    );
  }
};

export default Map;