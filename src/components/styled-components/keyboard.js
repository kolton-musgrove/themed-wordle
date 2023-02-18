import styled from "styled-components"

export const KeyboardSection = styled.section`
  position: absolute;
  bottom: 25px;
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 768px) and (min-height: 620px) {
    position: relative;
    margin-top: 50px;
  }
`

export const KeyboardRow = styled.div`
  width: 100%;
  margin: 0 auto 8px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const KeyboardButton = styled.button`
  font-family: "Libre Franklin", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  ${({ item }) => (item ? `flex: ${item};` : `flex: 1;`)}

  border: 0;
  font-size: 0.9rem;
  border-radius: 4px;
  background-color: #818384;
  font-weight: bold;
  text-transform: uppercase;
  color: white;

  cursor: pointer;
  user-select: none;

  &:last-of-type {
    margin: 0;
  }
`
