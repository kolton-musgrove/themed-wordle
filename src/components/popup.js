import React, { useState } from 'react'

export default function Popup(props) {
	const [isOpen, setIsOpen] = useState(false);
	const togglePopup = () => setIsOpen(!isOpen)

	const popup = isOpen ?
		// if isOpen is true, return the popup contents
		<div className='popup-box'>
			<div className='box'>
				<span className='close-icon' onClick={togglePopup}>x</span>
				{props.children}
			</div>
		</div>
		:
		// else return null
		null

	return (
		<div className='popup'>
			<button onClick={togglePopup}>
				<img src={props.icon} alt={props.alt} />
			</button>
			{popup}
		</div>
	)
}