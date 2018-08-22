// TODO move map component here
import React, { Component } from 'react';


class Map extends Component {


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
    const sprengelArea = {lat: 52.541976, lng: 13.3467278}
    const map = new window.google.maps.Map(document.getElementById('map'), {
      // set center point
      center: sprengelArea,
      // set zoom level
      zoom: 15,
      // set styles - see https://mapstyle.withgoogle.com/
      styles: []
    });
    
    const marker = new window.google.maps.Marker({
      position: sprengelArea,
      map: map,
      titel: 'First Marker'
    })
  }

  
  render(){
    return(
      <div>Map Template</div>
    );
  }
};

export default Map;