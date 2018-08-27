import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar.js';
import Map from './Map.js';
import * as LocationsAPI from './LocationsAPI'

class App extends Component {

   state = {
      initialResult: [],
      locations: [],
      markers: [],
      curCategory: '',
      activeMarker: ''
   }

   // get all locations
   componentDidMount() {
     LocationsAPI.getAll()
     .then((initialResult) => {
        this.setState({ initialResult })
        this.setCategory('all')
     }).catch((error) => {
        alert('Error while getting Locations from HERE.com ')
        console.log('Error While Getting All Locations')
      })
   }



   setCategory(category){
      // taking the category and making it available to all functions via state
      this.setState({curCategory: category})
      // for initial view and 'all' - no filtering necessary, just show the initial result
      if(category === 'all'){
         this.setState({locations: this.state.initialResult})
      } else {
         // filter locations by category
         let filtered = this.state.initialResult.filter(location => (
            // this is the function to filter the intial result and set up default list of locations
            location.category === category
            //console.log(this.state.curCategory) // this is just for testing purposes - TODO figure out how to implement the containsLocation() function
            )
         )
         this.setState({locations: filtered})
      }
      this.updateMarkers()
   }

   setActiveMarker (marker) {
      return function() {  
         console.log('this :' + marker)
         this.setState({activeMarker: marker})
      }
   } 

   setMarkers = (map, category) => {

      
      // set markers based current array of locations
      this.state.locations.map(location => {
         let position = { lat: location.position[0], lng: location.position[1] };
         let name = location.title
         let id = location.id

         const marker = new window.google.maps.Marker({
           position: position,
           map: map,
           title: location.title
         })

         const infowindow = new window.google.maps.InfoWindow({
            content: name
         });

         

         window.google.maps.event.addListener(marker, 'click', this.setActiveMarker(id).bind(this));

         this.state.markers.push(marker)

      })
   }


   updateMarkers(map){
      
      this.clearMarkers()
      this.setMarkers(map)
      // update list
   }

    // clear markers off map and markers array for new category query
   clearMarkers = () => {
      this.state.markers.map(marker => {
         marker.setMap(null)
      })
      this.setState({markers: []})
   }





   render() {
      
         
      return (
        <div className="App">
          
          {/* #map is targeted by the initMap function to create the map */}
          <div id="map">
            <Map
              //initialResult = {this.state.initialResult}
              // onUpdateLocations = {(locations, map) => this.updateLocations(locations, map)}
         
              onSetMarkers={(map) => this.setMarkers(map)}
              onUpdateMarkers={(map) => this.updateMarkers(map)}



            />
          </div>
          <div id="sidebar">
            <Sidebar 

               onUpdateCategory={(category) => this.setCategory(category)}
               locations = {this.state.locations}
               selectMarker = {this.state.selectedMarker}
               activeMarker = {this.state.activeMarker}
            />

          </div>

        </div>
      );
    }
}

export default App;
