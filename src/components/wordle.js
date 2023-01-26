import React, { useState } from 'react'

export default function Wordle() {
	return (
		<>
			<h1>Wordle</h1>
			<EntryLine />
			<EntryLine />
			<EntryLine />
			<EntryLine />
			<EntryLine />
		</>
	)
}

function EntryLine() {
	const [entry, updateEntry] = useState("")


	const handleInput = (e) => {
		if (e.nativeEvent.inputType === 'insertLineBreak' && entry.length === 5) {
			checkEntry()
		}

		if ((entry.length < 5 || (e.nativeEvent.inputType === 'deleteContentBackward')) && e.nativeEvent.inputType !== 'insertLineBreak') {
			updateEntry(e.target.value)
		}
	}

	const checkEntry = () => {
		console.log("An entry was subitted: " + entry)
	}

	return (
		<form>
			<textarea value={entry} onChange={e => handleInput(e)} />
		</form>
	)
}