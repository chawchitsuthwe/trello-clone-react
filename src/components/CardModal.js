import React from 'react';
import './CardModal.css';
import Account from './Account';
import Label from './Label';
import Checklist from './Checklist'

const CardModal = ({listTitle,card,archiveCard}) => {

	const archiveOnClick = () => {
		archiveCard();
		document.getElementById("card-modal").style.display="none";
	}

	const closeOnClick = () => {
		document.getElementById("card-modal").style.display="none";
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
	      					<span className="h5 font-weight-bold card-head" id="card-title">{card.title}</span><br />
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
		      			
			      			<div className="row">
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
		     						<p id="card-desc">{card.description}</p>
		    					</div>
			     			</div>
			     			{ card.checklists && !!card.checklists.length && 
			     			<div>
			     				<div className="row mt-3" id="checklist-head">
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
		</div>
	)
}

export default CardModal