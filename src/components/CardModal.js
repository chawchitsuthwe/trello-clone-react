import React,{useState, useEffect, useRef} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {url} from './../utils';
import Axios from "axios";
import './CardModal.css';

import Account from './Account';
import Label from './Label';
import Checklist from './Checklist';
import AddChecklist from './AddChecklist';


const CardModal = ({listTitle,card}) => {

	const cardDescBox = useRef(null);
	const cardDescDiv = useRef(null);
	const cardTitleBox = useRef(null);
	const checklistHead = useRef(null);
	const cardModal = useRef(null);
	const addChecklistBox = document.getElementById("add-checklist-box");

	const [cardTitle, setCardTitle] = useState("")
	const [cardDesc, setCardDesc] = useState("");
	const [cardChecklists , setCardChecklists] = useState([]);

	useEffect(() => {
		setCardTitle(card.title);
		setCardDesc(card.description);
		setCardChecklists(card.checklists);

	}, [card.description, card.title, card.checklists])

	const closeOnClick = () => {
		cardModal.current.style.display="none";
	}

	const editOnClick = (e) => {
		editCardDesc(cardDesc);
		cardDescBoxClose(true);
	}

	const inputEntered = (e, status) => {
	  	if(e.keyCode === 13 && status === "editTitle"){
	    	editCardTitle(cardTitle);
	    	cardTitleBoxDisplay(false);
	  	}
	}

	const editCardTitle = (title) => {
		try{
			Axios.put( url + "card/" + card.id, {
			   	"title": title,
				"description": card.description,
				"due_date": card.due_date,
				"position": card.position,
				"status": card.status,
				"list": card.list
			})
		}
		catch(error){
			console.log(error);
		}
	}

	const editCardDesc = (desc) => {
		try{
			Axios.put( url + "card/" + card.id, {
			   	"title": card.title,
				"description": desc,
				"due_date": card.due_date,
				"position": card.position,
				"status": card.status,
				"list": card.list
			})
		}
		catch(error){
			console.log(error);
		}
	}

	const archiveCard = () => {
		Axios.put(url + "card/" + card.id + "/2");
		cardModal.current.style.display="none";
	}

	const addChecklist = (item) => {
		try{
			Axios.post( url + "/checklist", {
				"cardId": card.id,
				"title": "Checklist",
			    "item":	item,
			    "position": 1,
			    "checked": 0
			})
			.then(res => {
				setCardChecklists(prevChecklists => [...prevChecklists, res.data]);
			})
			addChecklistBoxClose(true);
		}
		catch(error){
			console.log(error);
		}
	}

	const cardDescBoxDisplay = (e, desc) => {
		if(!desc){
			setCardDesc("");
		}
	    let btn = e.target;
		if(btn.nodeName === "i" || btn.nodeName === "I") {
		btn = btn.parentNode;
		}
		const loc = btn.getBoundingClientRect();

		cardDescBox.current.style.top = loc.top - 10 + "px";
	    cardDescBox.current.style.left = loc.left - 10 + "px";
	    cardDescBox.current.style.width = loc.width + 17 + "px";

	    cardDescDiv.current.style.display = "none";
	    if(checklistHead.current){
	    	checklistHead.current.style.marginTop = "240px";
	    }

		cardDescBoxClose(false);
		
	}

	const cardDescBoxClose = (close) => {
		if(cardDescBox) {
			cardDescBox.current.style.display = close ? "none":"block";
			cardDescDiv.current.style.display = close ? "block":"none";
			if(checklistHead.current){
				checklistHead.current.style.marginTop = close ? "0px" : "240px";
			}
		}
	}

	const cardTitleBoxDisplay = (open) =>{
		if(open){
			cardTitleBox.current.style.border = "2px solid #0079BF";
		}
		else{
			cardTitleBox.current.style.border = "0px";
			cardTitleBox.current.blur();
		}
	}

	const addChecklistBoxDisplay = (e) => {
		
	    let btn = e.target;
		if(btn.nodeName === "i" || btn.nodeName === "I") {
		btn = btn.parentNode;
		}
		const loc = btn.getBoundingClientRect();

		addChecklistBox.style.top = loc.top + 40 + "px";
		addChecklistBox.style.left = loc.left + 30 + "px";

		addChecklistBoxClose(false);
		
	}

	const addChecklistBoxClose = (close) => {
		addChecklistBox.style.display = close ? "none":"block";
	}

	return (
		<div>
			<div className="customModal" id="card-modal" ref={cardModal}>
				<div className="custom-modal-content">
					<div className="row">
	      				<div className="px-3">
	      					<i className="fa fa-window-maximize"></i>
	      				</div>
	      				<div className="col-md-11 mb-1">
	      					<span onClick={closeOnClick} className="close ml-auto">&times;</span>
	      					<OutsideClickHandler onOutsideClick={() => cardTitleBoxDisplay(false)} >
						      <input type="text" className="h5 font-weight-bold" id="card-title"
						      	ref={cardTitleBox}
				          		value={cardTitle || ""}
				          		onChange={ e => setCardTitle(e.target.value) }
	      						onClick={() => cardTitleBoxDisplay(true)}
	      						onKeyUp={ e => inputEntered(e,"editTitle") }
	      						/>
						    </OutsideClickHandler>
	      					<span>in list <u id="list-title">{listTitle}</u></span>
	      				</div>
      				</div>
      				<div className="row">
	      				<div className="col-md-9">
			      			<div className="row mb-2">
			      				<div className="mx-4"></div>
			      				<div className="col-md-11">
			      					<div className="d-flex justify-content-start">
			      					{ card.accounts && !!card.accounts.length && 
			      						<div className="align-self-stretch mr-3" id="member-head">
			      							<h6>MEMBERS</h6>
			      							<div id="card-member">
			      							{ card.accounts.map(account => (
	      
								        		<Account key={account.username} account={account} />
								    	
								    		))}
			      							</div>
			      						</div>
			      						
			      					}
			      					{ card.labels && !!card.labels.length && 
			      						<div className="align-self-stretch" id="label-head">
			      							<h6>LABELS</h6>
			      							<div id="card-label">
			      							{ card.labels.map(label => (
	      
								        		<Label key={label.id} label={label} condition="withName" />
								    	
								    		))}
			      							</div>
			      						</div>
			      						
			      					}
			      					</div>
			      					
			      				</div>
			      			</div>
		      			
			      			<div className="row mb-1">
			      				<div className="col-md-1">
			      					<i className="fa fa-align-justify"></i>
			      				</div>
			      				<div className="col-md-11">
			      					<span className="h5 card-head">Description</span>
			      				</div>
			      			</div>
			      			<div className="row">
			      				<div className="col-md-1"></div>
		    					<div className="col-md-11">
		    						<div onClick={(e) => cardDescBoxDisplay(e,cardDesc)} id="card-desc" ref={cardDescDiv}>
		    						{
		    							cardDesc ? 
		    							<p> { cardDesc } </p> :
		    							<div id="description">Add a more detailed description...</div>
		    						}
		    						</div>
		    					</div>
			     			</div>
			     			{ cardChecklists && !!cardChecklists.length && 
			     			<div id="checklist-head" ref={checklistHead}>
			     				<div className="row mb-1">
			     					<div className="col-md-1">
			    						<i className="fa fa-check-square"></i>
			     					</div>
			     					<div className="col-md-11">
			     						<span className="h5 card-head">Checklist</span>
			     					</div>
			     				</div>
			     				<div className="row">
			     					<div className="col-md-1"></div>
			     					<div className="col-md-11" id="card-checklist">
			     					{ cardChecklists.map(checklist => (
  
						        		<Checklist key={checklist.id} checklist={checklist} />
						    	
						    		))}
			     					</div>
			    				</div>
			    			</div>
	 		      			}
 		      			</div>
 		      			<div className="col-md-3">
 		      				<section>
 		      					<h6>SUGGESTED</h6>
 		      					<button className="btn btn-card-action w-100"><i className="far fa-user"></i>&nbsp; Join</button>
 		      				</section><br/>
 		      				<section>
 		      					<h6>ADD TO CARD</h6>
 		      					<button className="btn btn-card-action w-100"><i className="far fa-user"></i>&nbsp; Members</button>
 		      					<button className="btn btn-card-action w-100"><i className="fas fa-tag"></i>&nbsp; Labels</button>
 		      					<button onClick={addChecklistBoxDisplay} className="btn btn-card-action w-100"><i className="far fa-check-square"></i>&nbsp; Checklist</button>
 		      					<button className="btn btn-card-action w-100"><i className="far fa-clock"></i>&nbsp; Due Date</button>
 		      					<button className="btn btn-card-action w-100"><i className="fas fa-paperclip"></i>&nbsp; Attachement</button>
 		      					<button className="btn btn-card-action w-100"><i className="far fa-window-maximize"></i>&nbsp; Cover</button>
 		      				</section><br/>
 		      				<section>
 		      					<h6>POWER-UPS</h6>
 		      					<button className="btn btn-card-action w-100"><i className="fab fa-github"></i>&nbsp; GitHub</button>
 		      					<button className="btn btn-card-action w-100">Get More Power-Ups</button>
 		      				</section><br/>
 		      				<section>
 		      					<h6>ACTIONS</h6>
 		      					<button className="btn btn-card-action w-100"><i className="fas fa-arrow-right"></i>&nbsp; Move</button>
 		      					<button className="btn btn-card-action w-100"><i className="far fa-copy"></i>&nbsp; Copy</button>
 		      					<button className="btn btn-card-action w-100"><i className="fa fa-window-restore"></i>&nbsp; Make Template</button>
 		      					<button className="btn btn-card-action w-100"><i className="far fa-eye"></i>&nbsp; Watch</button>
 		      				</section>
 		      				<hr/>
 		      				<button onClick={archiveCard} className="btn btn-card-action w-100"><i className="fas fa-archive"></i>&nbsp; Archive</button>
 		      				<button className="btn btn-card-action w-100"><i className="fas fa-share-alt"></i>&nbsp; Share</button>
 		      			</div>
      				</div>
				</div>
			</div>
			<div className="rounded trello-fadein" id="card-desc-popup" ref={cardDescBox}>
		        <textarea id="desc-input" className="w-100" placeholder="Add a more detailed description..." rows="6"
          		name="cardDesc"
          		value={cardDesc || ""}
          		onChange={ e => setCardDesc(e.target.value) }
         		/>
		        <div className="d-flex justify-content-between align-items-center pt-1">
		          <button onClick={editOnClick} className="btn btn-success">Save</button>
		          <button onClick = { () => cardDescBoxClose(true) } className="btn btn-sm my-1 mx-2 p-0 text-danger" style = {{ fontSize:'large' }}><i className="fas fa-times"></i></button>
		        </div>
		    </div>
		    <AddChecklist addChecklistBoxClose={addChecklistBoxClose} addChecklist={addChecklist} />
		</div>
	)
}

export default CardModal