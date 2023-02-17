import React, { useEffect, useState } from 'react'
import { Character, Main, Word, Board, KeyboardSection, KeyboardRow, KeyboardButton, Flex } from './styled-components'
import { backspaceIcon } from '../assets/icons'
import Cookies from 'universal-cookie'

const blankBoard = Array(6).fill(0).map(() => new Array(5).fill(""))
const blankMarkers = Array(6).fill(0).map(() => new Array(5).fill(""))
const keyboard = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
]
const acceptableKeys = keyboard.flat()
const wordOfTheDay = "hello"

const cookie1 = new Cookies();
const cookie2 = new Cookies();
var guesses = [0, 0, 0, 0, 0, 0];	// Each index holds the number of wins in a given amount of guesses
var stats = [0, 0, 0, 0, 0]; 		// [0]: # of wins, [1]: # of loses, [2]: curr streak, [3]: max streak
var currAttempts = 0;

if (cookie1.get('guesses')) {
	guesses = cookie1.get('guesses');
}
if (cookie2.get('stats')) {
	stats = cookie2.get('stats');
}


export default function Wordle() {
	const [board, setBoard] = useState(blankBoard)
	const [markers, setMarkers] = useState(blankMarkers)

	const [wordIndex, setWordIndex] = useState(0)
	const [charIndex, setCharIndex] = useState(0)

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown)
		return () => { document.removeEventListener("keydown", handleKeyDown) }
	})

	const handleKeyDown = ({ key }) => {
		key = key.toLowerCase()

		if (acceptableKeys.includes(key)) {
			switch (key) {
				case 'enter':
					submitGuess()
					return

				case 'backspace':
					eraseCharacter()
					return

				default: enterCharacter(key)
			}
		}
	}

	const submitGuess = () => {
		if (charIndex === 5) {
			updateMarkers()

			currAttempts += 1;

			if (isWordCorrect()) { win(); return }
			if (wordIndex === 5) { lose(); return }

			setWordIndex(wordIndex + 1)
			setCharIndex(0)
		}
	}

	const updateMarkers = () => {
		const correctWord = wordOfTheDay.split("")
		const guessedWord = board[wordIndex]
		const updatedMarkers = markers

		guessedWord.forEach((guessedCharacter, guessedCharacterIndex) => {
			if (guessedCharacter === correctWord[guessedCharacterIndex]) {
				updatedMarkers[wordIndex][guessedCharacterIndex] = "green"
				correctWord[guessedCharacterIndex] = ""
			} else if (correctWord.includes(guessedCharacter)) {
				updatedMarkers[wordIndex][guessedCharacterIndex] = "yellow"
			} else {
				updatedMarkers[wordIndex][guessedCharacterIndex] = "grey"
			}
		})

		setMarkers(updatedMarkers)
	}

	const isWordCorrect = () => {
		return (markers[wordIndex].every((marker) => marker === "green"))
	}

	const win = () => {
		setCharIndex(charIndex - 1)
		document.removeEventListener("keydown", handleKeyDown)

		switch(currAttempts) { //incremenet # of wins for given guess
			case 1:
				guesses[0]++;
				break;
			case 2:
				guesses[1]++;
				break;
			case 3:
				guesses[2]++;
				break;
			case 4:
				guesses[3]++;
				break;
			case 5:
				guesses[4]++;
				break;
			case 6:
				guesses[5]++;
				break;
			default:
		}

		stats[0]++; //increment # of wins
		stats[2]++; //increment current win streak
		cookie1.set("guesses", guesses)
		cookie2.set("stats", stats)
		console.log("YOU WON!")
	}

	const lose = () => {
		document.removeEventListener("keydown", handleKeyDown)

		stats[1]++; //increment # of loses

		if(stats[2] > stats[3]) {
			stats[3] = stats[2];
		}
		stats[2] = 0;

		cookie2.set("stats", stats)
		console.log("YOU LOST!")
	}

	const eraseCharacter = () => {
		if (charIndex > 0) {
			setBoard((prev) => {
				const newBoard = prev
				newBoard[wordIndex][charIndex - 1] = ""
				return newBoard
			})

			setCharIndex(charIndex - 1)
		}
	}

	const enterCharacter = (character) => {
		if (charIndex <= 4) {
			setBoard((prev) => {
				const newBoard = prev
				newBoard[wordIndex][charIndex] = character
				return newBoard
			})

			setCharIndex(charIndex + 1)
		}
	}

	return (
		<Main>
			<Board>
				{board.map((word, _wordIndex) => {
					return (
						<Word key={_wordIndex}>{
							word.map((char, _charIndex) => {
								return (
									<Character key={_charIndex} marker={markers[_wordIndex][_charIndex]
									}>
										{char}
									</Character>
								)
							})
						}
						</Word>
					)
				})}
			</Board>

			<KeyboardSection>
				{keyboard.map((keys, keyboardRowIndex) => {
					return <KeyboardRow key={keyboardRowIndex}>
						{keyboardRowIndex === 1 && <Flex item={0.5} />}
						{keys.map((key) => {
							return <KeyboardButton key={key} onClick={() => handleKeyDown({ key })} flex={["enter", "backspace"].includes(key) ? 1.5 : 1}>
								{key === "backspace" ? <backspaceIcon /> : key}
							</KeyboardButton>
						})}
						{keyboardRowIndex === 1 && <Flex item={0.5} />}
					</KeyboardRow>
				})}
			</KeyboardSection>

		</Main >
	)
}
