import React, { Component } from 'react'
import ListItem from './ListItem'

class Sidebar extends Component{
	// the sidebar holds the list of places
	render(){

		const { locations } = this.props

		return(
			<div className="List">
				<h2>In the Neighborhood</h2>
				<ol>
					{locations.map((singleLocation) => (
						<li key={singleLocation.id}>
							<ListItem locationName= {singleLocation.title}/>
						</li>
					))}
					
				</ol>
			</div>
		)
	}
}

export default Sidebar