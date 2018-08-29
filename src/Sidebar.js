import React, { Component } from 'react'
import ListItem from './ListItem'

class Sidebar extends Component{

	state = {
		locations: [],
		curCategory: '',
		activeLocation: {}
	}

	// get all locations
   componentDidMount() {
     this.setState({activeLocation: this.props.activeLocation})
   }

   // when clicked, update both list and markers via app activeLocation id
   activateLocation(clickedLocation){
		this.props.onsetActiveLocation(clickedLocation.title)
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

				<p>{this.state.activeLocation.title}</p>

				<select onChange={this.changeCategory} value={this.state.curCategory}>
	                <option value="select" disabled>Select</option>
	                <option value="all">All</option>
	                <option value="restaurant">Restaurants</option>
	                <option value="bar-pub">Bars and Pubs</option>
	                
			   </select>
				<ol>
					{locations.map((singleLocation) => (
						
						<li key={ singleLocation.id } className={ className } >
							<ListItem 
								activeLocation = { this.state.activeLocation }
								listItem = { singleLocation }
								activateLocation = { (clicked) => this.activateLocation(clicked) }
							/>
						</li>
					))}
					
				</ol>
			</div>
		)
	}
}

export default Sidebar