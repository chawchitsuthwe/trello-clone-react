import React from 'react';
import './CardModal.css';
import Account from './Account';
import Label from './Label';
import Checklist from './Checklist'

const CardModal = ({listTitle,card}) => {

	return (
		<div>
			<div className="modal fade" id="card-modal" tabIndex="-1" role="dialog" aria-labelledby="cardModalLabel" aria-hidden="true">
		  		<div className="modal-dialog modal-lg">
		    		<div className="modal-content">
		      			<div className="modal-body">
		      				<div className="row">
			      				<div className="col-md-1">
			      					<i className="fa fa-window-maximize"></i>
			      				</div>
			      				<div className="col-md-11 mb-2">
			      					<span className="h5 font-weight-bold" id="card-title">{card.title}</span><br />
			      					<span>in list <u id="list-title">{listTitle}</u></span>
			      				</div>
		      				</div>
			      			<div className="row mb-4">
			      				<div className="col-md-1"></div>
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
			      					<span className="h5">Description</span>
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
			     						<span className="h5">Checklist</span>
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
		         	</div>
				</div>
		    </div>
		</div>
	)
}

export default CardModal