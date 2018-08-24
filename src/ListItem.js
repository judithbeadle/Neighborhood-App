import React, { Component } from 'react'

class ListItem extends Component{
	// the sidebar holds the list of places
	render(){
		return(
			<div className="list-item-wrapper">
				<h3>{ this.props.locationName }</h3>
				<div className="more-info">
					<p dangerouslySetInnerHTML={{ __html: this.props.address }} />
					<p> { this.props.category } </p>
				</div>
			</div>
			
		)
	}
}

export default ListItem