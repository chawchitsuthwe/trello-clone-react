import React from 'react';
import './List.css'

const List = ({title}) => {
	return (
		<div className="list">
			<div className="d-flex justify-content-between align-items-center mb-1">
  				<h6 className="pl-2">{title}</h6>
  				<button id="list-action-btn" className="btn btn-sm" onClick="displayListActionPopup(event);getListId($(this).attr('list-id'))" list-id="${list[i].id}"><i className="fa fa-ellipsis-h"></i></button>
			</div>

				{/* ${getCard(list[i].cards)} 

			<div className="d-flex justify-content-between align-items-center">
  				<button className="btn btn-sm btn-new-card text-left" id="add-new-card">
    				<i className="fa fa-plus"></i>&nbsp;&nbsp;Add another card
  				</button>
  				<button className="btn btn-sm"><i className="fa fa-window-restore"></i></button>
			</div>*/}
		</div>
	)
}

export default List;