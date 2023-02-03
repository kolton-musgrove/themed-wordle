import styled from "styled-components";

export const Character = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;

	margin: 0 2px;

	width: 3rem;
	height: 3rem;

	@media only screen and (min-width: 768px) and (min-height: 620px) {
		width: 3.75rem;
		height: 3.75rem;
		margin: 0 3px;
		font-size: 2rem;
	}

	border: 2px solid #3a3a3c;
	font-size: 1.5rem;
	font-weight: bold;
	line-height: 1.5rem;
	text-align: center;
	text-transform: uppercase;

  ${({ marker }) => {
		if (marker === "green") {
			return `
				background-color: #538d4e;
				border: none;
				padding: 2px;
			`
		}
		if (marker === "yellow") {
			return `
				background-color: #b59f3b;
				border: none;
				padding: 2px;
			`
		}
		if (marker === "grey") {
			return `
				background-color: #3a3a3c;
				border: none;
				padding: 2px;
			`
		}
	}}

	user-select: none;
`