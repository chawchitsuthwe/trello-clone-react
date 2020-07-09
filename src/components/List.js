import React from 'react';
import './List.css';
import Card from './Card'

const List = ({url, listId, title, cards, displayListActionPopup}) => {

	return (
		<div>
			<div className="list">
				<div className="d-flex justify-content-between align-items-center mb-1">
	  				<h6 className="pl-2">{title}</h6>
	  				<button id="list-action-btn" className="btn btn-sm" onClick={ (e)=> displayListActionPopup(e, listId) }><i className="fa fa-ellipsis-h"></i></button>
				</div>

				{cards && cards.map(card => (
	      
	        	card.status === 1 && <Card key={card.id} title={card.title} labels={card.labels} accounts={card.accounts} />
	    	
	    		))}
	    		<div className="d-flex justify-content-between align-items-center">
	  				<button className="btn btn-sm btn-new-card text-left w-100" id="add-new-card">
	    				<i className="fa fa-plus"></i>&nbsp;&nbsp;Add another card
	  				</button>
	  				<button className="btn btn-sm"><i className="fa fa-window-restore"></i></button>
				</div>

					{/* ${getCard(list[i].cards)} 

				<div className="d-flex justify-content-between align-items-center">
	  				<button className="btn btn-sm btn-new-card text-left" id="add-new-card">
	    				<i className="fa fa-plus"></i>&nbsp;&nbsp;Add another card
	  				</button>
	  				<button className="btn btn-sm"><i className="fa fa-window-restore"></i></button>
				</div>*/}
			</div>
	    </div>
	)
}

export default List;