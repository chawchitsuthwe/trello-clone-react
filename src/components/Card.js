import React from 'react';
import './Card.css';
import Label from './Label';
import Account from './Account';

const Card = ({id,title,listTitle,labels,accounts, cardClicked}) => {

	return (
		<div>
			<div className="card" id="card" data-toggle="modal" data-target="#card-modal" onClick={ () => cardClicked(listTitle,id) }>
    			<div className="d-flex justify-content-start">
    			{labels && labels.map(label => (
	      
	        		label.status === 1 && <Label key={label.id} label={label} condition="noName" />
	    	
	    		))}
    			</div>
      			<p>{title}</p>
      			<div className="d-flex justify-content-end">
      			{accounts && accounts.map(account => (
	      
	        		<Account key={account.username} account={account} />
	    	
	    		))}
				</div>
    		</div>
		</div>
	)
}

export default Card;