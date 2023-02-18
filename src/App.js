import React from "react"
import { Wordle, HeaderSection } from "./components"
import { CookiesProvider } from "react-cookie"

function App() {
	return (
		<CookiesProvider>
			<HeaderSection />
			<Wordle />
		</CookiesProvider>
	)
}

export default App
