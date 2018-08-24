import React, { Component } from 'react'

class ListItem extends Component{
	// the sidebar holds the list of places
	render(){
		return(
			<li key={this.props.itemKey}>
			<h3>{this.props.locationName}</h3>
			<p> { this.props.address }</p>
			</li>
			
		)
	}
}

export default ListItem