import React,{useState} from 'react'
import './Checklist.css'

const Checklist = ({checklist}) => {
	const [checked, setChecked] = useState(checklist.checked);

	const checkOnChnage = () => {
		setChecked(!checked);
	}
	return (
		<div>
			<label className="cb-container">{checklist.item}
  				<input type="checkbox" checked={ checked ? "checked": ""} onChange={ checkOnChnage } />
  				<span className="checkmark"></span>
			</label>
		</div>
	)
}

export default Checklist