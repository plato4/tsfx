import "./panels.css";

import * as Tone from "tone";

import Knob from "./ui/Knob";
import { useState } from "react";

interface FreqControlsProps {
	config: { enabled: boolean; options: Partial<Tone.FrequencyEnvelopeOptions> };
}

const FreqControls: React.FC<FreqControlsProps> = ({ config }) => {
	const [checked, setChecked] = useState(config.enabled);
	return (
		<div className="controls-container">
			<div>Frequency Amp</div>
			<input
				type="checkbox"
				onClick={() => {
					config.enabled = !config.enabled;
					setChecked(config.enabled);
				}}
				checked={config.enabled}
			/>
			<Knob
				title={"attack"}
				initial={(config.options.attack as number) ?? 0}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) => (config.options.attack = v)}
			/>
			<Knob
				title={"release"}
				initial={(config.options.release as number) ?? 0}
				min={0}
				max={1}
				step={0.01}
				onChange={(v) => (config.options.release = v)}
			/>
			<Knob
				title={"octaves"}
				initial={(config.options.octaves as number) ?? 0}
				min={-5}
				max={5}
				step={1}
				onChange={(v) => (config.options.octaves = v)}
			/>
		</div>
	);
};
export default FreqControls;
