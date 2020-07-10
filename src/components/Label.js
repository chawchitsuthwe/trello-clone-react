import React from 'react';
import './Label.css';

const Label = ({label, condition}) => {
	return (
		<div>
		{ condition && condition ==="noName" &&
			<div className="card-label" style= {{backgroundColor: label.color}}></div>
		}
		{ condition && condition ==="withName" &&
			<div className="card-label-name" style= {{backgroundColor: label.color}}>{label.name}</div>
		}
		</div>
	)
}

export default Label