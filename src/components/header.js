import { Header, Title, HeaderIcons, GuessDistribution, Stat } from "./styled-components"
import { Icons, Images } from "../assets/"
import React from "react"
import Popup from "./popup"
import { useCookies } from "react-cookie"

export default function HeaderSection() {
	// eslint-disable-next-line
	const [cookies, setStats, removeStats] = useCookies(["stats"])

	const initialStats = { wins: 0, loses: 0, currStreak: 0, maxStreak: 0, previousGames: [0, 0, 0, 0, 0] }
	if (!cookies.stats) setStats("stats", initialStats, { path: "/" })

	const numWins = cookies.stats.wins
	const numLosses = cookies.stats.loses
	const currStreak = cookies.stats.currStreak
	const bestStreak = cookies.stats.maxStreak
	const previousGames = cookies.stats.previousGames
	const winPercentage = (numWins / (numWins + numLosses)) * 100 || 0

	return (
		<Header>
			<Title>Themed Wordle</Title>
			<HeaderIcons>
				<Popup icon={Icons.HelpIcon}>
					<h1>How to Play</h1>
					<h2>Guess the Wordle in 6 tries.</h2>
					<ul>
						<li>Each guess must be a valid 5-letter word.</li>
						<li>
							The color of the tiles will change to show how close your guess
							was to the word.
						</li>
					</ul>
					<h2>Examples</h2>
					<img src={Images.WordleExample} alt="example" />
					<p>
						<strong>S</strong> is in the word and in the correct spot.
					</p>
					<img src={Images.WordleExample} alt="example" />
					<p>
						<strong>A</strong> is in the word but in the wrong spot.
					</p>
					<img src={Images.WordleExample} alt="example" />
					<p>
						<strong>L</strong> is not in the word in any spot.
					</p>
					<hr />
					<footer>
						<p>
							&copy; 2023 Ellis Caudill, Isaiah Martinez, Kolton Musgrove, Dean
							Natale
						</p>
					</footer>
				</Popup>
				<Popup icon={Icons.StatisticsIcon}>
					<h3>Statistics</h3>
					<div>
						<Stat>
							<p>Number of wins: {numWins}</p>
							<p>Win Percentage: {winPercentage}%</p>
							<p>Current Streak: {currStreak}</p>
							<p>Best Win Streak: {bestStreak}</p>
						</Stat>
					</div>
					<h3>Guess Distribution</h3>

					<GuessDistribution>
						<ol>
							<li>{previousGames[0]}</li>
							<li>{previousGames[1]}</li>
							<li>{previousGames[2]}</li>
							<li>{previousGames[3]}</li>
							<li>{previousGames[4]}</li>
						</ol>
					</GuessDistribution>
				</Popup>
			</HeaderIcons>
		</Header>
	)
}
