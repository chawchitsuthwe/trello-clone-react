import React, { useState } from 'react';
import './ListAction.css';
import Axios from "axios";

const ListAction = ({url, listId, toggelListActionPopup}) => {

	const [list, setList] = useState({})
	const [listTitle, setListTitle] = useState("");

	const deleteList = () => {
		try {
	  		Axios.delete(url + "list/"+listId)
			.then(res => {
				window.location.reload(true);
			})
		} 
		catch (error) {
	  		console.log(error);
		}
		
	}

	const archiveList = () => {
		try {
	  		Axios.put(url + "list/" + listId + "/2")
			.then(res => {
			  	window.location.reload(true);
			})
		} 
		catch (error) {
	  		setList({});
		}
	}

	const showListDataInEdit = () => {
		//console.log(listId)
		try {
	  		Axios.get(url + "list/" + listId)
	  		.then( res => {
	  			setList(res.data);
	  			toggelListActionPopup(false);
	  		})
		} 
		catch (error) {
	  		setList({});
		}
	}

	const editListTitle = (e) =>{
		e.preventDefault();
		Axios.put( url + "list/"+listId, {
			title: listTitle,
			position: list.position,
			status: 1
		})
		.then(res => {
			//console.log(res)
		  	window.location.reload(true);
		})
	}

	return (
		<div>
			<div className="card list-action-card" id="list-action-popup">
				<ul className="list-group list-group-flush">
			  		<li className="list-group-item text-secondary">
			            <div className="d-flex justify-content-between align-items-center">
			              <p style= {{ fontSize: "18px" }} >List Actions</p>
			              <button className="btn btn-sm my-1 mx-2 p-0 text-danger" onClick = { () => toggelListActionPopup(false) } style = {{ fontSize:'medium' }}><i className="fas fa-times"></i></button>
			            </div>
			  		</li>
					<a onClick={ showListDataInEdit } href="#edit-list-modal" data-toggle="modal" className="list-group-item list-group-item-action" id="edit-list-btn">Edit</a>
					<button onClick={ archiveList } className="list-group-item list-group-item-action">Archive This List</button>
					<button onClick={ deleteList } className="list-group-item list-group-item-action">Delete This List</button>
				</ul>
			</div>

			<div className="modal fade" id="edit-list-modal" tabIndex="-1" role="dialog" aria-labelledby="ediListModal" aria-hidden="true">
		  		<div className="modal-dialog">
		    		<div className="modal-content">
		      			<div className="modal-body">
		      				<form id="list-edit-form">
		  						<div className="form-group">
		    						<input type="text" className="form-control" placeholder="Enter list title" value={listTitle} onChange= { e => setListTitle(e.target.value) } />
		  						</div>
		  						<button type="submit" className="btn btn-green" onClick={ editListTitle }>Edit</button>
		  					</form>
		      			</div>
		      		</div>
		      	</div>
	      	</div>
		</div>
	)
}

export default ListAction;