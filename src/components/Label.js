import React from 'react';
import './Label.css';

const Label = ({color}) => {
	return (
		<div>
			<div className="card-label" style= {{backgroundColor: color}}></div>
		</div>
	)
}

export default Label