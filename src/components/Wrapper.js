import React, { useState, useEffect } from "react";
import "./Wrapper.css";
import Axios from "axios";

import List from './List'
import AddNewListBtn from './AddNewListBtn'

const Wrapper = () => {
	const url = "http://localhost:8181/";

	const [lists, setLists] = useState([]);
	// const [list, setList] = useState({});

	// const listActionPopup = document.getElementById("list-action-popup");
	// console.log(listActionPopup)

	const fetchLists = async () => {
		try {
	  		const res = await Axios.get(url+"list/positionAsc");
	  		setLists(res.data);
		} 
		catch (error) {
	  		setLists([]);
		}
	};

	// const displayListActionPopup = (e) => {
	// 	e.stopPropagation();

	// 	let btn = e.target;
	// 	if(btn.nodeName === "i" || btn.nodeName === "I") {
	// 	btn = btn.parentNode;
	// 	}
	// 	const loc = btn.getBoundingClientRect();
	// 	console.log(loc);
	// 	listActionPopup.style.top = loc.top + loc.height + 5 + "px";
	// 	listActionPopup.style.left = loc.left + "px";
	// 	toggelListActionPopup(true);

	// }

	// const toggelListActionPopup = (isOpen) => {
	// 	if(listActionPopup) {
	// 		listActionPopup.style.display = isOpen ? "block":"none";
	// 	}
	// }

	// const deleteList = () => {


	// }

	// const archiveList = () => {


	// }

	// const showListDataInEdit = () => {
	// 	try {
	//   		Axios.get(url + "list/" + listId)
	//   		.then( res => {
	//   			setList(res.data);
	//   			toggelListActionPopup(false);

	//   		})
	// 	} 
	// 	catch (error) {
	//   		setList({});
	// 	}
	// }

	useEffect(() => {
		fetchLists();
	}, []);

	return (
		<div>
			<div id="wrapper" className="p-2">

			{lists && lists.map(list => (
	      
	        	list.status === 1 && <List key={list.id} url={url} title={list.title} listId={list.id} />
	    	
	    	))}

	    	<AddNewListBtn url={url} maxListPos={lists.length}/>

			</div>


			{/* <div className="card list-action-card" id="list-action-popup">
				<ul className="list-group list-group-flush">
			  		<li className="list-group-item text-secondary">
			            <div className="d-flex justify-content-between align-items-center">
			              <p style= {{ fontSize: "18px" }} >List Actions</p>
			              <button className="btn btn-sm p-0 text-danger" onClick= { () => toggelListActionPopup(false) } style= {{ fontSize: "medium" }} ><i className="fa fa-close"></i></button>
			            </div>
			  		</li>
					<a href="#edit-list-modal" data-toggle="modal" className="list-group-item list-group-item-action" id="edit-list-btn">Edit</a>
					<button onClick={ archiveList } className="list-group-item list-group-item-action">Archive This List</button>
					<button onClick={ deleteList } className="list-group-item list-group-item-action">Delete This List</button>
				</ul>
			</div>

			<div className="modal fade" id="edit-list-modal" tabIndex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
				<div className="modal-content">
						<div className="modal-body">
							<form id="list-edit-form">
								<div className="form-group">
								<input type="text" className="form-control" id="editListTitle" placeholder="Enter list title" />
								</div>
								<button type="submit" className="btn btn-green">Edit</button>
							</form>
						</div>
					</div>
				</div>
			</div> */}
		</div>

	);
};

export default Wrapper;