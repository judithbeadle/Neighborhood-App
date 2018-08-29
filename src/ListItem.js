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
		return(
			<div className={(listItem.title === this.props.activeLocation) && ('active')} onClick={ this.passItemId }>
				<h3>{ listItem.title }</h3>
				<div className="more-info">
					<p dangerouslySetInnerHTML={{ __html: listItem.vicinity }} />
					<p> { listItem.category } </p>
				</div>
			</div>
			
		)
	}
}

export default ListItem