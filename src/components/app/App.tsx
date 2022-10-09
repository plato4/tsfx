import "./app.css";
import React, { useRef, useState } from "react";
import Keyboard from "../keyboard/Keyboard";
import Synthesizer from "../synthesizer/Synthesizer";
import Synth from "../../Synth";

const App = () => {
	const synth = new Synth();

	return (
		<div className="app">
			<Synthesizer settings={synth.settings} />
			<Keyboard onPlay={(n) => synth.play(n)} />
		</div>
	);
};

export default App;
