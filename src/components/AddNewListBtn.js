import React, { useState } from 'react';
import './AddNewListBtn.css'
import Axios from "axios";

const AddNewListBtn = ({url, maxListPos}) => {

	const [listTitle, setListTitle] = useState("")

	const addListPopup = document.getElementById("add-list-popup");

	const addNewList = (e) => {
	  	e.stopPropagation();
		if(addListPopup){

			const addNewListBtn = document.getElementById("add-list-btn");
			const rect = addNewListBtn.getBoundingClientRect();
			// console.log(rect);

			addListPopup.style.top = rect.top + "px";
			addListPopup.style.left = rect.left + "px";
			addListPopup.style.width = rect.width + "px";
			toggelAddListPopup(true);
		}
	}

	const toggelAddListPopup = (isOpen) => {
		if(addListPopup) {
			addListPopup.style.display = isOpen ? "block":"none";
			if(isOpen) {
				document.getElementById("list-title-input").focus();
			}
		}
	}

	const saveNewList = () => {

		Axios.post( url + "/list", {
			title: listTitle,
			position: maxListPos + 1,
			status: 1
		})
		.then(res => {
		  	toggelAddListPopup(false);
		  	window.location.reload(true);
		})
	}

	const inputEntered = (e, status) => {
	  	if(e.keyCode === 13 && status === "add"){
	    	saveNewList();
	  	}
	}

	return (
		<div>
			<button id="add-list-btn" className="btn btn-sm btn-new-list text-left mr-2" onClick = { e => addNewList(e) }>
		        <i className="fa fa-plus"></i>&nbsp;&nbsp;Add another list
			</button>
		  	<div style={{ width: "0.5rem"}}>&nbsp;</div>

		  	<div className="rounded trello-fadein p-1" id="add-list-popup">
		        <input type="text" className="w-100" id="list-title-input" value={listTitle} onChange= { e => setListTitle(e.target.value) } onKeyUp = { e => inputEntered(e,'add') } />
		        <div className="d-flex justify-content-between align-items-center pt-1">
		          <button className="btn btn-success" onClick= {saveNewList} >Add</button>
		          <button className="btn btn-sm my-1 mx-2 p-0 text-danger" onClick = { () => toggelAddListPopup(false) } style = {{ fontSize:'large' }}><i className="fas fa-times"></i></button>
		        </div>
		    </div>
	  	</div>
	)
}

export default AddNewListBtn;