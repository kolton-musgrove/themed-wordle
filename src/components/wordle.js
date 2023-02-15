import React, { useEffect, useState } from "react"
import {
  Character,
  Main,
  Word,
  Board,
  KeyboardSection,
  KeyboardRow,
  KeyboardButton,
  Flex
} from "./styled-components"
import { Icons, WordLists } from "../assets"

const blankBoard = Array(6)
  .fill(0)
  .map(() => new Array(5).fill(""))
const blankMarkers = Array(6)
  .fill(0)
  .map(() => new Array(5).fill(""))
const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
]
const acceptableKeys = keyboard.flat()
const wordOfTheDay = "hello"

export default function Wordle() {
  const [isGameRunning, setisGameRunning] = useState(true)
  const [board, setBoard] = useState(blankBoard)
  const [markers, setMarkers] = useState(blankMarkers)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  })

  const validateWord = (word) => WordLists.validWords.includes(word)
  const win = () => setisGameRunning(false)
  const lose = () => setisGameRunning(false)

  const handleKeyDown = ({ key }) => {
    key = key.toLowerCase()

    if (acceptableKeys.includes(key) && isGameRunning) {
      switch (key) {
        case "enter":
          submitGuess()
          return

        case "backspace":
          eraseCharacter()
          return

        default:
          enterCharacter(key)
      }
    }
  }

  const submitGuess = () => {
    const guessedWord = board[wordIndex]
    const isValidWord = validateWord(guessedWord.join(""))
    const correctWord = wordOfTheDay.split("")

    if (charIndex === 5 && isValidWord) {
      // update the color markers on the board
      const newMarkers = markers.map((word, wi) =>
        wi === wordIndex
          ? word.map((marker, mi) => {
              if (guessedWord[mi] === correctWord[mi]) {
                return "green"
              } else if (correctWord.includes(guessedWord[mi])) {
                return "yellow"
              } else {
                return "grey"
              }
            })
          : word
      )

      setMarkers(newMarkers)

      if (newMarkers[wordIndex].every((marker) => marker === "green")) win()
      if (wordIndex === 5) lose()

      setWordIndex(wordIndex + 1)
      setCharIndex(0)
    }
  }

  const eraseCharacter = () => {
    if (charIndex > 0) {
      setBoard((prev) =>
        prev.map((word, wi) =>
          wi === wordIndex
            ? word.map((char, ci) => (ci === charIndex - 1 ? "" : char))
            : word
        )
      )
      setCharIndex(charIndex - 1)
    }
  }

  const enterCharacter = (character) => {
    if (charIndex <= 4) {
      setBoard((prev) =>
        prev.map((word, wi) =>
          wi === wordIndex
            ? word.map((char, ci) => (ci === charIndex ? character : char))
            : word
        )
      )
      setCharIndex(charIndex + 1)
    }
  }

  return (
    <Main>
      <Board>
        {board.map((word, _wordIndex) => {
          return (
            <Word key={_wordIndex}>
              {word.map((char, _charIndex) => {
                return (
                  <Character
                    key={_charIndex}
                    marker={markers[_wordIndex][_charIndex]}>
                    {char}
                  </Character>
                )
              })}
            </Word>
          )
        })}
      </Board>

      <KeyboardSection>
        {keyboard.map((keys, keyboardRowIndex) => {
          return (
            <KeyboardRow key={keyboardRowIndex}>
              {keyboardRowIndex === 1 && <Flex item={0.5} />}
              {keys.map((key) => {
                const flex = ["enter", "backspace"].includes(key) ? 1.5 : 1

                return (
                  <KeyboardButton
                    type="button"
                    title={key}
                    key={key}
                    style={{ flex }}
                    onClick={() => handleKeyDown({ key })}>
                    {key === "backspace" ? (
                      <img alt="delete" src={Icons.DeleteIcon} />
                    ) : (
                      key
                    )}
                  </KeyboardButton>
                )
              })}
              {keyboardRowIndex === 1 && <Flex item={0.5} />}
            </KeyboardRow>
          )
        })}
      </KeyboardSection>
    </Main>
  )
}
