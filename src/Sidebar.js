import React, { Component } from 'react'
import ListItem from './ListItem'

class Sidebar extends Component{
	// the sidebar holds the list of places
	render(){
		return(
			<div className="List">
				<h2>In the Neighborhood</h2>
				<ol>
					<ListItem />
				</ol>
			</div>
		)
	}
}

export default Sidebar