import React, { Component } from 'react'
import ListItem from './ListItem'

class Sidebar extends Component{
	// the sidebar holds the list of places
	render(){

		// getting the locations array from the parent
		const { locations } = this.props

		return(
			<div className="List">
				<h2>In the Neighborhood</h2>
				<ol>
					{locations.map((singleLocation) => (
						
							<ListItem 
								itemKey = {singleLocation.id}
								locationName= { singleLocation.title } // returns a string
								address= { singleLocation.vicinity } // returns a html formated string
								position= { singleLocation.position } // returns an array of latlang values
								category = { singleLocation.category } // returns a html formated string
							/>
						
					))}
					
				</ol>
			</div>
		)
	}
}

export default Sidebar