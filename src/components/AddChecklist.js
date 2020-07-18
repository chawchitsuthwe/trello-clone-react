import React, {useState} from 'react';
import './AddChecklist.css';

const AddChecklist = ({addChecklistBoxClose, addChecklist}) => {

	const [item, setItem] = useState("");

	const addChecklistOnClick = () => {
		addChecklist(item);
		setItem("");
	}

	return (
		<div>
			<div className="card checklist-card" id="add-checklist-box">
				<ul className="list-group list-group-flush">
			  		<li className="list-group-item text-secondary">
			            <div className="d-flex justify-content-between align-items-center">
			              <p style= {{ paddingLeft: "55px" }} >Add Checklist Item</p>
			            </div>
			  		</li>
					<input type="text" className="checklist-input w-100" placeholder="Checklist Item..."
					value={item} 
					onChange= { e => setItem(e.target.value) } 
					/>
			        <div className="d-flex justify-content-between align-items-center pt-1">
						<button onClick={addChecklistOnClick} className="btn btn-success">Add</button>
						<button onClick = { () => addChecklistBoxClose(true) } className="btn btn-sm my-1 mx-2 p-0 text-danger" style = {{ fontSize:'large' }}>
							<i className="fas fa-times"></i>
						</button>
			        </div>
				</ul>
			</div>
		</div>
	)
}

export default AddChecklist;