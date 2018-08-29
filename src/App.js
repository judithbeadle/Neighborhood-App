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
      activeLocation: {}
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
   }

   selectMarker(activeMarker) {
      return function() {  
         this.setActiveLocation(activeMarker)
      }
   } 

   // this function takes the click on a list item and updates the active location
   setActiveLocation(selectedItem){
      this.setState({activeLocation: selectedItem})
   }

   setMarkers = (map, category, activeLocation, color) => {
      // check for and clear previously set markers first
      (this.state.markers.length > 0) && (this.state.markers.map(marker => {
         marker.setMap(null)
      }), this.state.markers = []
      )
      // set markers based current array of locations
      this.state.locations.map(location => {
         let position = { lat: location.position[0], lng: location.position[1] };
         let name = location.title
         let id = location.id
         let locationObject = location


         const marker = new window.google.maps.Marker({
           position: position,
           animation: window.google.maps.Animation.DROP,
           icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: color,
              fillOpacity: .5,
              strokeColor: 'white',
              strokeWeight: .5,
              scale: 10
            },
           map: map,
           title: 'marker for ' + location.title
         })

         const infowindow = new window.google.maps.InfoWindow({
            content: name
         });

         console.log(marker.icon.fillColor)

         window.google.maps.event.addListener(marker, 'click', this.selectMarker(infowindow, locationObject).bind(this));

         this.state.markers.push(marker)

      })
   }



   render() {
      
         
      return (
        <div className="App">
          
          {/* #map is targeted by the initMap function to create the map */}
          <div id="map">
            <Map
              // passing setMarkers function to the map
              onSetMarkers={(map) => this.setMarkers(map)}
              //onUpdateMarkers={(map) => this.updateMarkers(map)}
            />
          </div>
          <div id="sidebar">
            <Sidebar 
                // pass locations to show to the sidebar for the locations list
                locations = {this.state.locations}
                // category can be updated via sidebar, so this function needs to pass the current category
                onUpdateCategory={(category) => this.setCategory(category)}

                activeLocation = {this.state.activeLocation}
                onsetActiveLocation={(selectedLocation) => this.setActiveLocation(selectedLocation)}
            />

          </div>

        </div>
      );
    }
}

export default App;
