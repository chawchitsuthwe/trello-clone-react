import React, { useState, useEffect } from "react";
import Axios from "axios";
import {url} from './../utils';
import "./Wrapper.css";

import List from './List';
import AddNewListBtn from './AddNewListBtn';
import ListAction from './ListAction';
import CardModal from './CardModal';
import AddNewCard from './AddNewCard'


const Wrapper = () => {

	const [lists, setLists] = useState([]);
	const [list, setList] = useState({});
	const [listId, setListId] = useState(1);
	const [listTitle, setListTItle] = useState("");
	const [card, setCard] = useState({});

	const listActionPopup = document.getElementById("list-action-popup");
	const addCardPopup = document.getElementById("add-card-popup");

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
	}, [lists]);

	const saveNewList = (listTitle) => {

		Axios.post( url + "/list", {
			title: listTitle,
			position: lists.length + 1,
			status: 1
		})
		.then(res => {
		  	setLists(prevLists => [...prevLists, res.data]);
		})
	}

	const editListTitle = (title) =>{
		try {
	  		Axios.put( url + "list/"+listId, {
				title: title,
				position: list.position,
				status: 1
			})
		} 
		catch (error) {
			setList({});
	  		console.log(error);
		}
		
	}

	const deleteList = () => {
		try {
	  		Axios.delete(url + "list/"+listId)
			listActionClose(true);
		} 
		catch (error) {
			setList({});
	  		console.log(error);
		}
		
	}

	const archiveList = () => {
		try {
	  		Axios.put(url + "list/" + listId + "/2")
			listActionClose(true);
		} 
		catch (error) {
	  		setList({});
	  		console.log(error);
		}
	}

	const listActionDisplay = (e, listId) => {

		setListId(listId);
		e.stopPropagation();

		let btn = e.target;
		if(btn.nodeName === "i" || btn.nodeName === "I") {
		btn = btn.parentNode;
		}
		const loc = btn.getBoundingClientRect();
		listActionPopup.style.top = loc.top + loc.height + 5 + "px";
		listActionPopup.style.left = loc.left + "px";
		listActionClose(false);

	}

	const listActionClose = (close) => {
		if(listActionPopup) {
			listActionPopup.style.display = close ? "none":"block";
		}
	}

	const listActionClicked = () => {
		try {
	  		Axios.get(url + "list/" + listId)
	  		.then( res => {
	  			setList(res.data);
	  		})
	  		listActionClose(true);
			document.getElementById("edit-list-modal").style.display="block";
		} 
		catch (error) {
	  		setList({});
		}
	}

	const addNewCardDisplay = (e, id) => {

		setListId(id);

	    let btn = e.target;
		if(btn.nodeName === "i" || btn.nodeName === "I") {
		btn = btn.parentNode;
		}
		const loc = btn.getBoundingClientRect();

		addCardPopup.style.top = loc.top - 10 + "px";
	    addCardPopup.style.left = loc.left - 10 + "px";
	    addCardPopup.style.width = loc.width + 52 + "px";
		addNewCardClose(false);
	}

	const addNewCardClose = (close) => {
		if(addCardPopup) {
			addCardPopup.style.display = close ? "none":"block";
		}
	}

	const cardClicked = (listTitle,cardId) => {
		try {
	  		Axios.get(url + "card/" + cardId)
	  		.then( res => {
	  			setCard(res.data);
	  			setListTItle(listTitle);
	  		})
	  		document.getElementById("card-modal").style.display="block";
		} 
		catch (error) {
	  		setCard({});
	  		setListTItle("");
		}
	}
	
	const saveNewCard = async(cardTitle) => {

		try {

	  		const res = await Axios.get(url + "list/" + listId);

	  		Axios.post( url + "card", {
			 	"title": cardTitle,
	     		"position": res.data.cards.length + 1,
	     		"status": 1,
	     		"list": {
	         		"id": listId
	    		 	}	
			 })
			.then(res => {
			   	setLists(prevLists => [...prevLists, res.data.list]);
			})
		} 
		catch (error) {
	  		console.log(error);
		}
	}

	return (
		<div>
			<div id="wrapper" className="p-2">

			{lists && lists.map((li, index) => (
	      
	        	li.status === 1 && 
	        	<List key={index} 
	        		list={li} 
	        		listActionDisplay={listActionDisplay} 
	        		cardClicked={cardClicked}
	        		addNewCardDisplay={addNewCardDisplay} />
	    	
	    	))}

	    		<AddNewListBtn saveNewList={saveNewList} />

			</div>

			<ListAction
				title={listTitle}
				listActionClose={listActionClose} 
				listActionClicked={listActionClicked}
				editListTitle={editListTitle} 
				archiveList={archiveList} 
				deleteList={deleteList} />

			<CardModal card={card} listTitle={listTitle} />

			<AddNewCard addNewCardClose={addNewCardClose} saveNewCard={saveNewCard} />

		</div>

	);
};

export default Wrapper;