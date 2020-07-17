import React,{useState, useEffect} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import './CardModal.css';
import Account from './Account';
import Label from './Label';
import Checklist from './Checklist';
import {url} from './../utils';
import Axios from "axios";

const CardModal = ({listTitle,card,archiveCard}) => {

	const cardDescBox = document.getElementById("card-desc-popup");
	const cardDescDiv = document.getElementById("card-desc");
	const cardTitleBox = document.getElementById("card-title");
	const [cardTitle, setCardTitle] = useState("")
	const [cardDesc, setCardDesc] = useState("");

	useEffect(() => {
		setCardTitle(card.title);
		setCardDesc(card.description);

	}, [card.description, card.title])

	const archiveOnClick = () => {
		archiveCard();
		document.getElementById("card-modal").style.display="none";
	}

	const closeOnClick = () => {
		document.getElementById("card-modal").style.display="none";
	}

	const cardDescBoxDisplay = (e) => {

		if(card.description){
			setCardDesc(card.description);
		}
		else
		{
			setCardDesc("");
		}

	    let btn = e.target;
		if(btn.nodeName === "i" || btn.nodeName === "I") {
		btn = btn.parentNode;
		}
		const loc = btn.getBoundingClientRect();

		cardDescBox.style.top = loc.top - 10 + "px";
	    cardDescBox.style.left = loc.left - 10 + "px";
	    cardDescBox.style.width = loc.width + 17 + "px";

	    cardDescDiv.style.display = "none";
		cardDescBoxClose(false);
		
	}

	const cardDescBoxClose = (close) => {
		if(cardDescBox) {
			cardDescBox.style.display = close ? "none":"block";
			cardDescDiv.style.display = close ? "block":"none";
		}
	}

	const cardTitleBoxDisplay = (open) =>{
		if(open){
			cardTitleBox.style.border = "2px solid #0079BF";
		}
		else{
			cardTitleBox.style.border = "0px";
			cardTitleBox.blur();
		}
	}

	const inputEntered = (e, status) => {
	  	if(e.keyCode === 13 && status === "editTitle"){
	    	editCardTitle(cardTitle);
	    	cardTitleBoxDisplay(false);
	  	}
	}

	const editOnClick = (e) => {
		editCardDesc(cardDesc);
		cardDescBoxClose(true);
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

	return (
		<div>
			<div className="customModal" id="card-modal">
				<div className="custom-modal-content">
					<div className="row">
	      				<div className="px-3">
	      					<i className="fa fa-window-maximize"></i>
	      				</div>
	      				<div className="col-md-11 mb-1">
	      					<span className="close ml-auto" onClick={closeOnClick} >&times;</span>
	      					<OutsideClickHandler onOutsideClick={() => cardTitleBoxDisplay(false)} >
						      <input type="text" className="h5 font-weight-bold" id="card-title"
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
		    						<div id="card-desc" onClick={cardDescBoxDisplay}>
		    						{
		    							cardDesc ? 
		    							<p> { cardDesc } </p> :
		    							<div id="description">Add a more detailed description...</div>
		    						}
		    						</div>
		    					</div>
			     			</div>
			     			{ card.checklists && !!card.checklists.length && 
			     			<div>
			     				<div className="row mt-3 mb-1" id="checklist-head">
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
			     					{ card.checklists.map(checklist => (
  
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
 		      					<button className="btn btn-card-action w-100"><i className="far fa-check-square"></i>&nbsp; Checklist</button>
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
 		      				<button className="btn btn-card-action w-100" onClick={archiveOnClick}><i className="fas fa-archive"></i>&nbsp; Archive</button>
 		      				<button className="btn btn-card-action w-100"><i className="fas fa-share-alt"></i>&nbsp; Share</button>
 		      			</div>
      				</div>
				</div>
			</div>
			<div className="rounded trello-fadein" id="card-desc-popup">
		        <textarea id="desc-input" className="w-100" placeholder="Add a more detailed description..." rows="6"
          		name="cardDesc"
          		value={cardDesc}
          		onChange={ e => setCardDesc(e.target.value) }
         		/>
		        <div className="d-flex justify-content-between align-items-center pt-1">
		          <button onClick={editOnClick} className="btn btn-success">Save</button>
		          <button className="btn btn-sm my-1 mx-2 p-0 text-danger" onClick = { () => cardDescBoxClose(true) } style = {{ fontSize:'large' }}><i className="fas fa-times"></i></button>
		        </div>
		    </div>
		</div>
	)
}

export default CardModal