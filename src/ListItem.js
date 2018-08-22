import React, { Component } from 'react'

class ListItem extends Component{
	// the sidebar holds the list of places
	render(){
		return(
			
			<p>{this.props.locationName}</p>
			
		)
	}
}

export default ListItem