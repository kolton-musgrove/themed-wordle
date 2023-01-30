import React, { useEffect } from 'react'

const wordOfTheDay = "hello"
const acceptableCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'Enter', 'Delete']

const newGame = Array(6).fill(0).map(row => new Array(5).fill("O"))

export default function Wordle() {
	const wordIndex = 0
	const characterIndex = 0
	const board = newGame

	const erase = () => {

	}

	const submit = () => {
		if (characterIndex === 4) {

		}
	}

	const enterCharacter = (code) => { }

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown)
		return () => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	})

	const handleKeyDown = ({ code }) => {
		if (acceptableCharacters.includes(code)) {
			switch (code) {
				case 'Enter': submit()
				case 'Delete': erase()
				default: enterCharacter(code)
			}
		}
	}

	return (
		<main>
			<h1>Wordle</h1>

			{board.map((word, wordI) => {
				return (
					<div className='word'>{
						word.map((char, charI) => {
							return (<div className='letter'>{board[wordI][charI]}</div>)
						})
					}
					</div>
				)
			})}
		</main>
	)
}
