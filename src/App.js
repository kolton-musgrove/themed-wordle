import React from 'react'
import { Wordle, Header } from './components'
import './main.css';

function App() {
	return (
		<div>
			<Header />
			<main>
				<Wordle />
			</main>
		</div>
	);
}

export default App;
