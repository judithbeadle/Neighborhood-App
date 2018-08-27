import React, { Component } from 'react'
import ListItem from './ListItem'

class Sidebar extends Component{

	state = {
		locations: [],
		curCategory: '',
		activeId: ''
	}

	// function to get parent to update list on click
	updateLocations = (locations) => {
		this.props.onUpdateLocations(locations)
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
		const { className } = 'active'


		return(
			<div className="List">
				<h2>In the Neighborhood</h2>

				

				<select onChange={this.changeCategory} value={this.state.curCategory}>
	                <option value="select" disabled>Select</option>
	                <option value="all">All</option>
	                <option value="restaurant">Restaurants</option>
	                <option value="bar-pub">Bars and Pubs</option>
	                
			   </select>
				<ol>
					{locations.map((singleLocation) => (
						
						<li key={ singleLocation.id } className={ className }>
							<ListItem 
								itemKey = {singleLocation.id}
								locationName= { singleLocation.title } // returns a string
								address= { singleLocation.vicinity } // returns a html formated string
								position= { singleLocation.position } // returns an array of latlang values
								category = { singleLocation.category } // returns a html formated string
							/>
						</li>
					))}
					
				</ol>
			</div>
		)
	}
}

export default Sidebar