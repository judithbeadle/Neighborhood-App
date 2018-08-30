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
		let ariaExpanded = "false"
		let ariaHidden = "true"

		if(listItem.title === this.props.activeLocation){
			className = 'location-container active'
			ariaExpanded = "true"
			ariaHidden = "false"
		} else {
			className = 'location-container'
		}
		
		return(
			<div className={className}>
				<h3 className="place-title" tabIndex="0" role="button" onClick={ this.passItemId } onKeyPress={ this.passItemId } aria-pressed={ariaExpanded}>{ listItem.title } </h3>
				<div className="place-info" aria-expanded={ariaExpanded} aria-hidden={ariaHidden}>
					<p dangerouslySetInnerHTML={{ __html: listItem.vicinity }} />
					<p> { listItem.category.replace("-", ", ") } </p>
				</div>
			</div>
			
		)
	}
}

export default ListItem