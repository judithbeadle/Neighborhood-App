import React, { Component } from 'react'
import ListItem from './ListItem'

class Sidebar extends Component{

	state = {
		locations: [],
		curCategory: '',
		activeLocation: {}
	}

	// get all locations
   componentDidMount() {
     this.setState({activeLocation: this.props.activeLocation})
   }

   // when clicked, update both list and markers via app activeLocation id
   activateLocation(clickedLocation){
		this.props.onsetActiveLocation(clickedLocation.title)
	}


	changeCategory = (event) => {
		this.setState({
			curCategory: event.target.value
		})
		this.props.onUpdateCategory( event.target.value )
	}

	// the sidebar holds the list of places
	render(){

		// getting the locations array from the parent
		const { locations } = this.props


		return(
			<div className="sidebar-container">
				<header>
					<span className="header-intro" tabindex="0">Going out in</span>
					<h1 className="title" tabindex="1">Sprengelkiez</h1>
				</header>

				<p className="intro">Small but busy. The Sprengelkiez in Berlin Wedding offers plenty of places for going out. Find your new favourite!</p>
				<div className="select-wrapper">
					<select onChange={this.changeCategory} value={this.state.curCategory} title="choose your category">
		                <option value="select" disabled>Select</option>
		                <option value="all">All Categories</option>
		                <option value="bar-pub">Bars and Pubs</option>
		                <option value="restaurant">Restaurants</option>
		                <option value="theatre-music-culture">Culture</option>
		                <option value="dance-night-club">Club</option>
				   	</select>
			   	</div>
				<ol className="locations-list">
					{locations.map((singleLocation) => (
						
						<li key={ singleLocation.id } className="location-item">
							<ListItem 
								activeLocation = { this.props.activeLocation }
								listItem = { singleLocation }
								activateLocation = { (clicked) => this.activateLocation(clicked) }
							/>
						</li>
					))}
					
				</ol>
			</div>
		)
	}
}

export default Sidebar