import React, { useState } from 'react';
import './AddNewCard.css'

const AddNewCardBtn = ({addNewCardClose, saveNewCard}) => {

	const [cardTitle, setCardTitle] = useState("");

	const inputEntered = (e, status) => {
	  	if(e.keyCode === 13 && status === "add"){
	    	saveNewCard(cardTitle);
	    	addNewCardClose(true);
	  	}
	}

	const addOnClick = (e) => {
		saveNewCard(cardTitle);
		addNewCardClose(true)
	}

	return (
		<div>
			<div className="rounded trello-fadein" id="add-card-popup">
		        <input type="text" className="card-input w-100" placeholder="Enter a title for this card..."
		        value={cardTitle}
		        onChange= { e => setCardTitle(e.target.value) } 
		        onKeyUp={(e) => inputEntered(e,"add")} 
		        />

		        <div className="d-flex justify-content-between align-items-center pt-1">
		          	<button onClick={addOnClick} className="btn btn-success">Add</button>
		          	<button onClick = { () => addNewCardClose(true) }  className="btn btn-sm my-1 mx-2 p-0 text-danger" style = {{ fontSize:'large' }}>
						<i className="fas fa-times"></i>
					</button>
		        </div>
		    </div>
		</div>
	)
}

export default AddNewCardBtn;