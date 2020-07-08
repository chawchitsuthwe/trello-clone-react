import React from 'react';
import './AddNewListBtn.css'

const AddNewListBtn = () => {
	return (
		<div>
		<button id="add-list-btn" className="btn btn-sm btn-new-list text-left" onClick="addNewList(event)">
	        <i className="fa fa-plus"></i>&nbsp;&nbsp;Add another list
		</button>
	  	<div style={{width: "0.5rem"}}>&nbsp;</div>
	  	</div>
	)
}

export default AddNewListBtn;