import React from 'react';
import './List.css';
import Card from './Card';

const List = ({list, listActionDisplay, cardClicked, addNewCardDisplay}) => {

	return (
		<div>
			<div className="list">
				<div className="d-flex justify-content-between align-items-center mb-1">
	  				<h6 className="pl-2">{list.title}</h6>
	  				<button id="list-action-btn" 
	  					className="btn btn-sm" 
	  					onClick={ (e)=> listActionDisplay(e, list.id) }>
	  					<i className="fa fa-ellipsis-h"></i>
	  				</button>
				</div>

				{list.cards && list.cards.map(card => (
	      
	        	card.status === 1 && 
	        	<Card key={card.id} 
	        		card={card} 
	        		listTitle={list.title} 
	        		cardClicked={cardClicked} />
	    	
	    		))}
	    		<div className="d-flex justify-content-between align-items-center mt-2">
	  				<button className="btn btn-sm btn-new-card text-left w-100" id="add-card-btn" onClick={(e) => addNewCardDisplay(e, list.id)}>
	    				<i className="fa fa-plus"></i>&nbsp;&nbsp;Add another card
	  				</button>
	  				<button className="btn btn-sm"><i className="fa fa-window-restore"></i></button>
				</div>
			</div>
	    </div>
	)
}

export default List;