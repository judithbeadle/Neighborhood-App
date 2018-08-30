import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar.js';
import Map from './Map.js';
import * as LocationsAPI from './LocationsAPI'
import menuOpen from './icons/menu-open.svg';
import menuClose from './icons/menu-close.svg';

class App extends Component {

   state = {
      initialResult: [],
      locations: [],
      markers: [],
      curCategory: '',
      activeLocation: '',
      activeMarker: {},
      map: {},
      sidebarOpen: true       
   }

   // get all locations
   componentDidMount() {
      LocationsAPI.getAll()
      .then((initialResult) => {
         this.setState({ initialResult })
         this.setCategory('all')
      }).catch((error) => {
        alert('Error while getting API data')
        console.log('Error while getting API data')
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
      this.setState({sidebarOpen: true});
      let activeMarker = this.state.markers.find(al => { return al.title === activeLocation })
      this.setState({activeMarker: activeMarker})
      this.setState({activeLocation: activeLocation})
      this.state.markers.map((marker) => (
         marker.setIcon('icons/pointer.png')
      ))
      this.bounceMarker(activeMarker)
   }

   bounceMarker(activeMarker){

      activeMarker.setIcon('icons/pointer-active.png')
      activeMarker.setAnimation(window.google.maps.Animation.BOUNCE)

      setTimeout(function() {
           activeMarker.setAnimation(null)
       }, 1000);
   }

   setMarkers = (map, locations, activeLocation) => {
      
      // check for and clear previously set markers first
      if(this.state.markers.length > 0){
         this.state.markers.map(marker => (
            marker.setMap(null)
         ))
         this.state.markers = []
      }
      // set markers based current array of locations
      locations.map(location => {
         let position = { lat: location.position[0], lng: location.position[1] };

         const marker = new window.google.maps.Marker({
            position: position,
            animation: window.google.maps.Animation.DROP,
            icon:  'icons/pointer.png',
            map: map,
            title: location.title
         })
         window.google.maps.event.addListener(marker, 'click', this.selectMarker(marker).bind(this))

         this.state.markers.push(marker)
      })
      
   }

   toggleSidebarVisibility = (event) => {
      console.log('pressed a button')
      if(this.state.sidebarOpen === true){
         this.setState({sidebarOpen: false})
      } else {
         this.setState({sidebarOpen: true})
      }
   }



   render() {
      let classNameSidebar
      let menuIcon
      if(this.state.sidebarOpen === true){
         classNameSidebar = 'show'
         menuIcon = menuOpen
      } else {
         classNameSidebar = 'hide'
         menuIcon = menuClose
      }
      return (

        <div className="app">
              
          <main id="sidebar" className={classNameSidebar} tabIndex="0">
            <button tabIndex="0" className="menu" aria-label="Click for a full list of neighborhood places" onClick={ this.toggleSidebarVisibility } aria-expanded={this.state.sidebarOpen}>
               <span className="screen-reader-text">Show Sidebar</span>
               <span className="icon"><img src={menuIcon} className="menu-icon" alt=""/></span>
            </button>
            <Sidebar 
                // pass locations to show to the sidebar for the locations list
                locations = {this.state.locations}

                // category can be updated via sidebar, so this function needs to pass the current category
                onUpdateCategory={(category) => this.setCategory(category)}

                activeLocation = {this.state.activeLocation}
                onsetActiveLocation={(selectedLocation) => this.setActiveLocation(selectedLocation)}
            />

          </main>
          {/* #map is targeted by the initMap function to create the map */}
          <div id="map" title="Google Map" role="application" tabIndex="-1">
            <Map
              // passing setMarkers function to the map
              // onSetMarkers={(map) => this.setMarkers(map)}
              onGetMap = {(map) => this.getMap(map)}
              //onUpdateMarkers={(map) => this.updateMarkers(map)}
            />
          </div>

        </div>
      );
    }
}

export default App;
