import "./panels.css";

import * as Tone from "tone";

import Knob from "./ui/Knob";
import { useState } from "react";

interface AutoWahControlsProps {
	config: { enabled: boolean; options: Partial<Tone.AutoWahOptions> };
}

const AutoWahControls: React.FC<AutoWahControlsProps> = ({ config }) => {
	const [checked, setChecked] = useState(config.enabled);
	return (
		<div className="controls-container">
			<div>AutoWah</div>
			<input
				type="checkbox"
				onClick={() => {
					config.enabled = !config.enabled;
					setChecked(config.enabled);
				}}
				checked={config.enabled}
			/>
			<Knob
				title={"q"}
				initial={(config.options.Q as number) ?? 0}
				max={10}
				min={0}
				step={1}
				onChange={(v) => (config.options.Q = v)}
			/>

			<Knob
				title={"baseFrequency"}
				initial={(config.options.baseFrequency as number) ?? 0}
				max={100}
				min={0}
				step={1}
				onChange={(v) => (config.options.baseFrequency = v)}
			/>
			<Knob
				title={"octaves"}
				initial={(config.options.octaves as number) ?? 0}
				max={5}
				min={-5}
				step={1}
				onChange={(v) => (config.options.octaves = v)}
			/>
			<Knob
				title={"sensitivity"}
				initial={(config.options.sensitivity as number) ?? 0}
				max={100}
				min={-100}
				step={0.01}
				onChange={(v) => (config.options.sensitivity = v)}
			/>
		</div>
	);
};
export default AutoWahControls;
