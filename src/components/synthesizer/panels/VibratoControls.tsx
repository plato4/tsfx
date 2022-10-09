import "./panels.css";

import { NonCustomOscillatorType } from "tone/build/esm/source/oscillator/OscillatorInterface";

import * as Tone from "tone";

import Knob from "./ui/Knob";
import Select from "./ui/Select";

import { useState } from "react";

interface VibratoControlsProps {
	config: { enabled: boolean; options: Partial<Tone.VibratoOptions> };
}

const VibratoControls: React.FC<VibratoControlsProps> = ({ config }) => {
	const [checked, setChecked] = useState(config.enabled);
	return (
		<div className="controls-container">
			<div>Vibrato</div>
			<input
				type="checkbox"
				onClick={() => {
					config.enabled = !config.enabled;
					setChecked(config.enabled);
				}}
				checked={config.enabled}
			/>
			<Knob
				title={"depth"}
				initial={(config.options.depth as number) ?? 0}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) => (config.options.depth = v)}
			/>
			<Knob
				title={"frequency"}
				initial={(config.options.frequency as number) ?? 0}
				max={100}
				min={0}
				step={1}
				onChange={(v) => (config.options.frequency = v)}
			/>
			<Knob
				title={"maxDelay"}
				initial={(config.options.maxDelay as number) ?? 0.01}
				max={1}
				min={0.01}
				step={0.01}
				onChange={(v) => (config.options.maxDelay = v)}
			/>
			<Select
				title={"type"}
				selection={["sine", "square", "triangle", "sawtooth"]}
				onChange={(v) => (config.options.type = v as NonCustomOscillatorType)}
			/>
			<Knob
				title={"wet"}
				initial={(config.options.wet as number) ?? 0}
				max={1}
				min={0}
				step={0.01}
				onChange={(v) => (config.options.wet = v)}
			/>
		</div>
	);
};
export default VibratoControls;
