import React, { Component } from 'react'

class ListItem extends Component{
	state = {
		activeItem: ''
	}

	passItemId = (event) => {
		let listItem= this.props.listItem
		
		this.setState({activeItem: listItem})
		this.props.activateLocation(listItem)
	}

	// the sidebar holds the list of places
	render(){
		let listItem = this.props.listItem
		let className
		if(listItem.title === this.props.activeLocation){
			className = 'location-container active'
		} else {
			className = 'location-container'
		}
		
		return(
			<div className={className} onClick={ this.passItemId }>
				<h3 className="place-title">{ listItem.title }</h3>
				<div className="place-info">
					<p dangerouslySetInnerHTML={{ __html: listItem.vicinity }} />
					<p> { listItem.category.replace("-", ", ") } </p>
				</div>
			</div>
			
		)
	}
}

export default ListItem