import styled from "styled-components"

export const Board = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	width: 33vw;

	margin-bottom: 50px;

	@media only screen and (min-width: 768px) and (min-height: 620px) {
		padding-top: 50px;
	}
`