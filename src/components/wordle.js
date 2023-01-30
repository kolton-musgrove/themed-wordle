import React, { useEffect, useState } from 'react'

// because JS stores subarrays by reference, we need to have different starting references
const blankBoard = Array(6).fill(0).map(() => new Array(5).fill(""))
const blankMarkers = Array(6).fill(0).map(() => new Array(5).fill(""))
const acceptableKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'enter', 'backspace']
const wordOfTheDay = "hello"

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
		// ensure that you're at the end of a guess
		if (charIndex === 5) {
			updateMarkers() // update the "markers" for each character inthe guessed word

			// check to see if the markers of the current guess are all "green".
			if (isWordCorrect()) { win(); return }

			// if this is the last guess, lose
			if (wordIndex === 5) { lose(); return }

			// move on to the next guess
			setWordIndex(wordIndex + 1)
			setCharIndex(0)
		}
	}

	const updateMarkers = () => {
		const correctWord = wordOfTheDay.split("")
		const guessedWord = board[wordIndex]
		const updatedMarkers = markers

		guessedWord.forEach((guessedCharacter, guessedCharacterIndex) => {
			// if the guessedCharacter is the correct letter and in the correct location
			if (guessedCharacter === correctWord[guessedCharacterIndex]) {
				updatedMarkers[wordIndex][guessedCharacterIndex] = "green"
				correctWord[guessedCharacterIndex] = "" // we remove this to prevent erroneous "yellow" markers

				// if the guessedCharacter is the correct letter, but in the wrong location
			} else if (correctWord.includes(guessedCharacter)) {
				updatedMarkers[wordIndex][guessedCharacterIndex] = "yellow"

				// else the guessedCharater is not in the word
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
		}

		setCharIndex(charIndex - 1)
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
		<main>
			<h1>Wordle</h1>

			{board.map((word, _wordIndex) => {
				return (
					<div className='word' key={_wordIndex}>{
						word.map((char, _charIndex) => {
							return (
								<div className='letter' key={_charIndex} marker={markers[_wordIndex][_charIndex]}>
									{char}
								</div>
							)
						})
					}
					</div>
				)
			})}

		</main>
	)
}
