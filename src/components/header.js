import React from 'react'
import Popup from './popup'
import { helpIcon, settingsIcon, statisticsIcon } from '../assets/icons'
import { Header, Title, HeaderIcons } from './styled-components'
import { WordleExample } from '../assets/images'
import '../main.css'

export default function HeaderSection() {
	return (
		<Header>
			<Title>Themed Wordle</Title>
			<HeaderIcons>
				<Popup icon={helpIcon}>
					<h1>How to Play</h1>
					<h2>Guess the Wordle in 6 tries.</h2>
					<ul>
						<li>Each guess must be a valid 5-letter word.</li>
						<li>The color of the tiles will change to show how close your guess was to the word.</li>
					</ul>
					<h2>Examples</h2>
					<img src={WordleExample} alt="example" />
					<p><strong>S</strong> is in the word and in the correct spot.</p>
					<img src={WordleExample} alt="example" />
					<p><strong>A</strong> is in the word but in the wrong spot.</p>
					<img src={WordleExample} alt="example" />
					<p><strong>L</strong> is not in the word in any spot.</p>
					<hr />
					<p>A new puzzle in released daily at midnight.</p>
				</Popup>
				<Popup icon={statisticsIcon}>
					<h3>Statistics</h3>
					<div>
						{/* <Stat></Stat> */}
						{/* <Stat></Stat> */}
						{/* <Stat></Stat> */}
						{/* <Stat></Stat> */}
					</div>
					<h3>Guess Distribution</h3>
					{/* <GuessDistribution></GuessDistribution> */}
				</Popup>
				<Popup icon={settingsIcon}>
					<h2>Settings</h2>
					{/* <Setting></Setting> */}
					{/* <Setting></Setting> */}
					{/* <Setting></Setting> */}
					{/* <ContactLink></ContactLink> */}
					{/* <ContactLink></ContactLink> */}
					{/* <ContactLink></ContactLink> */}
					<footer>
						<p>&copy; 2023 Ellis Caudill, Isaiah Martinez, Kolton Musgrove, Dean Natale</p>
						<p>Puzzle Number: </p>
					</footer>
				</Popup>
			</HeaderIcons>
		</Header>
	)
}