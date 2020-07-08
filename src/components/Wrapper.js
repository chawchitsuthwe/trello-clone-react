import React, { useState, useEffect } from "react";
import "./Wrapper.css";
import Axios from "axios";

import List from './List'
import AddNewListBtn from './AddNewListBtn'

const Wrapper = () => {
	const url = "http://localhost:8181/";
	const [lists, setLists] = useState([]);

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

	return (
		<div id="wrapper" className="p-2">

		{lists && lists.map(list => (
      
        	list.status === 1 && <List key={list.id} title={list.title} />
    	
    	))}

    	<AddNewListBtn />

		</div>
	);
};

export default Wrapper;