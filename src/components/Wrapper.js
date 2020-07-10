import React, { useState, useEffect } from "react";
import "./Wrapper.css";
import Axios from "axios";

import List from './List';
import AddNewListBtn from './AddNewListBtn';
import ListAction from './ListAction';
import CardModal from './CardModal';

const Wrapper = () => {
	const url = "http://localhost:8181/";

	const [lists, setLists] = useState([]);
	const [card, setCard] = useState({});
	const [listId, setListId] = useState(1);
	const [listTitle, setListTItle] = useState("");

	const listActionPopup = document.getElementById("list-action-popup");

	const fetchLists = async () => {
		try {
	  		const res = await Axios.get(url+"list/positionAsc");
	  		setLists(res.data);
		} 
		catch (error) {
	  		setLists([]);
		}
	};

	useEffect(() => {
		fetchLists();
	}, []);

	const displayListActionPopup = (e, listId) => {

		setListId(listId);
		e.stopPropagation();

		let btn = e.target;
		if(btn.nodeName === "i" || btn.nodeName === "I") {
		btn = btn.parentNode;
		}
		const loc = btn.getBoundingClientRect();
		//console.log(loc);
		listActionPopup.style.top = loc.top + loc.height + 5 + "px";
		listActionPopup.style.left = loc.left + "px";
		toggelListActionPopup(true);

	}

	const toggelListActionPopup = (isOpen) => {
		if(listActionPopup) {
			listActionPopup.style.display = isOpen ? "block":"none";
		}
	}

	const cardClicked = (listTitle,cardId) => {
		try {
	  		Axios.get(url + "card/" + cardId)
	  		.then( res => {
	  			setCard(res.data);
	  			setListTItle(listTitle);
	  		})
		} 
		catch (error) {
	  		setCard({});
	  		setListTItle("");
		}
	}

	return (
		<div>
			<div id="wrapper" className="p-2">

			{lists && lists.map(list => (
	      
	        	list.status === 1 && <List key={list.id} url={url} title={list.title} listId={list.id} cards={list.cards} displayListActionPopup={displayListActionPopup} cardClicked={cardClicked} />
	    	
	    	))}

	    	<AddNewListBtn url={url} maxListPos={lists.length}/>

			</div>
			<ListAction url={url} listId={listId} toggelListActionPopup={toggelListActionPopup}/>
			<CardModal card={card} listTitle={listTitle} />
		</div>

	);
};

export default Wrapper;