import React from 'react'
import Popup from './popup'
import { helpIcon, settingsIcon, statisticsIcon } from '../assets/icons'

export default function Header() {
	return (
		<header>
			<p>Themed Wordle</p>
			<div className='sidebar'>
				<Popup icon={helpIcon}>
					<h1>How to Play</h1>
					<h2>Guess the Wordle in 6 tries.</h2>
					<ul>
						<li>Each guess must be a valid 5-letter word.</li>
						<li>The color of the tiles will change to show how close your guess was to the word.</li>
					</ul>
					<h2>Examples</h2>
					{/* Exmple image 1 */}
					<p><strong>W</strong> is in the word and in the correct spot.</p>
					{/* Example image 2 */}
					<p><string>I</string> is in the word but in the wrong spot.</p>
					{/* Example image 3 */}
					<p><string>U</string> is not in the word in any spot.</p>
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
			</div>
		</header>
	)
}