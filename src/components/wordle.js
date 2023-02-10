import React, { useEffect, useState } from 'react'
import { Character, Main, Word, Board, KeyboardSection, KeyboardRow, KeyboardButton, Flex } from './styled-components'
import { backspaceIcon } from '../assets/icons'

const blankBoard = Array(6).fill(0).map(() => new Array(5).fill(""))
const blankMarkers = Array(6).fill(0).map(() => new Array(5).fill(""))
const keyboard = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
]
const acceptableKeys = keyboard.flat()
const wordOfTheDay = "hello"

const fetchWord = (word) => {
	return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
		method: "GET",
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((err) => console.log("err:", err));
};


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

	const submitGuess = async () => {
		const word = await fetchWord(board[wordIndex].join(""))
		const isValidWord = Array.isArray(word)

		if (charIndex === 5 && isValidWord) {
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
