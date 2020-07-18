import React, { useState } from 'react';
import './AddNewListBtn.css';

const AddNewListBtn = ({saveNewList}) => {

	const [listTitle, setListTitle] = useState("");

	const addNewListDisplay = (e) => {

		const rect = e.target.getBoundingClientRect();

		e.target.nextSibling.style.top = rect.top + "px";
		e.target.nextSibling.style.left = rect.left + "px";
		e.target.nextSibling.style.width = rect.width + "px";
		e.target.nextSibling.style.display = "block";
	}

	const addNewListClose = (e) => {
		e.preventDefault();
		e.target.parentNode.parentNode.parentNode.previousSibling.style.display = "block";
		e.target.parentNode.parentNode.parentNode.style.display = "none";
	}

	const inputEntered = (e, status) => {
	  	if(e.keyCode === 13 && status === "add"){
	    	saveNewList(listTitle);
	    	e.target.parentNode.previousSibling.style.display = "block";
			e.target.parentNode.style.display = "none";
	  	}
	}

	const addOnClick = (e) => {
		saveNewList(listTitle);
		e.target.parentNode.parentNode.previousSibling.style.display = "block";
		e.target.parentNode.parentNode.style.display = "none";
	}

	return (
		<div>
			<button onClick = { e => addNewListDisplay(e) } id="add-list-btn" className="btn btn-sm btn-new-list text-left mr-2">
		        <i className="fa fa-plus"></i>&nbsp;&nbsp;Add another list
			</button>

		  	<div className="rounded trello-fadein p-1" id="add-list-popup">
		        <input type="text" className="w-100" id="list-title-input" 
		        value={listTitle} 
		        onChange= { e => setListTitle(e.target.value) } 
		        onKeyUp = { e => inputEntered(e,'add') } 
		        />
		        <div className="d-flex justify-content-between align-items-center pt-1">
					<button onClick= {addOnClick} className="btn btn-success">Add</button>
					<button onClick = { addNewListClose } className="btn btn-sm my-1 mx-2 p-0 text-danger" style = {{ fontSize:'large' }}>
		          		<i className="fas fa-times"></i>
		          	</button>
		        </div>
		    </div>
	  	</div>
	)
}

export default AddNewListBtn;