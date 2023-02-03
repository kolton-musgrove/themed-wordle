import styled from "styled-components";

export const Character = styled.div`
  font-size: 1.5em;
  margin: 5px;
  padding: 5px;
  height: 28px;
  width: 22px;
  text-align: center;
  text-transform: uppercase;
  border: 2px white solid;
  border-radius: 8px;

  ${({ marker }) => {
		if (marker === "green") {
			return `background-color: #6aaa64;`;
		}
		if (marker === "yellow") {
			return `background-color: #b59f3b;`;
		}
		if (marker === "grey") {
			return `background-color: #3a3a3c;`;
		}
	}}

  user-select: none;
`