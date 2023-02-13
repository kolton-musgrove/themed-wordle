import React, { useEffect, useState } from 'react'
import { Character, Main, Word, Board } from './styled-components'

const blankBoard = Array(6).fill(0).map(() => new Array(5).fill(""))
const blankMarkers = Array(6).fill(0).map(() => new Array(5).fill(""))
const acceptableKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'enter', 'backspace']
const wordOfTheDay = "hello"

export default function Wordle() {
	const [board, setBoard] = useState(blankBoard)
	const [markers, setMarkers] = useState(blankMarkers)

	const [wordIndex, setWordIndex] = useState(0)
	const [charIndex, setCharIndex] = useState(0)

	const scienceWords = "../src/assets/word-lists/science.txt"
	const historyWords = "../src/assets/word-lists/history.txt"
	const natureWords = "../src/assets/word-lists/nature.txt"
	const moviesWords = "../src/assets/word-lists/movies.txt"

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
		console.log("YOU WON!")
	}

	const lose = () => {
		document.removeEventListener("keydown", handleKeyDown)
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

		</Main >
	)
}
