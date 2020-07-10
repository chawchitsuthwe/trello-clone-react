import React from 'react';
import './Account.css'

const Account = ({account}) => {
	
	const getInitials = (name) => {
		var initials;
		
		var names = name.split(' ');
	    initials = names[0].substring(0, 1).toUpperCase();
	    
	    if (names.length > 1) {
	        initials += names[names.length - 1].substring(0, 1).toUpperCase();
	    }

	    return initials;
	}


	return (
		<div>
			<div className="card-member mr-1">{ getInitials(account.name) }</div>
		</div>
	)
}

export default Account