import React from 'react';
import './Card.css';
import Label from './Label';
import Account from './Account';

const Card = ({card, listTitle, cardClicked}) => {

	return (
		<div>
			<div className="card" id="card" data-toggle="modal" data-target="#card-modal" onClick={ () => cardClicked(listTitle,card.id) }>
    			<div className="d-flex justify-content-start">
    			{card.labels && card.labels.map(label => (
	      
	        		label.status === 1 && <Label key={label.id} label={label} condition="noName" />
	    	
	    		))}
    			</div>
      			<p>{card.title}</p>
      			<div className="d-flex justify-content-end">
      			{card.accounts && card.accounts.map(account => (
	      
	        		<Account key={account.username} account={account} />
	    	
	    		))}
				</div>
    		</div>
		</div>
	)
}

export default Card;