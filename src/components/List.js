import React, { useState } from 'react';
import './List.css'
import Axios from "axios";

const List = ({listId,url,title}) => {

	const listActionPopup = document.getElementById("list-action-popup");
	console.log(listActionPopup)

	const [list, setList] = useState({});

	return (
		<div>
			<div className="list">
				<div className="d-flex justify-content-between align-items-center mb-1">
	  				<h6 className="pl-2">{title}</h6>
	  				<button id="list-action-btn" className="btn btn-sm"><i className="fa fa-ellipsis-h"></i></button>
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