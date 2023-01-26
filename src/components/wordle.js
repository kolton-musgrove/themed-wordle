import React, { useState } from 'react'

export default function Wordle() {
	return (
		<>
			<h1>Wordle</h1>
			<EntryLine />
		</>
	)
}

function EntryLine() {
	return (
		<form onSubmit={CheckEntry}>
			<textarea value={ } />
		</form>
	)
}

function CheckEntry(event) {
	console.log("An entry was submitted " + this.state.value)
}