import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar.js';
import Map from './Map.js';
import * as LocationsAPI from './LocationsAPI'

class App extends Component {

   state = {
      initialResult: [],
      locations: [],
      markers: [],
      curCategory: 'test',
      showingLocations: []
   }

   // get all locations
   componentDidMount() {
     LocationsAPI.getAll()
     .then((initialResult) => {
        this.setState({ initialResult })
        this.setCategory('')
     }).catch((error) => {
        alert('Error while getting Locations from HERE.com ')
        console.log('Error While Getting All Locations')
      })
   }

   clearMarkers = () => {
      this.state.markers.map(marker => {
         marker.setMap(null)
         console.log('I have deleted a marker')
      })
      this.setState({markers: []})
   }

   setCategory(category){
      // taking the category and making it available to all functions via state
      this.setState({curCategory: category})
      // for initial view and 'all' - no filtering necessary, just show the initial result
      if(category === ''){
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

   setMarkers = (map, category) => {
      //this.clearMarkers()
      // then create new ones based on current array of locations
      this.state.locations.map(location => {

         let position = { lat: location.position[0], lng: location.position[1] };

         const marker = new window.google.maps.Marker({
           position: position,
           map: map
         })
         this.state.markers.push(marker)
      })
   }

   updateMarkers(map){
      
      this.clearMarkers()
      this.setMarkers(map)
      // update list
   }


  // TODO update query function



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
            />

          </div>

        </div>
      );
    }
}

export default App;
