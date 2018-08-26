import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar.js';
import Map from './Map.js';
import * as LocationsAPI from './LocationsAPI'

class App extends Component {

   state = {
      //initialResult: [],
      locations: [],
      markers: [],
      curCategory: 'bar-pub',
      showingLocations: []
   }

   // get all locations
   componentDidMount() {
     LocationsAPI.getAll()
     .then((initialResult) => {
        //this.setState({ initialResult })
        this.getLocationsInArea(initialResult)
        //this.setState({ locations: initialResult }) // this needs to be  removed here and get set as a filtered result matching ploygon
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
   }

   getLocationsInArea(result){
      // filter locations on area
      let locationsInArea = result.filter(location => (
         location.title.length > 8
         )
      )

      this.setState({locations: locationsInArea})

     console.log(locationsInArea);
     this.setState( { locations: locationsInArea })
   }

   setMarkers = (map) => {

      let newLocations = this.state.locations.filter(location => (
         location.category === this.state.curCategory
         )
      )

      // then create new ones based on current array of locations
      newLocations.map(location => {

         let llat = location.position[0]
         let llng = location.position[1]
         let position = { lat: llat, lng: llng }

         const marker = new window.google.maps.Marker({
           position: position,
           map: map
         })
         this.state.markers.push(marker)
         console.log('Just created this  '+ marker + ' on this ' + map)
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
              locations = {this.state.locations}
            />

          </div>

        </div>
      );
    }
}

export default App;
