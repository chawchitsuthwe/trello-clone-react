import React from 'react';
import './Card.css';
import Label from './Label';
import Account from './Account'

const Card = ({title,labels,accounts}) => {
	return (
		<div>
			<div className="card" data-toggle="modal" data-target="#card-modal">
    			<div className="d-flex justify-content-start">
    			{labels && labels.map(label => (
	      
	        		label.status === 1 && <Label key={label.id} color={label.color} />
	    	
	    		))}
    			</div>
      			<p>{title}</p>
      			<div className="d-flex justify-content-end">
      			{accounts && accounts.map(account => (
	      
	        		<Account key={account.username} name={account.name} />
	    	
	    		))}
				</div>
    		</div>
		</div>
	)
}

export default Card;