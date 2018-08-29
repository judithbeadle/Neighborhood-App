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
      activeLocation: '',
      activeMarker: {},
      map: {},
      sidebarOpen: false
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

   getMap(map){
    this.state.map = map
   }

   setCategory(category){
      let map = this.state.map
      // taking the category and making it available to all functions via state
      this.setState({curCategory: category})
      // defining locations within the function, so we don't have to wait for the setState function to finish before creating markers on the map
      let locations
      // for initial view and 'all' - no filtering necessary, just show the initial result
      if(category === 'all'){
         this.setState({locations: this.state.initialResult})
         locations = this.state.initialResult
      } else {
         // filter locations by category
         let filtered = this.state.initialResult.filter(location => (
            // this is the function to filter the intial result and set up default list of locations
            location.category === category
            //console.log(this.state.curCategory) // this is just for testing purposes - TODO figure out how to implement the containsLocation() function
            )
         )
         this.setState({locations: filtered})
         locations = filtered
      }
      this.setMarkers(map, locations)

      console.log(map, category)
   }

   selectMarker(activeMarker) {
      return function() {  
         this.setActiveLocation(activeMarker.title)
      }
   }

   // this function takes the click on a list item and updates the active location
   setActiveLocation(activeLocation){
      this.state.sidebarOpen = true;
      let activeMarker = this.state.markers.find(al => { return al.title === activeLocation })
      this.setState({activeMarker: activeMarker})
      this.setState({activeLocation: activeLocation})
      this.state.markers.map((marker) => {
         marker.setIcon({
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: 'yellow',
            fillOpacity: 0.8,
            strokeWeight: 1
        })
      })
      this.bounceMarker(activeMarker)
   }

   bounceMarker(activeMarker){

      activeMarker.setIcon({
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#00F",
            fillOpacity: 0.8,
            strokeWeight: 1
        })
      activeMarker.setAnimation(window.google.maps.Animation.BOUNCE)

      setTimeout(function() {
           activeMarker.setAnimation(null)
       }, 1000);
   }

   setMarkers = (map, locations, activeLocation) => {
      
      // check for and clear previously set markers first
      (this.state.markers.length > 0) && (this.state.markers.map(marker => {
         marker.setMap(null)
      }), this.state.markers = []
      )
      // set markers based current array of locations
      locations.map(location => {
         let position = { lat: location.position[0], lng: location.position[1] };
         let name = location.title
         let id = location.id
         let locationObject = location

         const infowindow = new window.google.maps.InfoWindow({
             content: name
         });

         const marker = new window.google.maps.Marker({
           position: position,
           animation: window.google.maps.Animation.DROP,
           icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: 'yellow',
              fillOpacity: .1,
              strokeColor: 'white',
              strokeWeight: .5,
              scale: 10
            },

            map: map,
            title: location.title
         })
         window.google.maps.event.addListener(marker, 'click', this.selectMarker(marker).bind(this))

         this.state.markers.push(marker)
      })
      
   }



   render() {
      let classNameSidebar
      if(this.state.sidebarOpen === true){
         classNameSidebar = 'show'
      } else {
         classNameSidebar = 'hide'
      }
      return (
        <div className="app">
          
          {/* #map is targeted by the initMap function to create the map */}
          <div id="map">
            <Map
              // passing setMarkers function to the map
              // onSetMarkers={(map) => this.setMarkers(map)}
              onGetMap = {(map) => this.getMap(map)}
              //onUpdateMarkers={(map) => this.updateMarkers(map)}
            />
          </div>
          <div id="sidebar" className={classNameSidebar}>
            <div className="menu">Menu</div>
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
