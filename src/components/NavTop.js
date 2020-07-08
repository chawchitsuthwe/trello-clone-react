import React from 'react'
import './NavTop.css';
import profile from './../assets/profile.jpeg'

const NavTop = () => {
	return (
		<nav id="first-nav" className="d-flex justify-content-between first-nav text-light">
	      	<div className="d-flex">
	        	<button className="btn btn-sm text-light m-1"><i className="fa fa-th"></i></button>
	        	<button className="btn btn-sm text-light m-1"><i className="fa fa-home"></i></button>
	        	<button className="btn btn-sm text-light m-1 font-weight-bold"><i className="fa fa-th-list"></i>&nbsp;&nbsp;Boards</button>
	      	</div>

	      	<div className="d-flex justify-content-center align-items-center logo">Trello</div>
	      
	      	<div className="d-flex">
	        	<button className="btn btn-sm text-light m-1"><i className="fa fa-plus"></i></button>
	        	<button className="btn btn-sm text-light m-1"><i className="fa fa-info-circle"></i></button>
	        	<button className="btn btn-sm text-light m-1"><i className="fa fa-bell"></i></button>
	        	<img src={profile} className="profile" alt="profile" />
	      	</div>
	    </nav>
	);
};

export default NavTop;