import styled from "styled-components";

export const Character = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;

	width: 22px;
	height: 28px;
	padding: 5px;
	margin: 5px;

	border: 2px solid #3a3a3c;
	font-size: 3.2rem;
	font-weight: bold;
	line-height: 3.2rem;
	text-align: center;
	text-transform: uppercase;

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