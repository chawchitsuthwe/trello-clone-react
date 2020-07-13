import React, { useState } from 'react';
import './ListAction.css';

const ListAction = ({listActionClose, listActionClicked, editListTitle, archiveList, deleteList}) => {

	const [listTitle, setListTitle] = useState("");

	const editTitleSubmit = (e) => {		
		e.preventDefault();
		editListTitle(listTitle);
		document.getElementById("edit-list-modal").style.display="none";
		setListTitle("");
	}

	const closeOnClick = () => {
		document.getElementById("edit-list-modal").style.display="none";
	}

	return (
		<div>
			<div className="card list-action-card" id="list-action-popup">
				<ul className="list-group list-group-flush">
			  		<li className="list-group-item text-secondary">
			            <div className="d-flex justify-content-between align-items-center">
			              <p style= {{ fontSize: "18px" }} >List Actions</p>
			              <button className="btn btn-sm my-1 mx-2 p-0 text-danger" onClick = { () => listActionClose(true) } style = {{ fontSize:'medium' }}><i className="fas fa-times"></i></button>
			            </div>
			  		</li>
					<button onClick={ listActionClicked } className="list-group-item list-group-item-action" id="edit-list-btn">Edit</button>
					<button onClick={ archiveList } className="list-group-item list-group-item-action">Archive This List</button>
					<button onClick={ deleteList } className="list-group-item list-group-item-action">Delete This List</button>
				</ul>
			</div>

			<div className="customModal" id="edit-list-modal">
				<div className="custom-modal-content">
					<form id="list-edit-form" onSubmit={ editTitleSubmit }>
  						<div className="form-group">
    						<input type="text" className="form-control" placeholder="Enter list title" value={listTitle} onChange= { e => setListTitle(e.target.value) } id="editText" />
  						</div>
  						<button type="submit" className="btn btn-green">Edit</button>
  						 <span className="close" onClick={closeOnClick} >&times;</span>
  					</form>
				</div>
			</div>

		</div>
	)
}

export default ListAction;